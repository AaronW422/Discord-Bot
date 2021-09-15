const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('monster-list')
    .setDescription('Return a list of all large monsters (Iceborne).'),
  async execute(interaction) {
    const res = await axios.get(
      `https://mhw-db.com/monsters?q={"type":"large"}`
    );
    const monsterList = res.data.map((monster) => monster.name);

    const monsterListEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('List of All Large Monsters (Iceborne)')
      .setDescription(monsterList.join('\n'));

    return interaction.reply({ embeds: [monsterListEmbed] });
  },
};
