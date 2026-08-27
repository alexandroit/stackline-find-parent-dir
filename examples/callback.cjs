const findParentDir = require('@stackline/find-parent-dir')

findParentDir(__dirname, 'package.json', (error, directory) => {
  if (error) throw error
  console.log(directory)
})
