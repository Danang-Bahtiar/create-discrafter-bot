import { input, password } from "@inquirer/prompts";

export const coreQuestion = async () => {
  const discordToken = await password({
    message: "discord token:",
    default: "",
  });
  const clientId = await password({ message: "discord client id:", default: "" });
  const ownerId = await input({ message: "your discord id:", default: "" });

  return { discordToken, clientId, ownerId };
};
