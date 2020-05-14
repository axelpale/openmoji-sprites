// This runner is meant for customisation and to give an example of
// how multiple sprite sheets can be created with a single command.
//
const _ = require('lodash')
const path = require('path')
const asyn = require('async')
const mkdirp = require('mkdirp')
const config = require('./config')
const openmojis = require('./openmoji.json') // TODO require('openmoji')
const generate = require('openmoji-spritemap-generator')
const generateIndexMd = require('./lib/generate-index-md')
const generateSpritesJson = require('./lib/generate-sprites-json')

const BUILD_DIR = path.join(__dirname, 'dist')

// Ensure build dir
mkdirp.sync(BUILD_DIR)

// Group emojis by their group name into an object.
// Use the group names as keys.
const mojiGroups = openmojis.reduce((acc, moji) => {
  const groupName = moji.group
  if (!acc[groupName]) {
    acc[groupName] = []
  }
  acc[groupName].push(moji)
  return acc
}, {})

// Select only included groups.
// Chop the group into sheets defined in the config.
const COLUMNS = 16
const chunks = []
config.includeGroups.forEach(groupName => {
  const group = mojiGroups[groupName]
  config.groups[groupName].sheets.forEach((sheet, sheetIndex) => {
    const subgroupNames = sheet.includeSubgroups
    let sheetEmojis = group.filter(moji => {
      return subgroupNames.indexOf(moji.subgroups) > -1
    })
    if (sheet.range) {
      if (sheet.range.end) {
        sheetEmojis = sheetEmojis.slice(sheet.range.begin, sheet.range.end)
      } else {
        sheetEmojis = sheetEmojis.slice(sheet.range.begin)
      }
    }
    const chunk = {
      index: sheetIndex,
      name: groupName + '-' + (sheetIndex.toString()).padStart(2, '0'),
      group: groupName,
      emojis: sheetEmojis
    }
    chunks.push(chunk)
    console.log('Sheet ' + chunk.name + ' with ' +
      chunk.emojis.length + ' emojis')
  })
})
const sheetArray = _.flatten(chunks)

// For each group, run sheet generator.
// Sheet generation is asynchronous operation, thus @caolan/async is used.
asyn.eachSeries(sheetArray, (sheet, next) => {
  console.log('### Begin generating ' + sheet.name + ' ###')
  generate({
    mode: 'png',
    name: sheet.name,
    emojis: sheet.emojis,
    emojiDir: path.join(__dirname, 'openmoji-72x72-color'),
    targetDir: path.join(BUILD_DIR, 'png'),
    emojiSize: 72,
    columns: COLUMNS
  }, (er) => {
    generate({
      mode: 'svg',
      name: sheet.name,
      emojis: sheet.emojis,
      emojiDir: path.join(__dirname, 'openmoji-svg-color'),
      targetDir: path.join(BUILD_DIR, 'svg'),
      emojiSize: 72, // TODO needed with svg?
      columns: COLUMNS // TODO needed with svg?
    }, next)
  })
}, (err) => {
  if (err) {
    console.error(err)
    return
  }

  // These need the sheet files be generated before running.
  generateIndexMd()
  generateSpritesJson()

  console.log('Finished successfully.')
})
