import { select } from "@inquirer/prompts";
import { execSync } from "child_process";

export async function choosePackageManager() {
  return await select({
    message: "\nWhich package manager do you want to use?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "pnpm", value: "pnpm" },
      { name: "yarn", value: "yarn" },
      { name: "bun", value: "bun" }
    ],
    default: "npm",
  });
}

export function installDeps(pm, projectRoot, deps) {
  let command;
  switch (pm) {
    case "pnpm": command = `pnpm add ${deps.join(" ")} -E`; break;
    case "yarn": command = `yarn add ${deps.join(" ")} --exact`; break;
    case "bun":  command = `bun add ${deps.join(" ")} --exact`; break;
    default:     command = `npm install ${deps.join(" ")} --save-exact`;
  }
  execSync(command, { stdio: "inherit", cwd: projectRoot });
}
