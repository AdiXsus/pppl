const { EmbedBuilder } = require("discord.js");

function handlerLogs(client, log) {

  client.on("messageDelete", function (message) {
    const log = client.channels.cache.get(`1097898324436193331`);
    if (!message.author || message.author.bot) {
        return;
      }
    if (message.channel.type === 'DM') {
      return
    }

    const embed = new EmbedBuilder()
      .setTitle("Usunięta wiadomość")
      .setColor("#ff0006")
      .setDescription(`
            **Autor: ** <@${message.author.id}> - *${message.author.tag}*
            **Data: ** ${message.createdAt}
            **Kanał: ** <#${message.channel.id}> - *${message.channel.name}*
            **Usunięta wiadomość: **\`${message.content.replace(/`/g, "'")}\`
         `).setTimestamp()

     log.send({embeds: [embed]})
  });

  client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Temat kanału zaktualizowany!")
      .setColor("#00ff44")
      .setDescription(
        `${channel} Zmieniono temat kanału z: **${oldTopic}** na: **${newTopic}**`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Kanał zaktualizowany!")
      .setColor("#00f623")
      .setDescription(
        "Kanał '" +
          oldChannel.id +
          "' był edytowany, ale: discord-log nie mógł znaleźć tego, co zostało zaktualizowane...."
      ).setTimestamp()

     log.send({embeds: [embed]})
  });

  client.on("guildMemberBoost", (member) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik zaczął wspierać serwer!")
      .setColor("#ffc0cb")
      .setDescription(
        `Użytkownik: **${member.user.tag}** ulepszył: ${member.guild.name}!`
      )
      .setTimestamp()
       log.send({embeds: [embed]})
  });

  client.on("guildMemberUnboost", (member) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik przestał wspierać serwer!")
      .setColor("#ffc0cb")
      .setDescription(
        `Użytkownik: **${member.user.tag}** usuną boost z serwera:  ${member.guild.name}!`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildMemberRoleRemove", (member, role) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik utracił rolę!")
      .setColor("#ff0006")
      .setDescription(`Użytkownik: **${member.user.tag}**\nstracił rolę: \`${role.name}\``)
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano Nick")
      .setColor("#00f623")
      .setDescription(
        `Użytkownik: **${member.user.tag}** \nzmienił Nick z: \`${oldNickname}\`\n na: \`${newNickname}\``
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildMemberAdd", (member) => {
    const log = client.channels.cache.get("1097898324436193331");
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik dołączył do serwera")
      .setColor("#00f623")
      .setDescription(`Użytkownik: **${member.user}** (\`${member.user.tag}\`)\n Data dołączenia: ${member.joinedAt}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();
  
    log.send({ embeds: [embed] });
  });
  

  client.on("guildMemberRemove", (member) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik opuścił serwer")
      .setColor("#ff0006")
      .setDescription(
        `Użytkownik: ${member.user} (\`${member.user.id}\`)\n\`${member.user.tag}\``,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zwiększenie poziomu wzmocnienia serwera")
      .setColor("#ffc0cb")
      .setDescription(`${guild.name} osiągnął poziom wzmocnienia ${newLevel}`)
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Obniżony poziom wzmocnienia serwera")
      .setColor("#ffc0cb")
      .setDescription(
        `${guild.name} stracił poziom z: ${oldLevel} na: ${newLevel}`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildBannerAdd", (guild, bannerURL) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Serwer Ma nowy baner")
      .setColor("#00f623")
      .setImage(bannerURL)
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("messagePinned", (message) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Wiadomość przypięta")
      .setColor(`#0973a2`)
      .setDescription(`${message.content} Została przypięta przez: ${message.author}`)
      .setTimestamp()

      log.send({embeds: [embed]})
  });

  client.on("messageContentEdited", (message, oldContent, newContent) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Wiadomość edytowana")
      .setColor(`#0973a2`)
      .setDescription(`Użytkownik: ${message.author} edytował wiadomość z: \`${oldContent}\`\n na: \`${newContent}\``)
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano pozycję roli")
      .setColor("#00f623")
      .setDescription(
        role.name +
          " rola była na pozycji " +
          oldPosition +
          " i teraz jest na pozycji " +
          newPosition
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano uprawnienie roli")
      .setColor("#00f623")
      .setDescription(
        role.name +
          " miał jako uprawnienia " +
          oldPermissions +
          " a teraz ma uprawnienia " +
          newPermissions
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano avatar")
      .setColor("#00f623")
      .setDescription(
        `Użytkownik: ${user.tag} zaktualizował awatar z [Old Avatar](${oldAvatarURL})\n na [New Avatar(${newAvatarURL})]`
      ).setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano nazwę użytkownika")
      .setColor("#00f623")
      .setDescription(
        `Użytkownik: ${user.tag} zaktualizował swoją nazwę użytkownika z: ${oldUsername} \nna: ${newUsername}`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("userFlagsUpdate", (user, oldFlags, newFlags) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Zaktualizowano flagi")
      .setColor("#00f623")
      .setDescription(
        `${user.tag} zaktualizował swoje flagi z ${oldFlags} na: ${newFlags}`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("voiceChannelLeave", (member, channel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Wyszedł z kanału głosowego")
      .setColor("#ff0006")
      .setDescription(member.user.tag + " wyszedł " + `${channel}` + "!")
      .setTimestamp(); // dodaj nawias zamykający tutaj
    log.send({embeds: [embed]});
  });  

  client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Przełączono kanał głosowy")
      .setColor("#00f623")
      .setDescription(
        member.user.tag +
          " z " +
          oldChannel.name +
          " i dołączył" +
          newChannel.name +
          "!"
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("voiceChannelMute", (member, muteType) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik wyciszony")
      .setColor("#ff0006")
      .setDescription(
        member.user.tag + " został się wyciszony! (typ: " + muteType + ")"
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("voiceChannelUnmute", (member, oldMuteType) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Wyłączono wyciszenie użytkownika")
      .setColor("#00f623")
      .setDescription(member.user.tag + " się Odcisza!")
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("voiceStreamingStart", (member, voiceChannel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik zaczął przesyłać strumieniowo")
      .setColor("#00f623")
      .setDescription(
        member.user.tag + " zaczął przesyłać strumieniowo " + voiceChannel.name
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("voiceStreamingStop", (member, voiceChannel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik zatrzymał się, aby przesyłać strumieniowo")
      .setColor("#ff0006")
      .setDescription(
        member.user.tag + " przestał napływać " + voiceChannel.name
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("roleCreate", (role) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Rola Stworzona")
      .setColor("#ff0006")
      .setDescription(
        `Rola: ${role}\nRolename: ${role.name}\nRolaID: ${role.id}\nHEX Code: ${role.hexColor}\nPozycja: ${role.position}`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("roleDelete", (role) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Usunięto rolę")
      .setColor("#ff0006")
      .setDescription(
        `Rola: ${role}\nNazwa-Rangi: ${role.name}\nRoleID: ${role.id}\nHEX Code: ${role.hexColor}\nPozycja: ${role.position}`
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildBanAdd", ({ guild, user }) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik zbanowany")
      .setColor("#ff0006")
      .setDescription(
        `Użytkownik: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
        user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("guildBanRemove", ({ guild, user }) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    const embed = new EmbedBuilder()
      .setTitle("Użytkownik odblokowany")
      .setColor("#00f623")
      .setDescription(
        `Użytkownik: ${user} (\`${user.id}\`)\n\`${user.tag}\``,
        user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()

       log.send({embeds: [embed]})
  });

  client.on("channelCreate", (channel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    if (channel.type == 'DM') {
      return
    }
    const embed = new EmbedBuilder()
      .setTitle("Kanał stworzony")
      .setColor("#00f623")
      .setDescription(`Kanał: \`${channel.name}\` został stworzony.`)
      .setTimestamp()

       log.send({embeds: [embed]})
  });
    
  //client.on("error", (error) => {
    //const log = client.channels.cache.get(`1097898324436193331`);
    //const embed = new EmbedBuilder()
    //.setTitle('Bot Error')
    //.setColor('#ff0000')
    //.setDescription(`Wystąpił błąd: \`${error}\``)
    //.setTimestamp();
    //log.send({embeds: [embed]})
//});
  

  //client.on("ready", (channel) => {
    //const log = client.channels.cache.get(`1097898324436193331`);
    //if (channel.type == 'DM') {
    //  return
   // }
    //const embed = new EmbedBuilder()
    //  .setTitle("BOT-INFO")
   //   .setColor("#00f623")
   //   .setDescription(`Bot został **włączony**`)
   //   .setTimestamp()
//
//       log.send({embeds: [embed]})
//});

  client.on("channelDelete", (channel) => {
    const log = client.channels.cache.get(`1097898324436193331`);
    if (channel.type == 'DM') {
      return
    }
    const embed = new EmbedBuilder()
      .setTitle("Kanał usunięty")
      .setColor("#ff0006")
      .setDescription(`Kanał: \`${channel.name}\` został usunięty.`)
      .setTimestamp()

       log.send({embeds: [embed]})
  });
}

module.exports = { handlerLogs };