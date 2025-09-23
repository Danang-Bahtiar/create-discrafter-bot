#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import { startQuestionnaire } from "../lib/questionnaire.js";
import { input } from "@inquirer/prompts";
import { packageGen } from "../lib/components/structure/packageGen.js";
import { envGen } from "../lib/components/structure/envGen.js";
import { discrafterConfig } from "../lib/components/structure/discrafterConfig.js";
import { pingTemplate } from "../lib/components/structure/ping.js";
import { indexGen } from "../lib/components/structure/indexGen.js";
import { ensureDir } from "../lib/components/structure/directory.js";
import { choosePackageManager, installDeps } from "../lib/components/questions/packageManager.js";

// __dirname polyfill for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();

const projectName = await input({message: "Enter your project name:", default: "my-discrafter-bot"});
const questionnaireAnswer = await startQuestionnaire();

const { customDir, customEvent, customHelpDir } = questionnaireAnswer; // finalConfig is your output from questionnaire

ensureDir(path.join(projectRoot, customDir));
ensureDir(path.join(projectRoot, customEvent));
ensureDir(path.join(projectRoot, customHelpDir));

await packageGen(projectName);
await envGen(questionnaireAnswer);
await discrafterConfig(questionnaireAnswer);
await pingTemplate(questionnaireAnswer);
await indexGen();

const pm = await choosePackageManager();

// install package @dan_koyuki/discrafterjs, dotenv, discord.js
installDeps(pm, projectRoot, [
  "@dan_koyuki/discrafterjs",
  "dotenv",
  "discord.js"
]);

console.log("\n\n✨ Your bot scaffold is ready! ✨");
console.log("\n✅ Project created successfully!");
console.log("📝 Next steps:");
console.log("  1. Visit https://discord.com/developers/applications to get your tokens");
console.log("  2. Edit 'discrafter.config.js' with your bot details");
console.log("  3. Make sure packages are up to date: run 'npm outdated' or 'npm update'");
console.log("  4. Run 'npm run dev' to start your bot");
