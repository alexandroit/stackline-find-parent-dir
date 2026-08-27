# Dependency Decisions

## Runtime

`@stackline/find-parent-dir` has no runtime dependencies. Traversal uses only
Node.js built-in `path` and `fs` modules.

This prevents another npm package's removal or compromise from affecting the
production dependency graph.

## Development

Development dependencies are pinned exactly and locked. They provide linting,
coverage, package-shape analysis, TypeScript compatibility checks, and a frozen
`find-parent-dir@0.3.1` differential oracle. Consumers do not install them.

CI actions are pinned to complete commit SHAs. Releases include a CycloneDX
SBOM and SHA-256/SHA-512 checksums.
