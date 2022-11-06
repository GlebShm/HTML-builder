const fs = require('fs')
const path = require('path')

fs.mkdir(__dirname + '\\' + 'project-dist', { recursive: true }, () => {

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
          let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
          readStream.on('end', () => {
            writeStream.write(arr.join(''))
          })
        }
      })
    }
  })

  let dirPath = path.join(__dirname, 'project-dist', 'assets')
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) throw err
    fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
      if (err) throw err
      for (let folder of folders) {
        fs.mkdir(path.join(dirPath, folder), { recursive: true }, () => { })
        fs.readdir(path.join(__dirname, 'assets', folder), (err, files) => {
          for (let file of files) {
            fs.copyFile(path.join(__dirname, 'assets', folder, file), path.join(dirPath, folder, file), () => { })
          }
        })
      }
    })
  })

})

fs.readdir(__dirname + '\\' + 'components', (err, data) => {
  let html = ''
  let readStream = fs.createReadStream(__dirname + '\\' + 'template.html', 'utf-8')
  readStream.on('data', (data) => html += data)
  readStream.on('end', () => {
    for (let name of data) {
      let compName = name.split('.')[0]
      let compPath = path.join(__dirname, 'components', name)
      fs.readFile(compPath, (err, data) => {
        html = html.replace(`{{${compName}}}`, data.toString())
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html, () => { })
      })
    }
  })
})