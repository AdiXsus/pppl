const {
  SlashCommandBuilder,
  CommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Pokazuje informacje na temat użytkownika")
	.setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("użytkownik")
        .setDescription("Wybierz Użytkownika.")
        .setRequired(false)
    ),
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const nig = interaction.options.getUser("użytkownik");
    let nigger = null;
    if (nig) {
      nigger = interaction.options.getUser("użytkownik").id;
    } else {
      nigger = interaction.user.id;
    }
    const userID = nigger;

    const { guild } = interaction;
    //
    const member = guild.members.cache.get(`${userID}`);
    let user = undefined;
    try {
      user = await client.users.fetch(`${userID}`);
    } catch (error) {}
    //
    await user.fetch();
    let color =
      member.displayHexColor == "#000000" ? "#57f288" : member.displayHexColor;
    let kanalglosowy = "brak";
    if (member.voice.channelID) {
      let lista = [];
      if (member.voice.serverDeaf) lista.push("Serwerowe wyłączenie dźwięku");
      if (member.voice.serverMute) lista.push("Serwerowy mute");
      if (member.voice.selfMute) lista.push("Self mute");
      if (member.voice.selfDeaf) lista.push("Self wyłączenie dźwięku");
      if (member.voice.selfVideo) lista.push("Kamerka");
      if (member.voice.streaming) lista.push("Stream");
      kanalglosowy = `<#${member.voice.channelID}> ${
        lista.length == 0 ? "" : ` (${lista.join(", ")})`
      }`;
    }
    let role = [];
    member._roles.forEach((element) => {
      role.push(`<@&${element}>`);
    });
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTimestamp()
      .setTitle(`Informacje o: ${user.username}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`
                \`Użytkownik:\` ${member} | ${member.user.tag}
                \`Nick:\` ${member.nickname || "brak"}
                \`ID:\` ${user.id}
                \`Bot:\` ${user.bot ? "tak" : "nie"}
                \`Avatar:\` [[link]](${user.displayAvatarURL({
                  dynamic: true,
                })})
                \`Banner:\` ${
                  user.bannerURL() == null
                    ? `brak`
                    : `[[link]](${user.bannerURL({ dynamic: true })})`
                }
                \`Data dołączenia na serwer:\` ${new Date(
                  member.joinedTimestamp
                ).toLocaleString()}
                \`Data stworzenia konta:\` ${new Date(
                  member.user.createdTimestamp
                ).toLocaleString()}
                \`Role użytkownika:\` ${role.join(`, `)}
                \`Najwyższa rola Użytkownika:\` ${member.roles.highest}
                \`Permisje:\` ${member.permissions
                  .toArray()
                  .join(", ")
                  .toLowerCase()}
                \`Czy bot może zbanować:\` ${member.bannable ? "tak" : "nie"}
                \`Czy bot może wyrzucić:\` ${member.kickable ? "tak" : "nie"}
                \`Czy bot może zarządzać:\` ${member.manageable ? "tak" : "nie"}
                `);
    //
    if (user.bannerURL() != null)
      embed.setImage(user.bannerURL({ dynamic: true }));
    //
    interaction.reply({ embeds: [embed] });
  },
};
