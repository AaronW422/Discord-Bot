const axios = require('axios');
const { formatMonsterHunterName } = require('./text');
const [monsterHunterDatabaseURL, monsterHunterWikiURL] = [
  process.env.MONSTER_HUNTER_DB_URL,
  process.env.MONSTER_HUNTER_WIKI_URL,
];

module.exports = {
  getMonsterHunterDatabaseAxios: (endpoint, type, data) =>
    axios.get(
      `${monsterHunterDatabaseURL}/${endpoint}${
        type && data ? `?q={"${type}":"${data}"}` : ''
      }`
    ),
  generateMonsterHunterWikiURL: (type, name) => {
    switch (type) {
      case 'page':
        return `${monsterHunterWikiURL}/${formatMonsterHunterName(name, '+')}`;
      case 'monster-thumbnail':
        return `${monsterHunterWikiURL}/file/Monster-Hunter-World/mhw-${formatMonsterHunterName(
          name.toLowerCase(),
          '_'
        )}_icon.png`;
      case 'item-thumbnail':
        return `${monsterHunterWikiURL}/file/Monster-Hunter-World/item_${formatMonsterHunterName(
          name.toLowerCase(),
          '_'
        )}.png`;
    }
  },
};
