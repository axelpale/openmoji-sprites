const fs = require('fs')

function generateIndexMd () {
  const indexMd = 'docs/index.md'

  const order = ['smileys-emotion', 'people-body', 'animals-nature', 'food-drink',
    'travel-places', 'activities', 'objects', 'symbols', 'extras-openmoji'
  ]

  const emoji = ['😀', '👋', '🐵', '🍇', '🌍', '🎃', '👓', '🏧', '🦄']

  // header
  let content = `
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" rel="stylesheet">
<style>
  .markdown-body {
    font-family: "Source Sans Pro", sans-serif;
  }
</style>

# [openmoji-sprites](https://axelpale.github.io/openmoji-sprites/)

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

  // create list of spritesheets
  const spritesheets = []

  for (const i of order) {
    try {
      spritesheets.push(i)
      // we should make this more robust by having all spritesheets have an index
      // and then we can iterate over them and break if not exists
      const path = 'docs/png/' + i + '-1.png'
      console.log(path)
      if (fs.existsSync(path)) {
        spritesheets.push(i + '-1')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // all the sections
  for (const [key, value] of Object.entries(order)) {
    content += `## ${emoji[key]} ${value}\n\n`

    const sheets = spritesheets.filter((item) => RegExp('^' + value).test(item))

    for (const j of sheets) {
      content += `[<img src="png/${j}.png" width="180">](png/${j}.png)

<details>
  <summary><strong>PNG 72px sheets</strong></summary>

  Merged image: <a href="png/${j}.png">${j}.png</a><br>
  HTML image map: <a href="png/${j}.html">${j}.html</a><br>
  CSS sprite sheet: <a href="png/${j}.css">${j}.css</a><br>
  CSS sprite example: <a href="png/${j}-css.html">${j}-css.html</a><br>
  Custom JSON: <a href="png/${j}.json">${j}.json</a>
</details>

<details>
  <summary><strong>SVG sheets</strong></summary>

  Merged image: <a href="svg/${j}.svg">${j}.svg</a><br>
  HTML image map: <a href="svg/${j}.html">${j}.html</a><br>
  CSS sprite sheet: <a href="svg/${j}.css">${j}.css</a><br>
  CSS sprite example: <a href="svg/${j}-css.html">${j}-css.html</a><br>
  Custom JSON: <a href="svg/${j}.json">${j}.json</a>
</details><br><br>\n\n`
    }
  }

  // footer
  content += `## ℹ About

Images licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode).<br>
Emojis by [OpenMoji.org](https://openmoji.org/).

Improve this page via [GitHub](https://github.com/axelpale/openmoji-sprites).\n`

  // clear file
  fs.truncate(indexMd, 0, (err) => {
    if (err) throw err

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
