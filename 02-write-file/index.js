const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

let filePath = path.join(__dirname, 'text.txt')
fs.writeFile(filePath, '', (err) => {
  if (err) throw err
})
let writeStream = fs.createWriteStream(filePath)

stdout.write('Write something\n')
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit()
  }
  writeStream.write(data)
})

process.on('exit', () => {
  stdout.write('Goodbye')
})
process.on('SIGINT', () => {
  process.exit()
})