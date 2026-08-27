# Registry Handoff

## Current state

- upstream: `find-parent-dir@0.3.1`
- Stackline target: `@stackline/find-parent-dir@1.0.0`
- decision: GO
- state: implementation verification in progress
- registry scope: Verdaccio and official npm
- runtime dependencies: zero

## Required release gates

- adapted upstream, error regression, and differential suites;
- Node.js 12 through 24 plus Linux, macOS, and Windows;
- CommonJS, ESM, deep imports, TypeScript 3.9 and current;
- permissions, missing paths, file starts, symlinks, and path formatting;
- packed direct and legacy-name alias installs;
- package quality, production audit, signatures, CI, and CodeQL;
- immutable tarball hash, SBOM, GitHub release, and production docs.

Artifact hashes and public URLs are recorded only after publication.
