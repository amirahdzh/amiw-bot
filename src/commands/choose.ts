import { SlashCommandBuilder } from "discord.js";
import { Client, Message, TextChannel, NewsChannel, ThreadChannel } from "discord.js";

// Prefix command handler for !choose (picker wheel functionality)
export function registerPrefixCommand(client: Client) {
  console.log("🎯 Setting up !choose prefix command handler...");
  
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith("!choose")) return;

    console.log("🎲 !choose command detected:", message.content);

    const input = message.content.slice("!choose".length).trim();
    if (!input) {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("❗ Input required. Example: `!choose pizza|burger|sushi`");
      }
      return;
    }

    // Split options by | or , (both supported)
    const options = input.split(/[|,]/).map((option: string) => option.trim()).filter(Boolean);
    
    if (options.length < 2) {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("❗ Please provide at least 2 options separated by `|` or `,`. Example: `!choose pizza|burger|sushi`");
      }
      return;
    }

    // Randomly select one option
    const selectedOption = options[Math.floor(Math.random() * options.length)];

    const responseMessage = `🎯 **Picker Wheel Result:**\n\n` +
      `🎲 **Selected:** ${selectedOption}\n\n` +
      `📋 **Options were:** ${options.join(", ")}`;

    if (
      message.channel instanceof TextChannel ||
      message.channel instanceof NewsChannel ||
      message.channel instanceof ThreadChannel
    ) {
      await message.channel.send(responseMessage);
    }
  });
}

// Slash command version
export const data = new SlashCommandBuilder()
  .setName("choose")
  .setDescription("Randomly pick one option from a list (like a picker wheel)")
  .addStringOption(option =>
    option.setName("options")
      .setDescription("Options separated by | or , (e.g., pizza|burger|sushi)")
      .setRequired(true)
  );

export async function execute(interaction: any) {
  const input = interaction.options.getString("options");
  if (!input) {
    await interaction.reply({ content: "❗ Input required.", ephemeral: true });
    return;
  }

  console.log("🎲 /choose command detected:", input);

  // Split options by | or , (both supported)
  const options = input.split(/[|,]/).map((option: string) => option.trim()).filter(Boolean);
  
  if (options.length < 2) {
    await interaction.reply({ 
      content: "❗ Please provide at least 2 options separated by `|` or `,`. Example: `pizza|burger|sushi`", 
      ephemeral: true 
    });
    return;
  }

  // Randomly select one option
  const selectedOption = options[Math.floor(Math.random() * options.length)];

  const responseMessage = `🎯 **Picker Wheel Result:**\n\n` +
    `🎲 **Selected:** ${selectedOption}\n\n` +
    `📋 **Options were:** ${options.join(", ")}`;

  await interaction.reply({ content: responseMessage });
}
