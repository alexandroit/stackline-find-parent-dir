import findParentDir, {
  findParentDir as named,
  promise,
  sync,
  type Callback
} from '../../index.mjs';

const callback: Callback = (error, directory) => {
  if (error) throw error;
  void directory;
};

const start = '/workspace/project';
findParentDir(start, 'package.json', callback);
named(start, 'package.json', callback);
const synchronous: string | null = sync(start, 'package.json');
const promised: Promise<string | null> = promise(start, 'package.json');
void synchronous;
void promised;
