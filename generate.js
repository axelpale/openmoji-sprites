// This runner is meant for customisation and to give an example of
// how multiple sprite sheets can be created with a single command.
//
const mojis = require('./openmoji.json') // TODO require('openmoji')
const _ = require('lodash')
const asyn = require('async')
const generate = require('openmoji-spritemap-generator')
const generateIndexMd = require('./lib/generate-index-md')
const path = require('path')

// Group emojis by their group name into an object.
// Use the group names as keys.
const mojiGroups = mojis.reduce((acc, moji) => {
  const groupName = moji.group
  if (!acc[groupName]) {
    acc[groupName] = []
  }
  acc[groupName].push(moji)
  return acc
}, {})

// Chop sheets in N emojis
const COLUMNS = 8
const CHUNK_SIZE = 16 * COLUMNS
const chunks = []
Object.keys(mojiGroups).forEach(groupName => {
  const group = mojiGroups[groupName]
  for (let i = 0; i < group.length; i += CHUNK_SIZE) {
    chunks.push({
      index: Math.floor(i / CHUNK_SIZE),
      name: groupName,
      emojis: group.slice(i, i + CHUNK_SIZE)
    })
  }
})
const groupArray = _.flatten(chunks)

// For each group, run sheet generator.
// Sheet generation is asynchronous operation, thus @caolan/async is used.
asyn.eachSeries(groupArray, (group, next) => {
  const postfix = (group.index > 0) ? '-' + group.index : ''
  generate({
    mode: 'png',
    name: group.name + postfix,
    emojis: group.emojis,
    emojiDir: path.join(__dirname, 'openmoji-72x72-color'),
    targetDir: path.join(__dirname, 'docs', 'png'),
    emojiSize: 72,
    columns: COLUMNS
  }, (er) => {
    generate({
      mode: 'svg',
      name: group.name + postfix,
      emojis: group.emojis,
      emojiDir: path.join(__dirname, 'openmoji-svg-color'),
      targetDir: path.join(__dirname, 'docs', 'svg'),
      emojiSize: 72, // TODO needed with svg?
      columns: COLUMNS // TODO needed with svg?
    }, next)
  })
}, (err) => {
  if (err) {
    console.error(err)
    return
  }

  // Generate an index page to browse the generated sheets.
  // const indexHtml = generateIndex(groupArray)
  // const indexPath = path.join(__dirname, 'docs', 'generated.html')
  // fs.writeFileSync(indexPath, indexHtml)

  console.log('Finished successfully.')
})

generateIndexMd()
