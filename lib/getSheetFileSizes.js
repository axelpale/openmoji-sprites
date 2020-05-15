const fs = require('fs')
const path = require('path')

const kbytes = (filepath) => {
  const kibs = fs.statSync(filepath).size / 1024
  return Math.round(kibs) // NOTE 400 bytes will return 0
}

module.exports = (dirPath, sheetName) => {
  // Parameters:
  //   dirPath
  //     Abs path to the dir where png/ and svg/ dirs are located.
  //   sheetName
  //     e.g. 'animals-nature-00'
  //
  // Return an object with sizes in kB
  const a = path.join(dirPath, 'png72', sheetName + '.png')
  const b = path.join(dirPath, 'png72', sheetName + '.css')
  const c = path.join(dirPath, 'svg', sheetName + '.svg')
  const d = path.join(dirPath, 'svg', sheetName + '.css')
  return {
    png72: {
      png: kbytes(a),
      css: kbytes(b)
    },
    svg: {
      svg: kbytes(c),
      css: kbytes(d)
    }
  }
}
