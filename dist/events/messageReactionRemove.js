"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.name = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
const reactionRoleMap_1 = require("../utils/reactionRoleMap");
exports.name = discord_js_1.Events.MessageReactionRemove;
exports.once = false;
async function execute(reaction, user) {
    const messageId = reaction.message.id;
    const emoji = reaction.emoji.name;
    const roleId = reactionRoleMap_1.reactionRoleMap[messageId]?.[emoji];
    if (!roleId)
        return;
    const guild = reaction.message.guild;
    if (!guild)
        return;
    const member = await guild.members.fetch(user.id);
    await member.roles.remove(roleId);
}
