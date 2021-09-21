const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  getMonsterHunterDatabaseAxios,
  generateMonsterHunterWikiURL,
} = require('../util/generateMonsterHunterURLs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('item')
    .setDescription('Return a description of the item.')
    .addStringOption((option) =>
      option.setName('name').setDescription('Name of a item')
    ),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    if (name) {
      const { data } = await getMonsterHunterDatabaseAxios(
        'items',
        'name',
        name
      );
      if (data.length) {
        const item = data[0];
        const itemEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(item.name)
          .setDescription(item.description)
          .setURL(generateMonsterHunterWikiURL('page', item.name))
          .setThumbnail(
            generateMonsterHunterWikiURL('item-thumbnail', item.name)
          )
          .addFields(
            {
              name: 'Rarity',
              value: `${item.rarity}`,
              inline: true,
            },
            {
              name: 'Carry Limit',
              value: `${item.carryLimit}`,
              inline: true,
            },
            {
              name: 'Sell Value',
              value: `${item.value}z`,
              inline: true,
            }
          );
        return interaction.reply({ embeds: [itemEmbed] });
      }
      return interaction.reply(
        'No item found. Please check the spelling of the name!'
      );
    }
    return interaction.reply('Please enter the name of an item!');
  },
};
