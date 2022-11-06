const fs = require('fs')
const path = require('path')

let dirPath = path.join(__dirname, 'files-copy')
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) throw err
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err
    for (let file of files) {
      fs.copyFile(path.join(__dirname, 'files', file), dirPath + '\\' + file, () => { })
    }
  })
})
