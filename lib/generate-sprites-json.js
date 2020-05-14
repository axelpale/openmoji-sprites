// This module implements the generation of a combined data sheet
// for all the generated sprite sheets.
// WARNING Only run after the sheet generation is finished. Those are needed.
const config = require('../config')
const pjson = require('../package.json')
const path = require('path')
const fs = require('fs')

const docsPath = path.resolve(__dirname, '..', 'dist')
const targetPath = path.join(docsPath, 'sprites.json')
const hexcodesDir = path.join(docsPath, 'png')

const generateSpritesJson = () => {
  const sprites = {
    includeGroups: config.includeGroups,
    groups: {},
    // Add version to ease debugging
    version: pjson.version
  }

  // Build hexcode index. A map from groupname-00 to list of hexcodes.
  // Hexcodes help in constructing pickers and other visualizations.
  // NOTE inline require calls
  const hexcodesIndex = {}
  config.includeGroups.forEach(groupName => {
    const group = config.groups[groupName]
    group.sheets.forEach(sheet => {
      const sheetName = groupName + sheet.postfix
      const hexcodesFilename = sheetName + '-hexcodes.js'
      const pathToHexcodes = path.join(hexcodesDir, hexcodesFilename)
      hexcodesIndex[sheetName] = require(pathToHexcodes)
    })
  })

  config.includeGroups.forEach(groupName => {
    const group = config.groups[groupName]

    // Include name and hexcodes
    const hexedSheets = group.sheets.map(sheet => {
      const sheetName = groupName + sheet.postfix
      const hexcodesFilename = sheetName + '-hexcodes.js'
      const pathToHexcodes = path.join(hexcodesDir, hexcodesFilename)
      return Object.assign({}, sheet, {
        name: sheetName,
        hexcodes: require(pathToHexcodes)
      })
    })

    // Include paths
    const pathedSheets = hexedSheets.map(sheet => {
      return Object.assign({}, sheet, {
        files: {
          png72: {
            png: 'png/' + sheet.name + '.png',
            css: 'png/' + sheet.name + '.css'
          },
          svg: {
            svg: 'svg/' + sheet.name + '.svg',
            css: 'svg/' + sheet.name + '.css'
          }
        }
      })
    })

    sprites.groups[groupName] = Object.assign({}, group, {
      name: groupName,
      sheets: pathedSheets
    })
  })

  // Easy-to-read JSON
  const spritesJson = JSON.stringify(sprites, null, ' ')

  fs.writeFile(targetPath, spritesJson, err => {
    if (err) throw err
  })
}

module.exports = generateSpritesJson

if (require.main === module) {
  // Usage: $ node generate-sprites-json
  generateSpritesJson()
}
