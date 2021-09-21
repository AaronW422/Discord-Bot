const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { capitalizeString } = require('../util/text');
const {
  getMonsterHunterDatabaseAxios,
  generateMonsterHunterWikiURL,
} = require('../util/generateMonsterHunterURLs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('monster')
    .setDescription('Return a description of the monster.')
    .addStringOption((option) =>
      option.setName('name').setDescription('Name of a monster')
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    if (name) {
      const { data } = await getMonsterHunterDatabaseAxios(
        'monsters',
        'name',
        name
      );
      if (data.length) {
        const monster = data[0];
        const weaknessArray = monster.weaknesses
          .filter((weakness) => weakness.stars >= 2)
          .map(
            (weakness) =>
              `${capitalizeString(weakness.element)}: ${weakness.stars} ★`
          );
        const locationsArray = monster.locations.map(
          (location) => location.name
        );
        const monsterEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(monster.name)
          .setDescription(monster.description)
          .setURL(generateMonsterHunterWikiURL('page', monster.name))
          .setThumbnail(
            generateMonsterHunterWikiURL('monster-thumbnail', monster.name)
          )
          .addFields(
            {
              name: 'Locations',
              value: locationsArray.join('\n'),
              inline: true,
            },
            {
              name: 'Weaknesses',
              value: weaknessArray.join('\n'),
              inline: true,
            }
          );
        return interaction.reply({ embeds: [monsterEmbed] });
      }
      return interaction.reply(
        'No monster found. Please check the spelling of the name!'
      );
    }
    return interaction.reply('Please enter the name of a monster!');
  },
};
