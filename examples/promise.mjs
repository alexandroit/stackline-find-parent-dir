import { promise as findParentDir } from '@stackline/find-parent-dir'

const directory = await findParentDir(import.meta.dirname, 'package.json')
console.log(directory)
