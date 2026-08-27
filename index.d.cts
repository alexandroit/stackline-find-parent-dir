declare function findParentDir(
  currentFullPath: string,
  clue: string,
  callback: findParentDir.Callback
): void;

declare namespace findParentDir {
  type Callback = (error: Error | null, directory: string | null) => void;

  function sync(currentFullPath: string, clue: string): string | null;
  function promise(currentFullPath: string, clue: string): Promise<string | null>;
}

export = findParentDir;
