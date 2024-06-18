const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
	.setDMPermission(false)
    .setDescription("Sprawdż ping oraz Uptime Bota"),
    async execute(interaction, client) {

        const apiPing = client.ws.ping

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const Embed = new EmbedBuilder()
	    .setTitle('PING')
        .setColor("Purple")
        .setDescription(`Ping Discord API: \`${apiPing}\` \n Uptime: \`${days}d ${hours}h ${minutes}m ${seconds}s\` `)
        .setTimestamp()

        interaction.reply({ embeds: [Embed], ephemeral: true });
    },
};