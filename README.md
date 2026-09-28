# @stackline/find-parent-dir

> Find the nearest parent containing a file or directory with callback, sync, and Promise APIs

[![npm version](https://img.shields.io/npm/v/@stackline/find-parent-dir.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/find-parent-dir)
[![license](https://img.shields.io/npm/l/@stackline/find-parent-dir.svg?style=flat-square)](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/LICENSE)
[![GitHub repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-find-parent-dir)

**[Documentation](https://alexandro.net/docs/vanilla/find-parent-dir/)** |
**[npm](https://www.npmjs.com/package/@stackline/find-parent-dir)** |
**[Issues](https://github.com/alexandroit/stackline-find-parent-dir/issues)** |
**[Repository](https://github.com/alexandroit/stackline-find-parent-dir)**

**Package version:** `1.0.1`

## Why this package?

Find the nearest parent directory containing a file or directory. This is a
maintained, zero-dependency continuation of `find-parent-dir@0.3.1` with the
historical callback and synchronous APIs plus Promise, ESM, and first-party
TypeScript support.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/find-parent-dir@1.0.1` |
| Node.js runtime | `>=12` |
| CommonJS / primary entry | `./index.js` |
| ES module entry | `./index.mjs` |
| Type declarations | `./index.d.ts` |

The established contract is preserved:

- traversal starts at the exact supplied path and moves toward its textual
  parent without resolving symlinks;
- the first directory containing `clue` is returned;
- missing paths and `ENOTDIR` candidates continue traversal;
- no match returns `null`;
- path separators and trailing separators follow the upstream behavior;
- callback and synchronous function arity remain unchanged;
- `index` and `index.js` deep imports remain available.

One correctness fix is intentional: access and filesystem errors such as
`EACCES`, `EPERM`, and `ELOOP` are delivered to the callback, thrown by `.sync`,
or reject `.promise`. Upstream used `fs.exists*`, which converted those errors
to `false` and could silently continue above an inaccessible boundary.

See [COMPATIBILITY_CONTRACT.md](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/MIGRATION.md) for the complete boundary.

## Installation

<a id="install"></a>

### Install

```bash
npm install @stackline/find-parent-dir
```

Existing source imports can stay unchanged with an npm alias:

```bash
npm install find-parent-dir@npm:@stackline/find-parent-dir
```

## Usage

### Callback

```js
const findParentDir = require('@stackline/find-parent-dir')

findParentDir(__dirname, 'package.json', (error, directory) => {
  if (error) throw error
  console.log(directory) // nearest directory, or null
})
```

### Synchronous

```js
const findParentDir = require('@stackline/find-parent-dir')

const directory = findParentDir.sync(__dirname, '.git')
```

### Promise and ESM

```js
import { promise as findParentDir } from '@stackline/find-parent-dir'

const directory = await findParentDir(import.meta.dirname, 'package.json')
```

The default ESM export exposes the same `.sync` and `.promise` methods as the
CommonJS function.

## Features and Integrations

<a id="project-documents"></a>

### Project documents

- [Changelog](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/CHANGELOG.md)
- [Compatibility contract](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/COMPATIBILITY_CONTRACT.md)
- [Migration guide](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/MIGRATION.md)
- [Security policy](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/SECURITY.md)
- [Dependency decisions](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/DEPENDENCY_DECISIONS.md)
- [Upstream audit](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/UPSTREAM_AUDIT.md)
- [Third-party licenses](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/THIRD_PARTY_LICENSES.md)

## Security

Review inputs and the package-specific compatibility limits before processing untrusted data. Report suspected vulnerabilities as described in the [security policy](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/SECURITY.md).

## API Surface

<a id="api"></a>

### API

#### `findParentDir(start, clue, callback)`

Search asynchronously. `callback(error, directory)` receives the nearest
matching directory or `null`.

#### `findParentDir.sync(start, clue)`

Search synchronously. Returns the nearest matching directory or `null`, and
throws non-missing filesystem errors.

#### `findParentDir.promise(start, clue)`

Search asynchronously and return `Promise<string | null>`. This method is
additive and does not change the historical APIs.

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-find-parent-dir.git
cd stackline-find-parent-dir
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-find-parent-dir/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## Community and Support

<a id="support"></a>

### Support

- Node.js 12 through 24 are tested.
- CommonJS and native ESM are tested.
- TypeScript 3.9 and the current compiler are tested.
- Linux, macOS, and Windows are covered in CI.
- There are no runtime dependencies.

Report reproducible package issues in the [issue tracker](https://github.com/alexandroit/stackline-find-parent-dir/issues). Use the [security policy](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/SECURITY.md) for vulnerability reports.

- [Stackline / Alexandro.Net](https://alexandro.net/)
- [GitHub](https://github.com/alexandroit)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)
- [Reddit community: r/Stackline](https://www.reddit.com/r/Stackline/)

## License

<a id="license-and-attribution"></a>

### License and attribution

MIT. The original copyright notice for Thorsten Lorenz is preserved in
[LICENSE](https://github.com/alexandroit/stackline-find-parent-dir/blob/main/LICENSE). This project is an independent maintained continuation and
is not affiliated with or endorsed by the original author.
