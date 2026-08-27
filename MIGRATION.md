# Migration

## Keep existing imports

Install the Stackline package under the historical dependency key:

```bash
npm install find-parent-dir@npm:@stackline/find-parent-dir
```

Existing code remains unchanged:

```js
const findParentDir = require('find-parent-dir')
const root = findParentDir.sync(__dirname, 'package.json')
```

The equivalent `package.json` entry is:

```json
{
  "dependencies": {
    "find-parent-dir": "npm:@stackline/find-parent-dir@^1.0.0"
  }
}
```

## Adopt the scoped name

```bash
npm install @stackline/find-parent-dir
```

```js
const findParentDir = require('@stackline/find-parent-dir')
```

## Optional modern APIs

```js
import findParentDir, { promise, sync } from '@stackline/find-parent-dir'

const first = sync(process.cwd(), 'package.json')
const second = await promise(process.cwd(), '.git')
```

## Error migration note

Code running beneath an inaccessible directory can now receive the actual
filesystem error. This is the documented upstream behavior and prevents a
search from silently continuing into a parent that the original request could
not safely inspect. Handle callback errors, synchronous throws, or Promise
rejections as appropriate.
