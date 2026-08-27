# Issue Triage

## Bug report checklist

- Include package, Node.js, and operating-system versions.
- Provide the exact start path and clue, with secrets removed.
- State whether callback, `.sync`, or `.promise` was used.
- Include filesystem error codes and symlink information when relevant.
- Compare with `find-parent-dir@0.3.1` for compatibility regressions.

## Scope

Traversal correctness, error classification, Windows/POSIX paths, symlinks,
types, packaging, and supported runtimes are in scope. File parsing, project
configuration semantics, and recursive downward searches belong elsewhere.
