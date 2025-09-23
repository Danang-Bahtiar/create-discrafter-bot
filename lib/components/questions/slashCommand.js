import { checkbox, confirm, input } from "@inquirer/prompts";

export const slashCommandQuestion = async () => {
  const slashCommandConfig = await checkbox({
    message: "Select features to include:",
    choices: [
      { name: "use default Slash Command Handler", value: "slashCommand" },
      {
        name: "use default Slash Command Directory (./src/commands)",
        value: "slashCommandDir",
      },
      { name: "Register commands globally", value: "globalCmd" },
      { name: "Register commands to guilds only", value: "guildCmd" },
    ],
  });
  // return [value of true choices]

  const defaultSlashCommandHandler =
    slashCommandConfig.includes("slashCommand");
  const slashCommandDir = slashCommandConfig.includes("slashCommandDir");
  const registerGlobalCmd = slashCommandConfig.includes("globalCmd");
  let registerGuildCmd = slashCommandConfig.includes("guildCmd");

  let customDir = "./src/commands";

  if (!slashCommandDir) {
    const customSlashCommandDir = await confirm({
      message: "Do you want to set a custom directory for slash commands?",
      default: false,
    });
    if (customSlashCommandDir) {
      const setCustomDir = await input({
        message: "Enter your custom directory for slash commands:",
        default: "src/commands",
      });

      customDir = setCustomDir;

      console.log(`Custom directory for slash commands set to: ${customDir}`);
    }
  }

  if (registerGlobalCmd) {
    registerGuildCmd = false;
  }

  const guildIds = [];

  if (registerGuildCmd) {
    while (true) {
      const guildId = await input({
        message: "Enter Guild ID to register commands to (insert 0 to stop):",
        default: "0",
      });

      if (guildId === "0") {
        break;
      }

      guildIds.push(guildId);
    }
  }

  return {
    defaultSlashCommandHandler,
    customDir,
    registerGlobalCmd,
    guildIds,
  };
};
