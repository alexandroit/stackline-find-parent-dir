import findParentDir = require('../..');

const start = '/workspace/project';

findParentDir(start, 'package.json', (error, directory) => {
  const checkedError: Error | null = error;
  const checkedDirectory: string | null = directory;
  void checkedError;
  void checkedDirectory;
});

const synchronous: string | null = findParentDir.sync(start, 'package.json');
const promised: Promise<string | null> = findParentDir.promise(start, 'package.json');
void synchronous;
void promised;

// @ts-expect-error Callback is required by the historical API.
findParentDir(start, 'package.json');
