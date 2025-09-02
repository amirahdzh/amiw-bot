"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const commands = [];
const commandsPath = path_1.default.join(__dirname, "commands");
const commandFiles = fs_1.default.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(path_1.default.join(commandsPath, file));
    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    }
}
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log("Started refreshing application (/) commands globally.");
        // Deploy commands globally (available in all servers)
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log("Successfully reloaded application (/) commands globally.");
        console.log(`Deployed ${commands.length} commands: ${commands.map(c => c.name).join(", ")}`);
        console.log("Note: Global commands may take up to 1 hour to appear in all servers.");
    }
    catch (error) {
        console.error(error);
    }
})();
