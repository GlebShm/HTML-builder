const fs = require('fs')
const path = require('path')
const { stdout } = require('process')

let filePath = path.join(__dirname, 'text.txt')

let readStream = fs.createReadStream(filePath, 'utf-8')

readStream.on('data', (data) => {
  stdout.write(data)
})