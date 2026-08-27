# @stackline/find-parent-dir

[![CI](https://github.com/alexandroit/stackline-find-parent-dir/actions/workflows/ci.yml/badge.svg)](https://github.com/alexandroit/stackline-find-parent-dir/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@stackline/find-parent-dir.svg)](https://www.npmjs.com/package/@stackline/find-parent-dir)
[![license](https://img.shields.io/npm/l/@stackline/find-parent-dir.svg)](LICENSE)

Find the nearest parent directory containing a file or directory. This is a
maintained, zero-dependency continuation of `find-parent-dir@0.3.1` with the
historical callback and synchronous APIs plus Promise, ESM, and first-party
TypeScript support.

## Install

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

## Compatibility

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

See [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md) and
[MIGRATION.md](MIGRATION.md) for the complete boundary.

## API

### `findParentDir(start, clue, callback)`

Search asynchronously. `callback(error, directory)` receives the nearest
matching directory or `null`.

### `findParentDir.sync(start, clue)`

Search synchronously. Returns the nearest matching directory or `null`, and
throws non-missing filesystem errors.

### `findParentDir.promise(start, clue)`

Search asynchronously and return `Promise<string | null>`. This method is
additive and does not change the historical APIs.

## Support

- Node.js 12 through 24 are tested.
- CommonJS and native ESM are tested.
- TypeScript 3.9 and the current compiler are tested.
- Linux, macOS, and Windows are covered in CI.
- There are no runtime dependencies.

## Project documents

- [Changelog](CHANGELOG.md)
- [Compatibility contract](COMPATIBILITY_CONTRACT.md)
- [Migration guide](MIGRATION.md)
- [Security policy](SECURITY.md)
- [Dependency decisions](DEPENDENCY_DECISIONS.md)
- [Upstream audit](UPSTREAM_AUDIT.md)
- [Third-party licenses](THIRD_PARTY_LICENSES.md)

## License and attribution

MIT. The original copyright notice for Thorsten Lorenz is preserved in
[LICENSE](LICENSE). This project is an independent maintained continuation and
is not affiliated with or endorsed by the original author.
