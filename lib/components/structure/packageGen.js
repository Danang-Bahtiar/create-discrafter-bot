import fs from "fs";

export const packageGen = async (name) => {
  const contentTemplate = `
{
  "name": "${name}",
  "version": "1.0.0",
  "description": "A discord bot powered by Discrafterjs.",
  "main": "index.js",
  "type": "module",
  "scripts": {
      "dev": "node index.js"   
  },
  "keywords": ["discord", "bot", "discrafterjs"],
  "author": "",
  "license": "MIT"
}`;

  try {
    fs.writeFileSync("package.json", contentTemplate);
    console.log("✅ Created package.json");
  } catch (error) {
    console.error("❌ Error creating package.json:", error);
  }
};
