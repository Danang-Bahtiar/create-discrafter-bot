import fs from 'fs';

export const indexGen = async () => {
    const indexContent = `import { Discrafter } from "@dan_koyuki/discrafterjs";

const client = await Discrafter.create();
client.login();

export default client;`

    try {
        fs.writeFileSync("index.js", indexContent);
        console.log("✅ Created index.js file");
    } catch (error) {
        console.error("❌ Error creating index.js file:", error);
    };
}