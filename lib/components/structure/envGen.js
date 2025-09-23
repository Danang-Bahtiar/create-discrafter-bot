import fs from "fs";

export const envGen = async (questionAnswer) => {
    const envContent = `
DISCORD_TOKEN=${questionAnswer.discordToken}
CLIENT_ID=${questionAnswer.clientId}
OWNER_ID=${questionAnswer.ownerId}`

    try {
        fs.writeFileSync(".env", envContent);
        console.log("✅ Created .env file");
    } catch (error) {
        console.error("❌ Error creating .env file:", error);
    }
}