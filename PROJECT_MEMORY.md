---
schema: stackline-project-memory-v1
package: find-parent-dir
upstream: https://github.com/thlorenz/find-parent-dir
stackline_package: "@stackline/find-parent-dir"
state: IMPLEMENTING
registry_scope: verdaccio-and-public-npm
public_npm: false
public_github: false
docs_production: false
created: 2026-08-27
last_updated: 2026-08-27
---

# Project Memory

## Objective

Preserve the callback and synchronous `find-parent-dir@0.3.1` contract while
correctly exposing filesystem errors and adding Promise, ESM, TypeScript, and
current reproducible release surfaces without runtime dependencies.

## Decision

GO. Official npm measured 682,868 complete-week downloads and 34,866,066 annual
downloads. Current Modernizr, Plone Volto, Pulsar, Arduino, and Jasmine runner
source trees still reference the package. Modern alternatives are not drop-in
and generally require newer runtimes.

## Compatibility boundary

- callback and sync signatures, arity, result text, and not-found semantics;
- exact upward textual traversal without realpath resolution;
- POSIX and Windows separators, trailing separators, nested clues, and symlinks;
- historical root, `index`, and `index.js` imports;
- corrected propagation for errors other than `ENOENT` and `ENOTDIR`;
- additive Promise, ESM, and TypeScript surfaces only.

## Local verification

- five adapted upstream tests and ten targeted regression tests passed;
- 600 deterministic callback and sync path searches matched
  `find-parent-dir@0.3.1`;
- core coverage reached 100% statements, branches, functions, and lines;
- real and synthetic permission boundaries, missing paths, file starts, nested
  clues, relative paths, and textual symlinks passed;
- CommonJS, ESM, historical deep imports, and the packed scoped install passed;
- TypeScript 3.9.10 and 7.0.2 passed;
- `publint` and AreTheTypesWrong reported no findings for every export;
- production dependency audit reported zero vulnerabilities;
- 172 registry signatures and 24 attestations were verified;
- desktop and mobile documentation screenshots rendered without overlap or
  blank content, and the browser-generated traversal program was verified in
  the DOM;
- the complete local `npm run verify` gate passed.

Remote CI, registry publication, immutable artifact hashes, GitHub release, and
production documentation remain pending.

## Chronological log

- 2026-08-26: registry data, history, issues, alternatives, license, types, and
  active consumers were audited.
- 2026-08-26: the inaccessible-boundary defect was reproduced against upstream.
- 2026-08-27: GO approved before implementation.
- 2026-08-27: `fs.stat*` error classification, Promise, ESM, declarations, and
  compatibility tests were implemented.
- 2026-08-27: package shape, documentation, visual QA, signatures, audits, and
  all local release gates passed.
