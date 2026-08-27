import findParentDir from './index.js'

const sync = findParentDir.sync
const promise = findParentDir.promise

export { findParentDir, promise, sync }
export default findParentDir
