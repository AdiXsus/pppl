const {SlashCommandBuilder, EmbedBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const config = require("../../config/config");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("niezdane")
    .setDescription("Wysyła informację o niezdaniu WL przez użytkownika")
	.setDMPermission(false)
	.setDefaultMemberPermissions(PermissionFlagsBits.Move_members)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Oznacz użytkownika który nie zdał Whitelist')
        .setRequired(true)
        ),
    async execute(interaction, client) {
        const wynikiwlchannelniezdane = config.ID_KANAŁU_NIE_ZDANE_WL;
        const WYNIK_WL_CHANNEL_NIE = client.channels.cache.get(wynikiwlchannelniezdane);
        const user = interaction.options.getUser("user");

        const Whitelistniezdane = new EmbedBuilder()
        .setTitle("Whitelist")
        .setDescription(`WL-CHECKER: ${interaction.user}\n\n ${user} \nZ przykrością informujemy, że WL Checker stwierdził, że Twoja rozmowa WL została niezaliczona ❌`)
        .setColor(`#ff0005`)
        WYNIK_WL_CHANNEL_NIE.send({embeds: [Whitelistniezdane], content: `${user}`}).then(msg => {
            setTimeout(() => {
                msg.edit({content: null, embeds: [Whitelistniezdane]})
            }, 20000);
        })
        if (!Whitelistniezdane) {
            return interaction.reply({content: 'Wystąpił błąd! Spróbuj ponownie później.', ephemeral: true});
        } else {
            return interaction.reply({content: `Wysłano informację na kanał`, ephemeral: true});
        }
    },
        }