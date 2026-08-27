export type Callback = (error: Error | null, directory: string | null) => void;

declare function findParentDir(
  currentFullPath: string,
  clue: string,
  callback: Callback
): void;

export function sync(currentFullPath: string, clue: string): string | null;
export function promise(currentFullPath: string, clue: string): Promise<string | null>;

export { findParentDir };
export default findParentDir;
