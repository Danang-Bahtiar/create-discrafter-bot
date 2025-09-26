import fs from "fs";

export const pingTemplate = async (questionAnswer) => {
  const pingContent = `import { Discrafter } from "@dan_koyuki/discrafterjs";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default Discrafter.SlashCommand({
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    execute: async (interaction, client) => {
        await interaction.deferReply({
      messageReference: interaction.message
    });
    const message = await interaction.fetchReply();
    const displayName = interaction.user.globalName ?? interaction.user.username;

    const embed = new EmbedBuilder()
      .setTitle(\`Hello, \${displayName}\`)
      .setDescription(\`API Latency: \${client.ws.ping}\nClient Ping: \${
    message.createdTimestamp - interaction.createdTimestamp
  }\`)
      .setColor('Navy')
      .setThumbnail(interaction.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        iconURL: client.user.displayAvatarURL(),
        name: 'MY BOT'
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag
      });

      await interaction.editReply({
        embeds: [embed]
      });
    } });`;

  try {
    fs.writeFileSync(`${questionAnswer.customDir}/ping.js`, pingContent);
    console.log("✅ Created ping.js file");
  } catch (error) {
    console.error("❌ Error creating ping.js file:", error);
  }
};
