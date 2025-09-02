import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const commands: any[] = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log("Started refreshing application (/) commands globally.");

    // Deploy commands globally (available in all servers)
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands },
    );

    console.log("Successfully reloaded application (/) commands globally.");
    console.log(`Deployed ${commands.length} commands: ${commands.map(c => c.name).join(", ")}`);
    console.log("Note: Global commands may take up to 1 hour to appear in all servers.");
  } catch (error) {
    console.error(error);
  }
})();
