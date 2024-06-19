const { CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("okienko")
      .setDescription("Otwórz okienko do WL")
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.Move_members)
      .addStringOption(option =>
        option.setName('description')
        .setDescription('Podaj godziny w których pytasz Whitelist')
        .setRequired(true)
        ),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const description = interaction.options.getString("description");
    const config = require("../../config/config");
    const infochannelokienko = config.INFO_CHANNEL_OKIENKO;
    const INFO = client.channels.cache.get(infochannelokienko);


    const embed = new EmbedBuilder()
    .setTitle("Otwieram okienko")
    .setDescription(`Rozmowa WL zostaje otwarta \n **Przed wejściem na poczekalnie zapoznaj się z:** \n- Regulaminem serwera: ${config.LINK_DO_REGULAMINU_SERWERA}\n\n**Przypominam co potrzeba mnie przygotowane:** \n- Historia postaci.\n- Kreatyna akcja.\n- Znajomość regulaminu ogalnego jak i crime.\n\n **W godzinach:** ${description} \n\nWszystkich chętnych zapraszam na kanał: https://discord.com/channels/901923526028693554/1215348334861094993\n **Pyta:** ${interaction.user}`)
    .setColor(`${config.color_okienko}`)
    .setTimestamp()
    INFO.send({ embeds: [embed], content: `<@&${config.okienkorolaoznaczenie}>`}).then(msg => {
        setTimeout(() => {
            msg.edit({content: null, embeds: [embed]})
        }, 20000);
    })
    if (!embed) {
        return interaction.reply({content: 'Wystąpił błąd! Spróbuj ponownie później.', ephemeral: true});
    } else {
        return interaction.reply({content: `Wysłano informację na kanał`, ephemeral: true});
    }
},
}
