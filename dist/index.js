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
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions, // Add this!
        discord_js_1.GatewayIntentBits.GuildMembers // Add this!
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel, discord_js_1.Partials.Reaction, discord_js_1.Partials.User], // Add this!
});
client.commands = new discord_js_1.Collection();
// Load commands
const commandsPath = path_1.default.join(__dirname, "commands");
const commandFiles = fs_1.default.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(path_1.default.join(commandsPath, file));
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    }
}
// Load events
const eventsPath = path_1.default.join(__dirname, "events");
const eventFiles = fs_1.default.readdirSync(eventsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(path_1.default.join(eventsPath, file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
client.login(process.env.DISCORD_TOKEN);
