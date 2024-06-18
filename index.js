const config = require("./config/config");
const { Client, SlashCommandBuilder, GatewayIntentBits, Partials, Collection, EmbedBuilder, hyperlink } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildMessageReactions, GuildVoiceStates, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;
const { loadEvents } = require("./handlers/eventHandler");
const { loadCommands } = require("./handlers/commandHandler");
const { handlerLogs } = require("./handlers/handlerLogs")

const fs = require('fs');
const request = new (require('rss-parser'))();
const keep_alive = require('./keep_alive.js')

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


const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});




// invite-tracker

const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

tracker.on('guildMemberAdd', (member, type, invite) => {

    const logChannel = member.guild.channels.cache.get(client.config.inviteLoggerChannel);

    const embed = new EmbedBuilder()
    embed.setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true })});
    embed.setColor('#1800ff')
    embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    embed.setFooter({ text: `Obecna ilość użtkowników: ${member.guild.memberCount}` })

    if(type === 'normal'){
        embed.setDescription(`Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} został zaproszony przez <@${invite.inviter.id}> | ${invite.inviter.tag}`)
        logChannel.send({ embeds: [embed] })
    }

    else if(type === 'vanity'){
        embed.setDescription(`Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył używając niestandardowego zaproszenia!`)
        logChannel.send({ embeds: [embed] })
    }

    else if(type === 'permissions'){
        embed.setDescription(`Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył na serwer, lecz nie mam uprawnień do wyświetlenia przez kogo!`)
        logChannel.send({ embeds: [embed] })
    }

    else if(type === 'unknown'){
        embed.setDescription(`Użytownik <@${member.id}> | ${member.user.tag} | ${member.user.id} dołączył na serwer!`)
        logChannel.send({ embeds: [embed] })
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

if (config.wl_yt) {
    client.on('ready', async () => {
        console.log('BOT');
        handleUploads();
    })
    function handleUploads(){
        setTimeout(() => {
            request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${config.ytChannels[0]}`).then(data => {
            fs.readFile('videoData.json', 'utf8', (err, content) => {
                if(data.items){
                    var arr = JSON.parse(content);
    
                    if(!arr.includes(data.items[0].id)){
                        arr.push(data.items[0].id);
                        fs.writeFile('videoData.json', JSON.stringify(arr), 'utf8', () => {
                            console.log('new video');
                        })
    
                        const embed = new EmbedBuilder()
                        .setTitle('Dodano nowy film')
                        .setDescription(`Kanał: ${data.items[0].author}\nFILM: ${data.items[0].link}`)
                        .setImage('https://i3.ytimg.com/vi/'+data.items[0].id.replace('yt:video:', '')+'/hqdefault.jpg')
                        .setTimestamp()
                        try{
                            client.guilds.cache.get(config.guildId).channels.cache.find(ch => ch.id === config.channel).send({embeds: [embed]});
                        }catch(err){
                            console.log(err);
                        }
                    }
                }
            })
            handleUploads()
        })
        }, config.watchInterval)
    }
}

client.giveawaysManager = manager;

client.commands = new Collection();



   client.login(process.env.TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
  handlerLogs(client);
});

module.exports = client;
