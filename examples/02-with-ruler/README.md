# Example 02: With Ruler

## What This Example Demonstrates

This example shows how to add Ruler to maintain consistency across multiple tools and documentation files. Ruler automatically syncs your AGENTS.md to different tools in their preferred formats.

## Files Included

- `.ruler/AGENTS.md` - Core documentation (moved into .ruler/)
- `.ruler/ruler.toml` - Ruler configuration

## Differences from Example 01

In Example 01, we had a standalone `AGENTS.md` file. Now we've moved it into `.ruler/` and added `ruler.toml` to define sync targets. This enables:

1. **Automatic sync** to multiple tools (GitHub Copilot, Cursor, Continue)
2. **Consistency** across all AI agent contexts
3. **Single source of truth** for project documentation
4. **Format adaptation** for different tools' preferences

## How Ruler Adds Value

Without Ruler, you'd need to manually maintain separate files:
- `.github/copilot-instructions.md` for GitHub Copilot
- `.cursorrules` for Cursor
- `.continuerc` for Continue

With Ruler, you maintain one `AGENTS.md` and sync to all targets:

```bash
# Install Ruler
cargo install ruler

# Sync to all targets
ruler sync

# Validate everything is in sync
ruler validate
```

## How to Use

1. Copy `.ruler/` directory to your project root
2. Customize `.ruler/AGENTS.md` for your project
3. Run `ruler sync` to generate tool-specific files
4. Commit everything (both .ruler/ and generated files)
5. Run `ruler validate` in CI to ensure consistency

## Integration with CI/CD

Add to your CI pipeline:

```yaml
- name: Install Ruler
  run: cargo install ruler

- name: Validate Ruler sync
  run: ruler validate
```

## Next Steps

- See [Example 03](../03-with-skills/) to add reusable Skills
- Read the [Ruler documentation](https://github.com/yourusername/ruler) for advanced configuration
- Explore [advanced Ruler features](../../docs/ruler-guide.md)
