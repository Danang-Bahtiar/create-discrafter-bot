import { checkbox } from "@inquirer/prompts";
import { coreQuestion } from "./components/questions/core.js";
import { developmentQuestion } from "./components/questions/development.js";
import { slashCommandQuestion } from "./components/questions/slashCommand.js";
import { eventQuestion } from "./components/questions/event.js";
import { helperQuestion } from "./components/questions/helper.js";

export const startQuestionnaire = async () => {
  const questionConfig = await checkbox({
    message: "Choose a configuration section to edit:",
    choices: [
      { name: "setup Core config (Bot Information).", value: "core" },
      {
        name: "setup Development config.",
        value: "development",
      },
      { name: "setup Slash Command config.", value: "slashCommand" },
      { name: "setup Event config.", value: "event" },
      { name: "setup Helper config.", value: "helper" },
      {
        name: "use Default interactionCreate Handler? (default: Yes)",
        value: "interactionCreate",
      },
      { name: "Skip configuration/configure manually later.", value: "skip" },
    ],
    required: true,
  });

  const questionList = {
    core: {
      title: "\n\nStarting core section configuration...",
      fn: coreQuestion,
    },
    development: {
      title: "\n\nStarting development section configuration...",
      fn: developmentQuestion,
    },
    slashCommand: {
      title: "\n\nStarting slashCommand section configuration...",
      fn: slashCommandQuestion,
    },
    event: {
      title: "\n\nStarting event section configuration...",
      fn: eventQuestion,
    },
    helper: {
      title: "\n\nStarting helper section configuration...",
      fn: helperQuestion,
    },
  };

  let answer = {};

  for (const key of questionConfig) {
    if (key === "skip") {
      console.log("Skipping configuration...");
      break;
    }

    if (key === "interactionCreate") {
      console.log("Using default interactionCreate Handler...");
      answer = { ...answer, interactionCreate: true };
      continue;
    }

    console.log(questionList[key].title);
    const res = await questionList[key].fn();
    answer = { ...answer, ...res };
  }

  return answer;
};
