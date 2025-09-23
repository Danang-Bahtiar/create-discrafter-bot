import { confirm, input } from "@inquirer/prompts";

export const developmentQuestion = async () => {
  const developmentMode = await confirm({
    message: "Enable development mode?",
    default: true,
  });
  const developmentGuildId = developmentMode
    ? await confirm({
        message: "Development mode enabled. Set your development guild id?",
        default: true,
      })
    : "";
  const guildId = developmentGuildId
    ? await input({ message: "Enter your development guild id:", default: "" })
    : "";

  return { developmentMode, guildId };
};
