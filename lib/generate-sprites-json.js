// This module implements the generation of a combined data sheet
// for all the generated sprite sheets.
const config = require('../config')
const pjson = require('../package.json')
const path = require('path')
const fs = require('fs')

const docsPath = path.resolve(__dirname, '..', 'dist')
const targetPath = path.join(docsPath, 'sprites.json')
const hexcodesDir = path.join(docsPath, 'png')

// Build hexcode index. A map from groupname-00 to list of hexcodes.
// Hexcodes help in constructing pickers and other visualizations.
// NOTE inline require calls
const hexcodesIndex = {}
config.includeGroups.forEach(groupName => {
  const group = config.groups[groupName]
  group.sheets.forEach(sheet => {
    const hexcodesFilename = groupName + sheet.postfix + '-hexcodes.js'
    const pathToHexcodes = path.join(hexcodesDir, hexcodesFilename)
    hexcodesIndex[groupName + sheet.postfix] = require(pathToHexcodes)
  })
})

const generateSpritesJson = () => {
  const sprites = {
    includeGroups: config.includeGroups,
    groups: {},
    // Add version to ease debugging
    version: pjson.version
  }

  // Include hexcodes
  config.includeGroups.forEach(groupName => {
    const group = config.groups[groupName]
    const hexedSheets = group.sheets.map(sheet => {
      return Object.assign({}, sheet, {
        hexcodes: hexcodesIndex[groupName + sheet.postfix]
      })
    })

    sprites.groups[groupName] = Object.assign({}, group, {
      sheets: hexedSheets
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
