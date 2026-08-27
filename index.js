'use strict';

var path = require('path');
var fs = require('fs');

function splitPath(path) {
  var parts = path.split(/(\/|\\)/);
  if (!parts.length) return parts;

  // when path starts with a slash, the first part is empty string
  return !parts[0].length ? parts.slice(1) : parts;
}

function isMissingError(error) {
  return error.code === 'ENOENT' || error.code === 'ENOTDIR';
}

exports = module.exports = function (currentFullPath, clue, cb) {

  function testDir(parts) {
    if (parts.length === 0) return cb(null, null);

    var p = parts.join('');

    fs.stat(path.join(p, clue), function (error) {
      if (!error) return cb(null, p);
      if (!isMissingError(error)) return cb(error);
      testDir(parts.slice(0, -1));
    });
  }

  testDir(splitPath(currentFullPath));
};

exports.sync = function (currentFullPath, clue) {

  function testDir(parts) {
    if (parts.length === 0) return null;

    var p = parts.join('');

    try {
      fs.statSync(path.join(p, clue));
      return p;
    } catch (error) {
      if (!isMissingError(error)) throw error;
      return testDir(parts.slice(0, -1));
    }
  }

  return testDir(splitPath(currentFullPath));
};

exports.promise = function (currentFullPath, clue) {
  return new Promise(function (resolve, reject) {
    module.exports(currentFullPath, clue, function (error, directory) {
      if (error) return reject(error);
      resolve(directory);
    });
  });
};
