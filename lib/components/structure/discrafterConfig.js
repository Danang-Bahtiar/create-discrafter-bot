import fs from "fs";

export const discrafterConfig = async (questionnaireAnswer) => {
  const configContent = `
import {defineConfig} from '@dan_koyuki/discrafterjs';
import dotenv from "dotenv";

dotenv.config();

// Note: You can keep guildId here in the config for convenience.
// However, if you consider it sensitive or want easier environment switching,
// it's recommended to use environment variables instead.
export default defineConfig({
    core: {
      clientId: \`\${process.env.CLIENT_ID}\`,
      discordToken: \`\${process.env.DISCORD_TOKEN}\`,
      ownerId: \`\${process.env.OWNER_ID}\`,
      intents: [],      
    },
    development: {
      developmentMode: ${questionnaireAnswer.developmentMode},
      developmentGuildId: "${questionnaireAnswer.guildId}",
    },
    slashCommand: {
      useDefaultHandler: true,
      customDirPath: "${questionnaireAnswer.customDir}",
      globalRegister: ${questionnaireAnswer.registerGlobalCmd},
      guilds: [${questionnaireAnswer.guildIds}]
    },
    event: {
      useDefaultHandler: true,
      customDirPath: "${questionnaireAnswer.customEvent}",
    },
    helper: {
      useDefaultHandler: true,
      customDirPath: "${questionnaireAnswer.customHelpDir}",
    },
    custom: {
      useDefaultInteractionEvent: ${
        questionnaireAnswer.interactionCreate || true
      }
    }
})`;

  try {
    fs.writeFileSync("discrafter.config.js", configContent);
    console.log("✅ Created discrafter.config.js");
  } catch (error) {
    console.error("❌ Error creating discrafter.config.js:", error);
  }
};
