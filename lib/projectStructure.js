import path from "path";
import fs from "fs";

export const projectStructure = (projectRoot) => {
  const directoryTemplate = {
    srcDir: path.join(projectRoot, "src"),
    commandsDir: path.join(projectRoot, "src", "commands"),
    eventsDir: path.join(projectRoot, "src", "events"),
  };

  const fileTemplate = {
    indexFile: {
      path: path.join(projectRoot, "index.js"),
      content: `import { Discrafter } from "@dan_koyuki/discrafterjs";

      const client = await Discrafter.create();
      client.login();`,
    },
    pingCommandFile: {
      path: path.join(projectRoot, "src", "commands", "ping.js"),
      content: `
        import { SlashCommandBuilder } from "discord.js";
        import { Discrafter } from "@dan_koyuki/discrafterjs";

        export default Discrafter.SlashCommand({
            data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
            execute: async (interaction, client) => {
                await interaction.reply("Pong!");}
        })
    `,
    },
  };

  for (const dir in directoryTemplate) {
    if (dir.endsWith("Dir") && !fs.existsSync(directoryTemplate[dir])) {
      fs.mkdirSync(directoryTemplate[dir]);
      console.log(
        `Created folder: ${path.relative(projectRoot, directoryTemplate[dir])}/`
      );
    }
  }
};
