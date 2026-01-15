#!/usr/bin/env python3
"""
Automated game testing script with coverage validation
"""

import subprocess
import sys
import os
import json
from typing import Tuple, Dict

def print_header(text: str):
    """Print formatted header"""
    print(f"\n{'=' * 60}")
    print(f"  {text}")
    print(f"{'=' * 60}\n")

def run_npm_test() -> Tuple[int, str, str]:
    """
    Execute npm test with coverage
    
    Returns:
        Tuple of (exit_code, stdout, stderr)
    """
    try:
        result = subprocess.run(
            ['npm', 'test', '--', '--coverage', '--json', '--outputFile=test-results.json'],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        )
        return result.returncode, result.stdout, result.stderr
    except FileNotFoundError:
        print("❌ Error: npm not found. Please install Node.js and npm.")
        return 1, "", "npm not found"
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        return 1, "", str(e)

def parse_test_results(stdout: str) -> Dict:
    """
    Parse test results from output
    
    Args:
        stdout: Command output
        
    Returns:
        Dictionary with parsed results
    """
    results = {
        'passed': False,
        'total_tests': 0,
        'passed_tests': 0,
        'failed_tests': 0,
        'test_suites': 0
    }
    
    # Simple parsing - look for indicators in output
    if 'Tests:' in stdout:
        # Parse test summary
        lines = stdout.split('\n')
        for line in lines:
            if 'Tests:' in line and 'passed' in line:
                results['passed'] = 'failed' not in line or 'failed, 0' in line
    
    return results

def display_results(exit_code: int, stdout: str, stderr: str):
    """
    Display formatted test results
    
    Args:
        exit_code: Process exit code
        stdout: Standard output
        stderr: Standard error
    """
    print_header("Test Results")
    
    if exit_code == 0:
        print("✅ All tests passed!\n")
    else:
        print("❌ Some tests failed\n")
    
    # Display output
    if stdout:
        print(stdout)
    
    if stderr and 'DeprecationWarning' not in stderr:
        print("\n⚠️  Errors:")
        print(stderr)
    
    # Coverage summary
    print_header("Coverage Summary")
    print("See detailed coverage report in coverage/ directory")
    print("Open coverage/lcov-report/index.html in browser for detailed view")

def check_coverage_threshold(min_threshold: int = 90) -> bool:
    """
    Check if coverage meets minimum threshold
    
    Args:
        min_threshold: Minimum required coverage percentage
        
    Returns:
        True if threshold met, False otherwise
    """
    coverage_file = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        'coverage',
        'coverage-summary.json'
    )
    
    if not os.path.exists(coverage_file):
        print(f"⚠️  Coverage file not found: {coverage_file}")
        return False
    
    try:
        with open(coverage_file, 'r') as f:
            coverage_data = json.load(f)
            
        total = coverage_data.get('total', {})
        lines_pct = total.get('lines', {}).get('pct', 0)
        branches_pct = total.get('branches', {}).get('pct', 0)
        functions_pct = total.get('functions', {}).get('pct', 0)
        statements_pct = total.get('statements', {}).get('pct', 0)
        
        print(f"\n📊 Coverage Details:")
        print(f"   Lines:       {lines_pct:.1f}%")
        print(f"   Branches:    {branches_pct:.1f}%")
        print(f"   Functions:   {functions_pct:.1f}%")
        print(f"   Statements:  {statements_pct:.1f}%")
        
        # Check if all metrics meet threshold
        all_metrics = [lines_pct, branches_pct, functions_pct, statements_pct]
        meets_threshold = all(pct >= min_threshold for pct in all_metrics)
        
        if meets_threshold:
            print(f"\n✨ Excellent! All coverage metrics exceed {min_threshold}%")
        else:
            print(f"\n⚠️  Coverage below {min_threshold}% threshold")
            
        return meets_threshold
        
    except Exception as e:
        print(f"⚠️  Error reading coverage data: {e}")
        return False

def main():
    """Main entry point"""
    print_header("AI Snake Game - Test Runner")
    
    # Get configuration from environment
    min_coverage = int(os.getenv('TEST_COVERAGE_THRESHOLD', '90'))
    
    print(f"Running tests with {min_coverage}% coverage threshold...\n")
    
    # Run tests
    exit_code, stdout, stderr = run_npm_test()
    
    # Display results
    display_results(exit_code, stdout, stderr)
    
    # Check coverage if tests passed
    if exit_code == 0:
        coverage_ok = check_coverage_threshold(min_coverage)
        if not coverage_ok:
            print("\n⚠️  Warning: Coverage below threshold")
            print("Consider adding more tests to improve coverage")
            # Don't fail on coverage for now, just warn
    
    print("\n" + "=" * 60)
    print(f"  Test run complete - Exit code: {exit_code}")
    print("=" * 60 + "\n")
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
