#!/usr/bin/env python3
"""
Game Testing Script - Runs Jest tests with coverage analysis

This script:
1. Runs Jest tests with coverage
2. Parses coverage report from coverage/coverage-summary.json
3. Displays formatted coverage summary
4. Highlights files with low coverage (<80%)
5. Returns proper exit codes
"""

import json
import os
import subprocess
import sys
from pathlib import Path


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


def run_jest_with_coverage():
    """
    Runs Jest with coverage and returns the exit code.
    
    Returns:
        int: Exit code from Jest (0 for success, non-zero for failure)
    """
    print(f"{Colors.BOLD}{Colors.BLUE}Running Jest tests with coverage...{Colors.END}\n")
    
    try:
        result = subprocess.run(
            ['npm', 'run', 'test:coverage'],
            check=False,
            capture_output=False
        )
        return result.returncode
    except FileNotFoundError:
        print(f"{Colors.RED}Error: npm not found. Please install Node.js and npm.{Colors.END}")
        return 1
    except Exception as e:
        print(f"{Colors.RED}Error running tests: {e}{Colors.END}")
        return 1


def parse_coverage_report(coverage_file='coverage/coverage-summary.json'):
    """
    Parses the Jest coverage summary JSON file.
    
    Args:
        coverage_file (str): Path to coverage summary JSON file
        
    Returns:
        dict: Parsed coverage data, or None if file not found or invalid
    """
    coverage_path = Path(coverage_file)
    
    if not coverage_path.exists():
        print(f"{Colors.YELLOW}Warning: Coverage file not found at {coverage_file}{Colors.END}")
        return None
    
    try:
        with open(coverage_path, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        print(f"{Colors.RED}Error: Invalid JSON in coverage file{Colors.END}")
        return None
    except Exception as e:
        print(f"{Colors.RED}Error reading coverage file: {e}{Colors.END}")
        return None


def format_percentage(value):
    """
    Formats a percentage value with color coding.
    
    Args:
        value (float): Percentage value (0-100)
        
    Returns:
        str: Formatted and colored percentage string
    """
    if value >= 90:
        color = Colors.GREEN
    elif value >= 80:
        color = Colors.YELLOW
    else:
        color = Colors.RED
    
    return f"{color}{value:6.2f}%{Colors.END}"


def display_file_coverage(file_path, metrics):
    """
    Displays coverage metrics for a single file.
    
    Args:
        file_path (str): Relative path to the file
        metrics (dict): Coverage metrics (statements, branches, functions, lines)
    """
    # Extract percentages
    statements = metrics['statements']['pct']
    branches = metrics['branches']['pct']
    functions = metrics['functions']['pct']
    lines = metrics['lines']['pct']
    
    # Determine if file has low coverage
    low_coverage = any(v < 80 for v in [statements, branches, functions, lines])
    file_indicator = f" {Colors.RED}⚠{Colors.END}" if low_coverage else ""
    
    print(f"  {Colors.BOLD}{file_path}{Colors.END}{file_indicator}")
    print(f"    Statements : {format_percentage(statements)}")
    print(f"    Branches   : {format_percentage(branches)}")
    print(f"    Functions  : {format_percentage(functions)}")
    print(f"    Lines      : {format_percentage(lines)}")
    print()


def display_coverage_summary(coverage_data):
    """
    Displays a formatted coverage summary.
    
    Args:
        coverage_data (dict): Parsed coverage data from JSON file
    """
    if not coverage_data:
        return
    
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}Coverage Summary{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}\n")
    
    # Get total coverage
    total = coverage_data.get('total')
    if total:
        print(f"{Colors.BOLD}Overall Coverage:{Colors.END}")
        display_file_coverage("Total", total)
    
    # Get individual file coverage
    files_with_low_coverage = []
    files_with_good_coverage = []
    
    for file_path, metrics in coverage_data.items():
        if file_path == 'total':
            continue
        
        # Check if any metric is below 80%
        statements = metrics['statements']['pct']
        branches = metrics['branches']['pct']
        functions = metrics['functions']['pct']
        lines = metrics['lines']['pct']
        
        if any(v < 80 for v in [statements, branches, functions, lines]):
            files_with_low_coverage.append((file_path, metrics))
        else:
            files_with_good_coverage.append((file_path, metrics))
    
    # Display files with low coverage first (if any)
    if files_with_low_coverage:
        print(f"{Colors.BOLD}{Colors.RED}Files with Low Coverage (<80%):{Colors.END}\n")
        for file_path, metrics in files_with_low_coverage:
            display_file_coverage(file_path, metrics)
    
    # Display files with good coverage
    if files_with_good_coverage:
        print(f"{Colors.BOLD}{Colors.GREEN}Files with Good Coverage (≥80%):{Colors.END}\n")
        for file_path, metrics in files_with_good_coverage:
            display_file_coverage(file_path, metrics)
    
    # Summary
    total_files = len(files_with_low_coverage) + len(files_with_good_coverage)
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    print(f"{Colors.BOLD}Summary:{Colors.END}")
    print(f"  Total files: {total_files}")
    print(f"  {Colors.GREEN}Good coverage: {len(files_with_good_coverage)}{Colors.END}")
    print(f"  {Colors.RED}Low coverage: {len(files_with_low_coverage)}{Colors.END}")
    
    if total:
        overall_avg = (
            total['statements']['pct'] +
            total['branches']['pct'] +
            total['functions']['pct'] +
            total['lines']['pct']
        ) / 4
        
        if overall_avg >= 90:
            status = f"{Colors.GREEN}EXCELLENT{Colors.END}"
        elif overall_avg >= 80:
            status = f"{Colors.YELLOW}GOOD{Colors.END}"
        else:
            status = f"{Colors.RED}NEEDS IMPROVEMENT{Colors.END}"
        
        print(f"  Overall status: {status}")
    
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}\n")


def main():
    """
    Main function to run tests and display coverage.
    
    Returns:
        int: Exit code (0 for success, 1 for failure)
    """
    # Change to project root directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent.parent
    os.chdir(project_root)
    
    print(f"{Colors.BOLD}{Colors.BLUE}Game Testing Script{Colors.END}")
    print(f"Working directory: {os.getcwd()}\n")
    
    # Run Jest with coverage
    jest_exit_code = run_jest_with_coverage()
    
    # Parse and display coverage report
    coverage_data = parse_coverage_report()
    display_coverage_summary(coverage_data)
    
    # Determine final exit code
    if jest_exit_code != 0:
        print(f"{Colors.RED}Tests failed with exit code {jest_exit_code}{Colors.END}")
        return 1
    
    # Check if coverage meets minimum threshold (80%)
    if coverage_data and 'total' in coverage_data:
        total = coverage_data['total']
        min_coverage = min(
            total['statements']['pct'],
            total['branches']['pct'],
            total['functions']['pct'],
            total['lines']['pct']
        )
        
        if min_coverage < 80:
            print(f"{Colors.YELLOW}Warning: Coverage below 80% threshold{Colors.END}")
            # Don't fail on coverage, just warn
    
    print(f"{Colors.GREEN}All tests passed! ✓{Colors.END}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
