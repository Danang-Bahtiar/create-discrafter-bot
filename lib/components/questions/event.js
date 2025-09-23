import { checkbox, confirm, input } from "@inquirer/prompts";

export const eventQuestion = async () => {
  const eventConfig = await checkbox({
    message: "Select features to include:",
    choices: [
      { name: "use default Event Handler", value: "events" },
      {
        name: "use default Event Directory (./src/events)",
        value: "eventDir",
      },
    ],
  });

  const defaultEventHandler = eventConfig.includes("events");
  const eventDir = eventConfig.includes("eventDir");
  let customEvent = "./src/events";

  if (!eventDir) {
    const customEventDir = await confirm({
      message: "Do you want to set a custom directory for events?",
      default: false,
    });
    if (customEventDir) {
      const setCustomDir = await input({
        message: "Enter your custom directory for events:",
        default: "./src/events",
      });
      customEvent = setCustomDir;

      console.log(`Custom directory for events set to: ${customEvent}`);
    }
  }

  return { defaultEventHandler, customEvent };
};
