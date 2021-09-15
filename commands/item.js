const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

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
      const res = await axios.get(
        `https://mhw-db.com/items?q={"name":"${name}"}`
      );
      if (res.data.length) {
        const item = res.data[0];
        const itemEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(item.name)
          .setDescription(item.description)
          .setURL(
            `https://monsterhunterworld.wiki.fextralife.com/${item.name
              .split(' ')
              .join('+')}`
          )
          .setThumbnail(
            `https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/item_${item.name
              .toLowerCase()
              .split(' ')
              .join('_')}.png`
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
