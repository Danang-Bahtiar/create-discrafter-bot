import { checkbox, confirm, input } from "@inquirer/prompts";

export const helperQuestion = async () => {
  const helperConfig = await checkbox({
    message: "Select features to include:",
    choices: [
      { name: "use default Helper Handler", value: "helper" },
      {
        name: "use default Helper Directory (./src/helpers)",
        value: "helperDir",
      },
    ],
  });

  const defaultHelperHandler = helperConfig.includes("helper");
  const helperDir = helperConfig.includes("helperDir");
  let customHelpDir = "./src/helpers";

  if (!helperDir) {
    const customHelperDir = await confirm({
      message: "Do you want to set a custom directory for helpers?",
      default: false,
    });
    if (customHelperDir) {
      const setCustomDir = await input({
        message: "Enter your custom directory for helpers:",
        default: "./src/helpers",
      });
      customHelpDir = setCustomDir;

      console.log(`Custom directory for helpers set to: ${customHelpDir}`);
    }
  }

  return { defaultHelperHandler, customHelpDir };
};
