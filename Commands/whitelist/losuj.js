const { CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("losuj")
      .setDescription("Losuj osobę z Poczekalni!")
      .setDMPermission(false),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const config = require("../../config/config");
    try {
      const kanalGlosowy = interaction.guild.channels.cache.get(
        config.ID_KANALU_GLOSOWEGO_POCZEKALNI
      );
      const kanalGlosowyAdmin = interaction.guild.channels.cache.get(
        interaction.member.voice.channel.id
      );
      const randomowygosciu = kanalGlosowy.members.random();
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `${randomowygosciu.user.tag}`,
              iconURL: randomowygosciu.user.displayAvatarURL({
                dynamic: true,
              }),
            })
            .setColor("Purple")
            .setDescription(
              `Wylosowana osoba to: ${randomowygosciu} oraz została przerzucona na kanał:  ${kanalGlosowyAdmin}`
            )
            .setTimestamp(),
        ],
      });
      randomowygosciu.voice.setChannel(kanalGlosowyAdmin);
    } catch (err) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Wystąpił Błąd. \n\nNajprawdopodobniej nikt nie znajduje się na Kanale Głosowym! sad :("
            )
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    }
  },
};