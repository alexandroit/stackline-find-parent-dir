---
schema: stackline-project-memory-v1
package: find-parent-dir
upstream: https://github.com/thlorenz/find-parent-dir
stackline_package: "@stackline/find-parent-dir"
state: PUBLISHED
registry_scope: verdaccio-and-public-npm
public_npm: true
public_github: true
docs_production: true
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

## Production release

- package: `@stackline/find-parent-dir@1.0.0`;
- npm: https://www.npmjs.com/package/@stackline/find-parent-dir;
- Verdaccio: published from the exact same tarball as npm;
- source: https://github.com/alexandroit/stackline-find-parent-dir;
- release: https://github.com/alexandroit/stackline-find-parent-dir/releases/tag/stackline-v1.0.0;
- documentation: https://alexandro.net/docs/vanilla/find-parent-dir/;
- source and tag commit: `fccfb38681995d4621e57eab4990c24b3c050393`;
- tarball SHA-1: `b8a1ad5593ccb28399d8daec7c1c9519f56c16a5`;
- tarball SHA-256: `1edcc163be315f4dd89b0400ba8610e084ee80ad0f3451b39bf869f64f21bd08`;
- npm integrity: `sha512-AQhO607IA6pi72rs7UDW/ahH7goGgDtGLYhvnLiPRYrh0ocBUQSlVyUJ/+iz4i1UHY9hDjKCsLnJKJSXqLaBQQ==`;
- packed size: 5,253 bytes; unpacked size: 14,284 bytes; 14 files;
- CI: https://github.com/alexandroit/stackline-find-parent-dir/actions/runs/33038906074;
- CodeQL: https://github.com/alexandroit/stackline-find-parent-dir/actions/runs/33038905941.

## Chronological log

- 2026-08-26: registry data, history, issues, alternatives, license, types, and
  active consumers were audited.
- 2026-08-26: the inaccessible-boundary defect was reproduced against upstream.
- 2026-08-27: GO approved before implementation.
- 2026-08-27: `fs.stat*` error classification, Promise, ESM, declarations, and
  compatibility tests were implemented.
- 2026-08-27: package shape, documentation, visual QA, signatures, audits, and
  all local release gates passed.
- 2026-08-27: remote Node 12-24, Linux, macOS, Windows, TypeScript 3.9,
  full-quality, and CodeQL gates passed; one immutable artifact was published
  to Verdaccio and official npm; GitHub release, public docs, catalog, and both
  aggregate sitemaps were verified.
