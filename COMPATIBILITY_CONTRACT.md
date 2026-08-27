# Compatibility Contract

## Preserved behavior

`@stackline/find-parent-dir@1.x` preserves the observable successful and
not-found behavior of `find-parent-dir@0.3.1`:

- callable CommonJS default export with arity three;
- `.sync(start, clue)` with arity two;
- asynchronous callback timing for filesystem searches;
- synchronous callback completion when the start path has no traversal parts;
- first matching parent selection;
- file and directory clues;
- nested clue paths;
- POSIX and Windows path separators;
- caller-visible textual paths, including symlink aliases and trailing
  separators;
- `null` when no parent matches;
- `index`, `index.js`, and package root imports.

The Promise method and ESM named exports are additive.

## Corrected error behavior

`ENOENT` and `ENOTDIR` mean that a candidate does not contain the clue, so
traversal continues. Other filesystem errors stop traversal:

| API | Error result |
| --- | --- |
| Callback | `callback(error)` |
| Synchronous | throws the original error |
| Promise | rejects with the original error |

This implements the error contract documented by the upstream README. The
upstream use of `fs.exists` and `fs.existsSync` could not distinguish a missing
candidate from access denial or another I/O failure.

## Deliberate non-goals

- no realpath or symlink resolution;
- no globbing or multiple clue search;
- no upward traversal limits beyond the supplied path root;
- no browser filesystem adapter;
- no change to path normalization or result formatting.
