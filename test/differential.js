'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const baseline = require('find-parent-dir-baseline');
const candidate = require('../');

const executions = 300;
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-dir-differential-'));
const nested = path.join(root, 'packages', 'client', 'src');
let seed = 0x4f32a19b;

fs.mkdirSync(nested, { recursive: true });
fs.writeFileSync(path.join(root, '.root-marker'), 'root');
fs.writeFileSync(path.join(root, 'packages', '.workspace-marker'), 'workspace');
fs.writeFileSync(path.join(root, 'packages', 'client', 'package.json'), '{}');
fs.writeFileSync(path.join(nested, 'local.marker'), 'local');

main().finally(() => fs.rmSync(root, { force: true, recursive: true })).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const starts = [
    nested,
    `${nested}${path.sep}`,
    path.join(nested, 'missing'),
    path.join(root, 'packages', 'client'),
    root,
    `${root}${path.sep}`,
    path.relative(process.cwd(), nested),
    'not-created/child'
  ];
  const clues = ['.root-marker', '.workspace-marker', 'package.json', 'local.marker', 'absent.marker'];

  for (let index = 0; index < executions; index += 1) {
    const start = starts[randomInt(starts.length)];
    const clue = clues[randomInt(clues.length)];
    const expectedSync = baseline.sync(start, clue);
    const actualSync = candidate.sync(start, clue);
    assert.equal(actualSync, expectedSync, `sync differential execution ${index}`);

    const expectedAsync = await callbackResult(baseline, start, clue);
    const actualAsync = await callbackResult(candidate, start, clue);
    assert.equal(actualAsync, expectedAsync, `async differential execution ${index}`);
  }

  console.log(`${executions * 2} differential path searches matched find-parent-dir@0.3.1.`);
}

function callbackResult(implementation, start, clue) {
  return new Promise((resolve, reject) => {
    implementation(start, clue, (error, directory) => {
      if (error) reject(error);
      else resolve(directory);
    });
  });
}

function randomInt(maximum) {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) % maximum;
}
