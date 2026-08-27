'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const findParentDir = require('../');

test('export shape preserves historical arity and adds only the Promise API', () => {
  assert.equal(findParentDir.name, '');
  assert.equal(findParentDir.length, 3);
  assert.equal(findParentDir.sync.name, '');
  assert.equal(findParentDir.sync.length, 2);
  assert.equal(findParentDir.promise.length, 2);
  assert.deepEqual(Object.keys(findParentDir), ['sync', 'promise']);
});

test('empty and custom split inputs preserve synchronous callback completion', () => {
  let synchronous = true;
  let observed = false;

  findParentDir('', 'marker', (error, directory) => {
    assert.equal(synchronous, true);
    assert.equal(error, null);
    assert.equal(directory, null);
    observed = true;
  });

  assert.equal(observed, true);
  assert.equal(findParentDir.sync({ split: () => [] }, 'marker'), null);
  synchronous = false;
});

test('ENOENT and ENOTDIR continue traversal without becoming access errors', async () => {
  const root = fixture();
  try {
    const marker = path.join(root, 'marker');
    const fileStart = path.join(root, 'file.txt');
    fs.writeFileSync(marker, 'yes');
    fs.writeFileSync(fileStart, 'not a directory');

    assert.equal(await findParentDir.promise(path.join(root, 'missing', 'child'), 'marker'), `${root}${path.sep}`);
    assert.equal(findParentDir.sync(fileStart, 'marker'), `${root}${path.sep}`);
  } finally {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

test('asynchronous access errors stop traversal and retain error identity', async () => {
  const original = fs.stat;
  const expected = Object.assign(new Error('permission denied'), { code: 'EACCES' });
  let callbackCount = 0;

  fs.stat = (_candidate, callback) => callback(expected);
  try {
    const actual = await new Promise((resolve) => {
      findParentDir('/private/project', 'marker', (error, directory) => {
        callbackCount += 1;
        assert.equal(directory, undefined);
        resolve(error);
      });
    });
    assert.equal(actual, expected);
    assert.equal(callbackCount, 1);
    await assert.rejects(findParentDir.promise('/private/project', 'marker'), (error) => error === expected);
  } finally {
    fs.stat = original;
  }
});

test('synchronous access errors stop traversal and retain error identity', () => {
  const original = fs.statSync;
  const expected = Object.assign(new Error('permission denied'), { code: 'EACCES' });
  fs.statSync = () => { throw expected; };

  try {
    assert.throws(() => findParentDir.sync('/private/project', 'marker'), (error) => error === expected);
  } finally {
    fs.statSync = original;
  }
});

test('a real inaccessible boundary is not crossed on POSIX', {
  skip: process.platform === 'win32' || typeof process.getuid !== 'function' || process.getuid() === 0
}, async () => {
  const root = fixture();
  const denied = path.join(root, 'denied');
  const start = path.join(denied, 'child');
  fs.writeFileSync(path.join(root, 'marker'), 'must not be reached');
  fs.mkdirSync(start, { recursive: true });
  fs.chmodSync(denied, 0o000);

  try {
    await assert.rejects(findParentDir.promise(start, 'marker'), { code: 'EACCES' });
    assert.throws(() => findParentDir.sync(start, 'marker'), { code: 'EACCES' });
  } finally {
    fs.chmodSync(denied, 0o700);
    fs.rmSync(root, { force: true, recursive: true });
  }
});

test('nested clues are supported', async () => {
  const root = fixture();
  const start = path.join(root, 'src', 'feature');
  fs.mkdirSync(path.join(root, '.config'), { recursive: true });
  fs.mkdirSync(start, { recursive: true });
  fs.writeFileSync(path.join(root, '.config', 'project.json'), '{}');

  try {
    assert.equal(await findParentDir.promise(start, path.join('.config', 'project.json')), `${root}${path.sep}`);
  } finally {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

test('relative missing paths never leak into the current working directory', async () => {
  const clue = `.find-parent-dir-${process.pid}`;
  fs.writeFileSync(clue, 'sentinel');
  try {
    assert.equal(await findParentDir.promise('missing/child', clue), null);
    assert.equal(findParentDir.sync('missing/child', clue), null);
  } finally {
    fs.unlinkSync(clue);
  }
});

test('symlink traversal preserves the caller-visible textual path', {
  skip: process.platform === 'win32'
}, async () => {
  const root = fixture();
  const target = path.join(root, 'real-project');
  const link = path.join(root, 'project-link');
  fs.mkdirSync(path.join(target, 'nested'), { recursive: true });
  fs.writeFileSync(path.join(target, 'marker'), 'yes');
  fs.symlinkSync(target, link, 'dir');

  try {
    assert.equal(await findParentDir.promise(path.join(link, 'nested'), 'marker'), `${link}${path.sep}`);
    assert.equal(findParentDir.sync(path.join(link, 'nested'), 'marker'), `${link}${path.sep}`);
  } finally {
    fs.rmSync(root, { force: true, recursive: true });
  }
});

test('invalid start values still fail before filesystem traversal', async () => {
  assert.throws(() => findParentDir.sync(null, 'marker'), TypeError);
  assert.throws(() => findParentDir(null, 'marker', () => {}), TypeError);
  await assert.rejects(findParentDir.promise(null, 'marker'), TypeError);
});

function fixture() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-dir-'));
}
