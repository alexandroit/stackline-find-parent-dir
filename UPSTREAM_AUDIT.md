# Upstream Audit

Audit date: 2026-08-26 to 2026-08-27.

## Package and repository

- Upstream: https://github.com/thlorenz/find-parent-dir
- npm baseline: `find-parent-dir@0.3.1`
- license: MIT
- runtime dependencies: zero
- repository: public, unarchived, two open issues at the audit snapshot
- latest npm publication: 2021-05-14, correcting package metadata
- last substantive traversal implementation work: 2014

## Demand evidence

Official npm downloads measured:

- 682,868 for the complete week from 2026-08-19 through 2026-08-25;
- 2,988,186 over the measured 30-day window;
- 34,866,066 over the measured one-year window.

Current public source references were verified in Modernizr, Plone Volto,
Pulsar, Arduino tooling, and Pulsar's Jasmine 5 runner.

## Alternatives

- `find-up@8` is ESM-only, requires Node.js 20, and exposes a different API.
- `find-up-simple` is ESM-only, requires Node.js 18, and is not a drop-in.
- `escalade` delegates matching to a callback and has a different contract.
- Direct `path.dirname` loops are reasonable for greenfield code but do not
  preserve this package's callback, output, and deep-import behavior.

The `@types/find-parent-dir` package provides basic callback and sync types but
does not ship with the implementation and does not expose a Promise method.

## Reproduced defect

The upstream README says access errors reach the callback or throw from `.sync`.
The implementation uses `fs.exists` and `fs.existsSync`, which collapse access
errors into a false result. An `EACCES` fixture therefore continued upward and
could return a marker above the inaccessible boundary.

The Stackline implementation uses `fs.stat*`, continues only for `ENOENT` and
`ENOTDIR`, and preserves the original error object for every other failure.

## Decision

GO. Modern alternatives are preferred when their API and runtime floor fit a
new project. The active install base, current consumers, documented error defect,
first-party type gap, and low zero-dependency maintenance surface justify a
maintained drop-in.
