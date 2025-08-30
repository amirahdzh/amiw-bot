import { Client, GatewayIntentBits, Collection, Partials } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Extend Client type
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions, // Add this!
    GatewayIntentBits.GuildMembers           // Add this!
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User], // Add this!
});

client.commands = new Collection();


// Register prefix command handler for !mlmatch
try {
  const { registerPrefixCommand } = require("./commands/mlmatch");
  if (typeof registerPrefixCommand === "function") {
    registerPrefixCommand(client);
    console.log("✅ Prefix command handler for !mlmatch registered successfully");
  }
} catch (e) {
  console.error("❌ Failed to register prefix command handler:", e);
}

// Load commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  }
}

// Load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".ts") || f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.DISCORD_TOKEN);
