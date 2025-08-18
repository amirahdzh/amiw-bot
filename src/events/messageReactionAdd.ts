import { Events } from "discord.js";
import { reactionRoleMap } from "../utils/reactionRoleMap";

export const name = Events.MessageReactionAdd;
export const once = false;

export async function execute(reaction: any, user: any) {
  const messageId = reaction.message.id;
  const emoji = reaction.emoji.name;
  const roleId = reactionRoleMap[messageId]?.[emoji];
  if (!roleId) return;
  const guild = reaction.message.guild;
  if (!guild) return;
  const member = await guild.members.fetch(user.id);
  await member.roles.add(roleId);
}