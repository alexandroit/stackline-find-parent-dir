# Contributing

Contributions are welcome when they preserve the compatibility contract and
the zero-runtime-dependency scope.

## Development

```bash
npm ci
npm run verify
```

Changes to traversal, error classification, package exports, or declarations
require focused regression coverage and differential evidence against
`find-parent-dir@0.3.1` when the upstream behavior should remain unchanged.

## Scope

Filesystem traversal, compatibility, types, package distribution, and
documentation are in scope. Globbing, browser virtual filesystems, recursive
directory searches, and project configuration parsing belong elsewhere.

By contributing, you agree that your contribution is licensed under the MIT
License in [LICENSE](LICENSE).
