const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({ content: "Wystąpił Błąd | Developer Bota: adixsus3" });
    }

    command.execute(interaction, client);
  },
};
