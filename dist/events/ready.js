"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.name = void 0;
exports.execute = execute;
exports.name = "ready";
exports.once = true;
async function execute(client) {
    console.log(`✅ Logged in as ${client.user?.tag}`);
}
