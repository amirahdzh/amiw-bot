import { Client } from "discord.js";

export const name = "ready";
export const once = true;

export async function execute(client: Client) {
  console.log(`✅ Logged in as ${client.user?.tag}`);
}
