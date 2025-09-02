"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.registerPrefixCommand = registerPrefixCommand;
exports.execute = execute;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
// Prefix command handler for !choose (picker wheel functionality)
function registerPrefixCommand(client) {
    console.log("🎯 Setting up !choose prefix command handler...");
    client.on("messageCreate", async (message) => {
        if (message.author.bot)
            return;
        if (!message.content.toLowerCase().startsWith("!choose"))
            return;
        console.log("🎲 !choose command detected:", message.content);
        const input = message.content.slice("!choose".length).trim();
        if (!input) {
            if (message.channel instanceof discord_js_2.TextChannel ||
                message.channel instanceof discord_js_2.NewsChannel ||
                message.channel instanceof discord_js_2.ThreadChannel) {
                await message.channel.send("❗ Input required. Example: `!choose pizza|burger|sushi`");
            }
            return;
        }
        // Split options by | or , (both supported)
        const options = input.split(/[|,]/).map((option) => option.trim()).filter(Boolean);
        if (options.length < 2) {
            if (message.channel instanceof discord_js_2.TextChannel ||
                message.channel instanceof discord_js_2.NewsChannel ||
                message.channel instanceof discord_js_2.ThreadChannel) {
                await message.channel.send("❗ Please provide at least 2 options separated by `|` or `,`. Example: `!choose pizza|burger|sushi`");
            }
            return;
        }
        // Randomly select one option
        const selectedOption = options[Math.floor(Math.random() * options.length)];
        // Minimalist output for prefix command
        const responseMessage = `${selectedOption}`;
        if (message.channel instanceof discord_js_2.TextChannel ||
            message.channel instanceof discord_js_2.NewsChannel ||
            message.channel instanceof discord_js_2.ThreadChannel) {
            await message.channel.send(responseMessage);
        }
    });
}
// Slash command version
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("choose")
    .setDescription("Randomly pick one option from a list (like a picker wheel)")
    .addStringOption(option => option.setName("options")
    .setDescription("Options separated by | or , (e.g., pizza|burger|sushi)")
    .setRequired(true));
async function execute(interaction) {
    const input = interaction.options.getString("options");
    if (!input) {
        await interaction.reply({ content: "❗ Input required.", ephemeral: true });
        return;
    }
    console.log("🎲 /choose command detected:", input);
    // Split options by | or , (both supported)
    const options = input.split(/[|,]/).map((option) => option.trim()).filter(Boolean);
    if (options.length < 2) {
        await interaction.reply({
            content: "❗ Please provide at least 2 options separated by `|` or `,`. Example: `pizza|burger|sushi`",
            ephemeral: true
        });
        return;
    }
    // Randomly select one option
    const selectedOption = options[Math.floor(Math.random() * options.length)];
    // Minimalist output for slash command
    const slashResponseMessage = `${selectedOption}`;
    await interaction.reply({ content: slashResponseMessage });
}
