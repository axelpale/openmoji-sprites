const fs = require('fs')
const path = require('path')
const config = require('../config')
const getSheetFileSizes = require('./getSheetFileSizes')

function generateIndexMd () {
  const targetDir = path.resolve(__dirname, '..', 'dist')
  const indexMd = path.join(targetDir, 'index.md')

  const order = config.includeGroups

  const emoji = order.map(groupName => {
    return config.groups[groupName].icon.emoji
  })

  // header
  let content = `
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">
<style>
  .markdown-body {
    font-family: "Source Sans Pro", sans-serif;
  }
</style>

This project is a work-in-progress attempt to create a practical set of
sprite sheets for [OpenMoji.org](https://openmoji.org/) emojis. The sprite sheets
presented here were generated with
[axelpale/openmoji-spritemap-generator](https://github.com/axelpale/openmoji-spritemap-generator)
and are licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

`
  // table of contents
  for (const [key, value] of Object.entries(order)) {
    content += `* [${emoji[key]} ${value}](#-${value})\n`
  }

  content += '* [ℹ about](#ℹ-about)\n\n'

  // download section
  content += `
## Download

Download all PNG and SVG sprites and their CSS sheets as one package:

> [openmoji-sprites.zip](https://github.com/axelpale/openmoji-sprites/releases/download/2.0.0/openmoji-sprites-v2.0.0.zip)

Alternatively via command line:

    $ wget https://github.com/axelpale/openmoji-sprites/releases/download/2.0.0/openmoji-sprites-v2.0.0.zip

To download a single emoji group, see the emojis and files below.

How to use the files? See the html examples in the package.

`

  // create list of spritesheets
  const spritesheets = []

  order.forEach(groupName => {
    const group = config.groups[groupName]
    group.sheets.forEach(sheet => {
      spritesheets.push(sheet)
    })
  })

  // all the sections
  order.forEach(groupName => {
    const group = config.groups[groupName]
    content += `## ${group.icon.emoji} ${groupName}\n\n`

    group.sheets.forEach(sheet => {
      const j = groupName + sheet.postfix
      const sizes = getSheetFileSizes(targetDir, j)
      content += `[<img src="png72/${j}.png" width="288">](png72/${j}.png)

<details>
  <summary><strong>PNG 72px sheets</strong></summary>

  <p>
  Sheet image: <a href="png72/${j}.png">${j}.png</a> ~ ${sizes.png72.png} kB<br>
  CSS sprite sheet: <a href="png72/${j}.css">${j}.css</a> ~ ${sizes.png72.css} kB<br>
  Custom JSON: <a href="png72/${j}.json">${j}.json</a><br>
  Hexcodes JS: <a href="png72/${j}-hexcodes.js">${j}-hexcodes.js</a>
  </p>

  <h6>Usage examples for PNG sheets</h6>
  <p>
  HTML image map: <a href="png72/${j}.html">${j}.html</a><br>
  CSS sprites: <a href="png72/${j}-css.html">${j}-css.html</a>
  </p>
</details>

<details>
  <summary><strong>SVG sheets</strong></summary>

  <p>
  Sheet image: <a href="svg/${j}.svg">${j}.svg</a> ~ ${sizes.svg.svg} kB<br>
  CSS sprite sheet: <a href="svg/${j}.css">${j}.css</a> ~ ${sizes.svg.css} kB<br>
  Custom JSON: <a href="svg/${j}.json">${j}.json</a><br>
  Hexcodes JS: <a href="svg/${j}-hexcodes.js">${j}-hexcodes.js</a>
  </p>

  <h6>Usage examples for SVG sheets</h6>
  <p>
  HTML image map: <a href="svg/${j}.html">${j}.html</a><br>
  CSS sprites: <a href="svg/${j}-css.html">${j}-css.html</a>
  </p>
</details><br><br>\n\n`
    })
  })

  // footer
  content += `## ℹ About

Images licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode).<br>
Emojis by [OpenMoji.org](https://openmoji.org/).

Improve this page via [GitHub](https://github.com/axelpale/openmoji-sprites).\n`

  // clear file
  fs.truncate(indexMd, 0, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // index.md not exist. This is ok
        console.log('index.md created.')
      } else {
        throw err
      }
    }

    // write file
    fs.appendFile(indexMd, content, (err) => {
      if (err) throw err
    })
  })
}

module.exports = generateIndexMd

if (require.main === module) {
  generateIndexMd()
}
