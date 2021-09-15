const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

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
      const res = await axios.get(
        `https://mhw-db.com/monsters?q={"name":"${name}"}`
      );
      if (res.data.length) {
        const monster = res.data[0];
        const weaknessArray = monster.weaknesses
          .filter((weakness) => weakness.stars >= 2)
          .map(
            (weakness) =>
              `${
                weakness.element.charAt(0).toUpperCase() +
                weakness.element.slice(1)
              }: ${weakness.stars} ★`
          );
        const locationsArray = monster.locations.map(
          (location) => location.name
        );
        const monsterEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(monster.name)
          .setDescription(monster.description)
          .setURL(
            `https://monsterhunterworld.wiki.fextralife.com/${monster.name
              .split(' ')
              .join('+')}`
          )
          .setThumbnail(
            `https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/mhw-${monster.name
              .toLowerCase()
              .split(' ')
              .join('_')}_icon.png`
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
