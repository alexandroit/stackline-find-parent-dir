'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, test } = require('node:test');
const findParentDir = require('../');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-dir-upstream-'));
const testDirectory = path.join(root, 'test', 'nested');
fs.mkdirSync(testDirectory, { recursive: true });
fs.mkdirSync(path.join(root, '.git'));
fs.writeFileSync(path.join(testDirectory, 'fixture.js'), 'fixture');

after(() => fs.rmSync(root, { force: true, recursive: true }));

test('upstream: finds a marker in a parent directory asynchronously', async () => {
  const directory = await callbackResult(testDirectory, '.git');
  assert.equal(directory, `${root}${path.sep}`);
});

test('upstream: finds a marker in the current directory asynchronously', async () => {
  const directory = await callbackResult(testDirectory, 'fixture.js');
  assert.equal(directory, testDirectory);
});

test('upstream: finds a marker in a parent directory synchronously', () => {
  assert.equal(findParentDir.sync(testDirectory, '.git'), `${root}${path.sep}`);
});

test('upstream: finds a marker in the current directory synchronously', () => {
  assert.equal(findParentDir.sync(testDirectory, 'fixture.js'), testDirectory);
});

test('upstream: returns null when no parent contains the clue', async () => {
  assert.equal(await callbackResult(testDirectory, 'absent.marker'), null);
  assert.equal(findParentDir.sync(testDirectory, 'absent.marker'), null);
});

function callbackResult(start, clue) {
  return new Promise((resolve, reject) => {
    findParentDir(start, clue, (error, directory) => {
      if (error) reject(error);
      else resolve(directory);
    });
  });
}
