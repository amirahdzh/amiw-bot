import { Events } from "discord.js";

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: any, client: any) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
}
