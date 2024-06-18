const {
  CommandInteraction,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const moment = require("moment");

const verificationLevels = {
  0: "Brak",
  1: "Niski",
  2: "Średni",
  3: "(╯°□°）╯︵ ┻━┻",
  4: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
	.setDMPermission(false)
    .setDescription("Wyświelt informacje o Serwerze"),

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const roles = interaction.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());
    const channels = interaction.guild.channels.cache;
    const emojis = interaction.guild.emojis.cache;
    const members = interaction.guild.members.cache;

    moment.locale("pl");

    await interaction.member.fetch().then((m) => {
      console.log(m.premiumSinceTimestamp);
    });

    const embed = new EmbedBuilder()
      .setDescription(`**Server Info**`)
      .setColor(interaction.member.displayHexColor)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addFields({
        name: "Ogólne",
        value: `**Nazwa:** ${interaction.guild.name}\n**ID:** ${
          interaction.guild.id
        }\n**Właściciel:** <@${interaction.guild.ownerId}> (${
          interaction.guild.ownerId
        })\n**Preferowany Język:** ${
          interaction.guild.preferredLocale
        }\n**Poziom Boostów:** ${
          interaction.guild.premiumTier
            ? `Tier ${interaction.guild.premiumTier}`
            : "Brak"
        }\n**Poziom Weryfikacji:** ${
          verificationLevels[interaction.guild.verificationLevel]
        }\n**Stworzono:** ${moment(interaction.guild.createdTimestamp).format(
          "LT"
        )} ${moment(interaction.guild.createdTimestamp).format("LL")} [${moment(
          interaction.guild.createdTimestamp
        ).fromNow()}]`,
        inline: true,
      })
      .addFields({
        name: "Statystyki",
        value: `**Liczba Ról:** ${roles.length}\n**Liczba Emoji:** ${
          emojis.size
        }\n**Liczba zwykłych Emoji:** ${
          emojis.filter((emoji) => !emoji.animated).size
        }\n**Liczba animowanych Emoji:** ${
          emojis.filter((emoji) => emoji.animated).size
        }\n**Ilość Członków:** ${interaction.guild.memberCount}\n**Ludzie:** ${
          members.filter((member) => !member.user.bot).size
        }\n**Boty:** ${
          members.filter((member) => member.user.bot).size
        }\n**Kanały Tekstowe:** ${
          channels.filter((channel) => channel.type === "text").size
        }\n**Kanały Głosowe:** ${
          channels.filter((channel) => channel.type === "voice").size
        }\n**Liczba Boostów:** ${
          interaction.guild.premiumSubscriptionCount || "0"
        }`,
        inline: true,
      })

      .addFields({
        name: `Role [${roles.length - 1}]`,
        value: roles.join(", "),
      })

      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
