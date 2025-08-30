"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("active-dev-badge")
    .setDescription("Get the instructions and claim link for the Active Developer Badge!");
async function execute(interaction) {
    await interaction.reply({
        content: "To claim your Active Developer Badge, follow the instructions here:\n" +
            "1. Make sure you have an active application with a command registered.\n" +
            "2. Visit the claim page: https://discord.com/developers/active-developer\n" +
            "3. Follow the on-screen instructions to claim your badge.\n\n" +
            "Good luck!",
        ephemeral: true,
    });
}
