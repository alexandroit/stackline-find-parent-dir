# Registry Handoff

## Current state

- upstream: `find-parent-dir@0.3.1`
- Stackline release: `@stackline/find-parent-dir@1.0.0`
- decision: GO
- state: published and verified
- registry scope: Verdaccio and official npm
- runtime dependencies: zero

## Registry result

- npm: https://www.npmjs.com/package/@stackline/find-parent-dir
- Verdaccio: `@stackline/find-parent-dir@1.0.0`
- GitHub: https://github.com/alexandroit/stackline-find-parent-dir
- release: https://github.com/alexandroit/stackline-find-parent-dir/releases/tag/stackline-v1.0.0
- docs: https://alexandro.net/docs/vanilla/find-parent-dir/
- source/tag commit: `fccfb38681995d4621e57eab4990c24b3c050393`
- tarball SHA-1: `b8a1ad5593ccb28399d8daec7c1c9519f56c16a5`
- tarball SHA-256: `1edcc163be315f4dd89b0400ba8610e084ee80ad0f3451b39bf869f64f21bd08`
- npm integrity: `sha512-AQhO607IA6pi72rs7UDW/ahH7goGgDtGLYhvnLiPRYrh0ocBUQSlVyUJ/+iz4i1UHY9hDjKCsLnJKJSXqLaBQQ==`

## Verified gates

- adapted upstream, permission/error regressions, and 600 differential searches;
- Node.js 12 through 24 plus Linux, macOS, and Windows;
- CommonJS, ESM, historical deep imports, TypeScript 3.9 and current;
- real and synthetic access denial, missing paths, file starts, nested clues,
  relative inputs, symlinks, and upstream path formatting;
- packed direct and legacy-name alias installs against both registries;
- 100% core coverage, `publint`, AreTheTypesWrong, production audit, registry
  signatures, CI, and CodeQL;
- identical release tarball, CycloneDX SBOM, checksums, GitHub release, public
  documentation, catalog entry, and six URLs in each aggregate sitemap.
