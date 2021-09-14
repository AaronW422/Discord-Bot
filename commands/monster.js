const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('monster')
    .setDescription('Return a description of the monster.')
    .addStringOption((option) =>
      option.setName('input').setDescription('Name of a monster')
    ),
  async execute(interaction) {
    const input = interaction.options.getString('input');
    console.log(input);
    if (input) {
      const res = await axios.get(
        `https://mhw-db.com/monsters?q={"name":"${input}"}`
      );
      return interaction.reply(res.data[0].name);
    }
    return interaction.reply('Please enter the name of a monster!');
  },
};
