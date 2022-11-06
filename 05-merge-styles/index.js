const fs = require('fs')
const path = require('path')

let stylesDir = path.join(__dirname, 'styles')
fs.readdir(stylesDir, (err, files) => {
  if (err) throw err
  let arr = []
  for (let file of files) {
    let filePath = stylesDir + '\\' + file
    fs.stat(filePath, (err, stats) => {
      if (!stats.isDirectory() && path.extname(filePath) == '.css') {
        let readStream = fs.createReadStream(filePath)
        readStream.on('data', (chunk) => {
          arr.push(chunk)
        })
        let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
        readStream.on('end', () => {
          writeStream.write(arr.join(''))
        })
      }
    })
  }
})
