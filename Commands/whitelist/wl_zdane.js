const {SlashCommandBuilder, EmbedBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const config = require("../../config/config");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("zdane")
    .setDescription("Wysyła informację o zdaniu WL przez użytkownika")
	.setDMPermission(false)
	.setDefaultMemberPermissions(PermissionFlagsBits.Move_members)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Oznacz użytkownika który zdał Whitelist')
        .setRequired(true)
        ),
    async execute(interaction, client) {
        const wynikiwlchannel = config.ID_KANAŁU_ZDANE_WL;
        const WYNIK_WL_CHANNEL = client.channels.cache.get(wynikiwlchannel);
        const user = interaction.options.getUser("user");
        const member = interaction.options.getMember("user"); 


        member.roles.add(`${config.WL_ZDANE_RANGA}`)

        const Whitelistzdane = new EmbedBuilder()
        .setTitle("Whitelist")
        .setDescription(`WL-CHECKER: ${interaction.user}\n\n ${user} \nZ radością informujemy, że WL Checker ocenił Twoją rozmowę WL jako zaliczoną ✅`)
        .setColor(`#10ff00`)
        WYNIK_WL_CHANNEL.send({embeds: [Whitelistzdane], content: `${user}`}).then(msg => {
            setTimeout(() => {
                msg.edit({content: null, embeds: [Whitelistzdane]})
            }, 20000);
        })
        if (!Whitelistzdane) {
            return interaction.reply({content: 'Wystąpił błąd! Spróbuj ponownie później.', ephemeral: true});
        } else {
            return interaction.reply({content: `Wysłano informację na kanał | oraz dodano rangę <@&${config.WL_ZDANE_RANGA}>`, ephemeral: true});
        }
    },
        }