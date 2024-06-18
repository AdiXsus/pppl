const {SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Avatar użytkownika")
	.setDMPermission(false)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Oznacz użytkownika którego chcesz avatar')
        .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser("user");

      
      const button = new ButtonBuilder()
      .setEmoji("🌐")
      .setLabel("Link")
      .setStyle(5)
      .setURL(
        user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })
      );

      const row = new ActionRowBuilder().addComponents(button);
 
      const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

    const embed = new EmbedBuilder()
    .setTitle(`Avatar - ${user.tag}`)
    .setColor(`Purple`)
    .setImage(avatar)

    await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true
    });
    }
}