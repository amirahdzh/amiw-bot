"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
// Example hero pool (expand as needed)
const heroes = [
    { name: "Johnson", roles: ["Roam", "Exp"] },
    { name: "Ixia", roles: ["Gold", "Mid"] },
    { name: "Estes", roles: ["Exp"] },
    { name: "Angela", roles: ["Jungle"] },
    { name: "Cici", roles: ["Roam"] },
    { name: "Ling", roles: ["Jungle"] },
    { name: "Lylia", roles: ["Mid"] },
    { name: "Claude", roles: ["Gold"] },
    { name: "Baxia", roles: ["Roam", "Exp"] },
    { name: "Yve", roles: ["Mid"] },
    { name: "Paquito", roles: ["Exp", "Jungle"] },
    { name: "Mathilda", roles: ["Roam", "Mid"] },
    // ...add more heroes as needed
];
const allRoles = ["Jungle", "Gold", "Mid", "Exp", "Roam"];
function shuffle(arr) {
    return arr
        .map((v) => [Math.random(), v])
        .sort((a, b) => a[0] - b[0])
        .map(([, v]) => v);
}
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("mlmatch")
    .setDescription("Generate a fun Mobile Legends match assignment!")
    .addStringOption(option => option.setName("input")
    .setDescription("5 player names separated by |, then mode (-random or -aligned)")
    .setRequired(true));
async function execute(interaction) {
    const input = interaction.options.getString("input");
    if (!input) {
        await interaction.reply({ content: "Input required.", ephemeral: true });
        return;
    }
    // Parse input
    const [namesPart, modePart] = input.split(/\s*-(random|aligned)\s*$/i).filter(Boolean);
    const modeMatch = input.match(/-(random|aligned)$/i);
    const mode = modeMatch ? modeMatch[1].toLowerCase() : null;
    const names = namesPart ? namesPart.split("|").map((n) => n.trim()).filter(Boolean) : [];
    if (names.length !== 5) {
        await interaction.reply({ content: "Please input exactly 5 player names separated by |.", ephemeral: true });
        return;
    }
    if (!mode || (mode !== "random" && mode !== "aligned")) {
        await interaction.reply({ content: "Invalid mode. Use -random or -aligned.", ephemeral: true });
        return;
    }
    let assignments = [];
    let chosenHeroes = [];
    if (mode === "random") {
        const heroPool = shuffle([...heroes]);
        if (heroPool.length < 5) {
            await interaction.reply({ content: "Not enough heroes in the pool.", ephemeral: true });
            return;
        }
        chosenHeroes = heroPool.slice(0, 5);
        assignments = names.map((name, i) => {
            const hero = chosenHeroes[i];
            const role = shuffle(hero.roles)[0];
            return { name, hero: hero.name, role };
        });
    }
    else if (mode === "aligned") {
        // Try to assign each role to a hero that can fill it, no duplicates
        const availableHeroes = shuffle([...heroes]);
        const usedHeroes = new Set();
        assignments = [];
        for (const role of shuffle([...allRoles])) {
            const hero = availableHeroes.find(h => h.roles.includes(role) && !usedHeroes.has(h.name));
            if (!hero) {
                await interaction.reply({ content: `Not enough heroes to fill all roles for -aligned mode.`, ephemeral: true });
                return;
            }
            assignments.push({ name: names[assignments.length], hero: hero.name, role });
            usedHeroes.add(hero.name);
        }
    }
    // Format output
    const output = assignments.map(a => `${a.name} = ${a.hero} (${a.role} Lane)`).join("\n");
    await interaction.reply({ content: `**Mobile Legends Fun Match Assignment:**\n\n${output}` });
}
