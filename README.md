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

Full schema by example:

    {
      includeGroups: [
        'smileys-emotion',
        'people-body',
        ...
      ],
      groups: {
        'smileys-emotion': {
          icon: '😀',
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
