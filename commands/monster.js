const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');
const getData = require('../util/getData.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('monster')
    .setDescription('Looks up and returns a description of the monster.'),
  async execute(interaction) {
    const res = await axios.get(
      `https://mhw-db.com/monsters?q={"name":"anjanath"}`
    );

    return interaction.reply(res.data[0].name);
  },
};
