const mojis = require('../openmoji.json')
const _ = require('lodash')

// Group emojis by their group name into an object.
// Use the group names as keys.
const groups = mojis.reduce((acc, moji) => {
  const groupName = moji.group
  if (!acc[groupName]) {
    acc[groupName] = []
  }
  acc[groupName].push(moji)
  return acc
}, {})

// For each group, find subgroups
const subgroupIndex = _.reduce(groups, (acc, group, groupName) => {
  const subgroups = group.map(moji => moji.subgroups)
  acc[groupName] = _.uniq(subgroups)
  return acc
}, {})

// Output
_.each(subgroupIndex, (subgroups, groupName) => {
  console.log(groupName)
  subgroups.forEach(subgroup => {
    console.log('  ' + subgroup)
  })
})
