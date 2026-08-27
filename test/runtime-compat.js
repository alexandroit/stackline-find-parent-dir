'use strict';

var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var findParentDir = require('../');
var root = fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-dir-runtime-'));
var nested = path.join(root, 'nested');

fs.mkdirSync(nested);
fs.writeFileSync(path.join(root, 'marker'), 'yes');

assert.strictEqual(findParentDir.sync(nested, 'marker'), root + path.sep);
findParentDir(nested, 'marker', function (error, directory) {
  if (error) throw error;
  assert.strictEqual(directory, root + path.sep);
  return findParentDir.promise(nested, 'marker').then(function (promised) {
    assert.strictEqual(promised, root + path.sep);
    removeTree(root);
    console.log('Runtime compatibility checks passed on ' + process.version + '.');
  });
});

function removeTree(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(function (entry) {
    var target = path.join(directory, entry.name);
    if (entry.isDirectory()) removeTree(target);
    else fs.unlinkSync(target);
  });
  fs.rmdirSync(directory);
}
