const config = require("./config/config");
const { Client, SlashCommandBuilder, GatewayIntentBits, Partials, Collection, EmbedBuilder, hyperlink } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildMessageReactions, GuildVoiceStates, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;
const { loadEvents } = require("./handlers/eventHandler");
const { loadCommands } = require("./handlers/commandHandler");
const { handlerLogs } = require("./handlers/handlerLogs")

const keep_alive = require('./keep_alive.js')
const fs = require('fs');
const request = new (require('rss-parser'))();

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    DirectMessages,
    GuildMessageReactions,
      GuildVoiceStates,
      GuildPresences
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});


client.on('ready', () => {
    console.log(`Zalogowany jako ${client.user.tag}!`);
    
    // Ustawienie customowego statusu
});

// invite-tracker

const InvitesTracker = require("@androz2091/discord-invites-tracker");
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true,
});

tracker.on("guildMemberAdd", (member, type, invite) => {
    const logChannel = member.guild.channels.cache.get(
        client.config.inviteLoggerChannel,
    );

    const embed = new EmbedBuilder();
    embed.setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
    });
    embed.setColor("#1800ff");
    embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
    embed.setFooter({
        text: `Obecna ilość użtkowników: ${member.guild.memberCount}`,
    });

    if (type === "normal") {
        embed.setDescription(
            `Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} został zaproszony przez <@${invite.inviter.id}> | ${invite.inviter.tag}`,
        );
        logChannel.send({ embeds: [embed] });
    } else if (type === "vanity") {
        embed.setDescription(
            `Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył używając niestandardowego zaproszenia!`,
        );
        logChannel.send({ embeds: [embed] });
    } else if (type === "permissions") {
        embed.setDescription(
            `Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył na serwer, lecz nie mam uprawnień do wyświetlenia przez kogo!`,
        );
        logChannel.send({ embeds: [embed] });
    } else if (type === "unknown") {
        embed.setDescription(
            `Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył na serwer!`,
        );
        logChannel.send({ embeds: [embed] });
    }
});

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        embedColorEnd: "#000000",
        reaction: "🎉",
    },
});

client.giveawaysManager = manager;

client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    handlerLogs(client);
});

module.exports = client;
