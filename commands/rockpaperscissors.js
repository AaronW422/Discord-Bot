const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play a round of rock/paper/scissors with the bot!'),
  async execute(interaction) {
    return interaction.reply();
  },
};
