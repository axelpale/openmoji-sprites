# openmoji-sprites

Production-ready sprite sheets for [OpenMoji.org](https://openmoji.org/) emojis available at [axelpale.github.io/openmoji-sprites](https://axelpale.github.io/openmoji-sprites)

![Fruits](docs/fruits-sample.png)

## Data API

Programmatic access to the sheet files and their emoji content.

    $ npm install openmoji-sprites

Usage:

    > const sprites = require('openmoji-sprites')
    > sprites.group['smileys-emotion'].sheets[0].hexcodes
    [
      '1F600',
      '1F603',
      '1F604',
      '1F601',
      ...
    ]

Usage with [Webpack](https://webpack.js.org/), [file-loader](https://webpack.js.org/loaders/file-loader/), and [style-loader](https://webpack.js.org/loaders/style-loader/):

    const urlToAnimals = require('openmoji-sprites/docs/png/animals-nature-00.png')

Advanced usage with Webpack and [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext):

    const sprites = require('openmoji-sprites')
    // Preload all PNG sheets and bundle their CSS
    const resolve = require.context('openmoji-sprites/docs/', true, /\.(png|css)$/i)
    // Activate each CSS sheet.
    sprites.includeGroups.forEach(groupName => {
      const group = sprites.groups[groupName]
      group.sheets.forEach(sheet => {
        // Style loader inserts CSS into DOM when resolved.
        resolve(sheet.files.png.css)
      })
    })

    // Then for example insert a smiley:
    button.innerHTML = '<span class="openmoji openmoji-1F600"></span>'

Full schema by example:

    {
      includeGroups: [
        'smileys-emotion',
        'people-body',
        ...
      ],
      groups: {
        'smileys-emotion': {
          icon: {
            emoji: '😀',
            hexcode: '1F600'
          },
          sheets: [
            {
              postfix: '-00',
              includeSubgroups: [
                'face-smiling',
                'face-affection',
                ...
              ],
              hexcodes: [
                '1F600',
                '1F603',
                '1F604',
                ...
              ]
            },
            ...
          ]
        },
        'people-body': { ... }
        ...
      },
      version: '1.2.3'
    }

## Development

1. Download openmoji files for the generator.
1. Install deps `$ npm install`
1. Check syntax `$ npm run lint`
1. Generate sheets `$ npm run generate`
1. Commit new sheets `$ cp -R dist/* docs`
