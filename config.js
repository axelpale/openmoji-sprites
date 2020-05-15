/* eslint-disable quote-props */

module.exports = {
  includeGroups: [
    'smileys-emotion',
    'people-body',
    'animals-nature',
    'food-drink',
    'travel-places',
    'activities',
    'objects',
    'symbols',
    'flags',
    'extras-openmoji'
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
            'face-tongue',
            'face-hand',
            'face-neutral-skeptical',
            'face-sleepy',
            'face-unwell',
            'face-hat',
            'face-glasses',
            'face-concerned',
            'face-negative',
            'face-costume',
            'cat-face',
            'monkey-face',
            'emotion'
          ]
        }
      ]
    },
    'people-body': {
      icon: {
        emoji: '👋',
        hexcode: '1F44B'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'hand-fingers-open',
            'hand-fingers-partial',
            'hand-single-finger',
            'hand-fingers-closed'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'hands',
            'hand-prop',
            'body-parts'
          ]
        }, {
          postfix: '-02',
          includeSubgroups: [
            'person'
          ]
        }, {
          postfix: '-03',
          includeSubgroups: [
            'person-gesture'
          ]
        }, {
          postfix: '-04',
          includeSubgroups: [
            'person-role'
          ],
          range: {
            begin: 0,
            end: 180
          }
        }, {
          postfix: '-05',
          includeSubgroups: [
            'person-role'
          ],
          range: {
            begin: 180,
            end: 360
          }
        }, {
          postfix: '-06',
          includeSubgroups: [
            'person-role'
          ],
          range: {
            begin: 360
          }
        }, {
          postfix: '-07',
          includeSubgroups: [
            'person-fantasy'
          ]
        }, {
          postfix: '-08',
          includeSubgroups: [
            'person-activity'
          ],
          range: {
            begin: 0,
            end: 120
          }
        }, {
          postfix: '-09',
          includeSubgroups: [
            'person-activity'
          ],
          range: {
            begin: 120
          }
        }, {
          postfix: '-10',
          includeSubgroups: [
            'person-sport'
          ],
          range: {
            begin: 0,
            end: 120
          }
        }, {
          postfix: '-11',
          includeSubgroups: [
            'person-sport'
          ],
          range: {
            begin: 120
          }
        }, {
          postfix: '-12',
          includeSubgroups: [
            'person-resting'
          ]
        }, {
          postfix: '-13',
          includeSubgroups: [
            'family',
            'person-symbol'
          ]
        }
      ]
    },
    'animals-nature': {
      icon: {
        emoji: '🐵',
        hexcode: '1F435'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'animal-mammal',
            'animal-bird',
            'animal-amphibian',
            'animal-reptile',
            'animal-marine',
            'animal-bug',
            'plant-flower',
            'plant-other'
          ]
        }
      ]
    },
    'food-drink': {
      icon: {
        emoji: '🍇',
        hexcode: '1F347'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'food-fruit',
            'food-vegetable',
            'food-prepared',
            'food-asian',
            'food-marine',
            'food-sweet',
            'drink',
            'dishware'
          ]
        }
      ]
    },
    'travel-places': {
      icon: {
        emoji: '🌍',
        hexcode: '1F30D'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'place-map',
            'place-geographic',
            'place-building',
            'place-religious',
            'place-other'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'transport-ground',
            'transport-water',
            'transport-air',
            'hotel',
            'time',
            'sky-weather'
          ]
        }
      ]
    },
    'activities': {
      icon: {
        emoji: '🎃',
        hexcode: '1F383'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'event',
            'award-medal',
            'sport',
            'game',
            'arts-crafts'
          ]
        }
      ]
    },
    'objects': {
      icon: {
        emoji: '👓',
        hexcode: '1F453'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'clothing',
            'sound',
            'music',
            'musical-instrument',
            'phone',
            'computer',
            'light-video',
            'book-paper',
            'money'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'mail',
            'writing',
            'office',
            'lock',
            'tool',
            'science',
            'medical',
            'household',
            'other-object'
          ]
        }
      ]
    },
    'symbols': {
      icon: {
        emoji: '🏧',
        hexcode: '1F3E7'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'transport-sign',
            'warning',
            'arrow',
            'religion',
            'zodiac',
            'av-symbol',
            'gender'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'math',
            'punctuation',
            'currency',
            'other-symbol',
            'keycap',
            'alphanum',
            'geometric'
          ]
        }
      ]
    },
    'flags': {
      icon: {
        emoji: '🏁',
        hexcode: '1F3C1'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'flag'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'country-flag'
          ],
          range: {
            begin: 0,
            end: 120
          }
        }, {
          postfix: '-02',
          includeSubgroups: [
            'country-flag'
          ],
          range: {
            begin: 120
          }
        }, {
          postfix: '-03',
          includeSubgroups: [
            'subdivision-flag'
          ]
        }
      ]
    },
    'extras-openmoji': {
      icon: {
        emoji: '🦄',
        hexcode: '1F984'
      },
      sheets: [
        {
          postfix: '-00',
          includeSubgroups: [
            'animals-nature',
            'brand',
            'climate-environment',
            'emergency',
            'food-drink',
            'healthcare',
            'interaction'
          ]
        }, {
          postfix: '-01',
          includeSubgroups: [
            'objects',
            'people',
            'smileys-emotion',
            'symbols',
            'technology',
            'travel-places',
            'ui-element'
          ]
        }
      ]
    }
  }
}
