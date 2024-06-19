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


client.commands = new Collection();

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    handlerLogs(client);
});

module.exports = client;
