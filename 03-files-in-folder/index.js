const fs = require('fs')
const path = require('path')

let dirPath = path.join(__dirname, 'secret-folder')
fs.readdir(dirPath, (err, files) => {
  if (err) throw err
  for (let file of files) {
    let filePath = dirPath + '\\' + file
    fs.stat(filePath, (err, stats) => {
      if (!stats.isDirectory()) {
        console.log(`${path.basename(filePath, path.extname(filePath))}-${path.extname(filePath)}-${stats.size}`)
      }
    })
  }
})