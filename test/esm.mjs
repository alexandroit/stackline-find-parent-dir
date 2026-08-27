import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import findParentDir, { findParentDir as named, promise, sync } from '../index.mjs'

assert.equal(findParentDir, named)
assert.equal(sync, findParentDir.sync)
assert.equal(promise, findParentDir.promise)

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-dir-esm-'))
const nested = path.join(root, 'nested')
fs.mkdirSync(nested)
fs.writeFileSync(path.join(root, 'package.json'), '{}')

try {
  assert.equal(await promise(nested, 'package.json'), `${root}${path.sep}`)
  assert.equal(sync(nested, 'package.json'), `${root}${path.sep}`)
} finally {
  fs.rmSync(root, { force: true, recursive: true })
}

console.log('Native ESM checks passed.')
