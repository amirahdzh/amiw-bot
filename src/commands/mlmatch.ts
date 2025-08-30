// Prefix command handler for !mlmatch (for transparency)
import { Client, Message, TextChannel, NewsChannel, ThreadChannel } from "discord.js";

export function registerPrefixCommand(client: Client) {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith("!mlmatch")) return;

    const input = message.content.slice("!mlmatch".length).trim();
    if (!input) {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("Input required. Example: !mlmatch alex,laurent,vio,fika,john -random");
      }
      return;
    }

    let namesPart = input.replace(/-(random|aligned)$/i, "").trim();
    const names = namesPart.split(",").map((n: string) => n.trim()).filter(Boolean);
    const numTeams = names.length / 5;
    const modeMatch = input.match(/-(random|aligned)$/i);
    const mode = modeMatch ? modeMatch[1].toLowerCase() : "aligned";
    const lowerNames = names.map((n: string) => n.toLowerCase());
    const nameSet = new Set(lowerNames);
    if (nameSet.size !== names.length) {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("❗ Duplicate or similar player names detected. Please use unique names for each player.");
      }
      return;
    }
    if (!Number.isInteger(numTeams) || numTeams < 1) {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("❗ Please input a multiple of 5 player names separated by commas (5, 10, 15, ...). Example: !mlmatch alex,laurent,vio,fika,john,emma,kevin,steve,amy,ben");
      }
      return;
    }
    if (mode !== "random" && mode !== "aligned") {
      if (
        message.channel instanceof TextChannel ||
        message.channel instanceof NewsChannel ||
        message.channel instanceof ThreadChannel
      ) {
        await message.channel.send("❗ Invalid mode. Use -random or -aligned. Example: !mlmatch alex,laurent,vio,fika,john -random");
      }
      return;
    }

    let allTeamsOutput: string[] = [];
    for (let t = 0; t < numTeams; t++) {
      const teamNames = names.slice(t * 5, (t + 1) * 5);
      let assignments: { name: string, hero: string, role: string }[] = [];
      if (mode === "random") {
        const heroPool = shuffle([...heroes]);
        if (heroPool.length < 5) {
          if (
            message.channel instanceof TextChannel ||
            message.channel instanceof NewsChannel ||
            message.channel instanceof ThreadChannel
          ) {
            await message.channel.send("Not enough heroes in the pool.");
          }
          return;
        }
        const chosenHeroes = heroPool.slice(0, 5);
        assignments = teamNames.map((name: string, i: number) => {
          const hero = chosenHeroes[i];
          const lane = laneOrder[i];
          return { name, hero: hero.name, role: lane.label };
        });
      } else if (mode === "aligned") {
        const availableHeroes = shuffle([...heroes]);
        const usedHeroes: Set<string> = new Set();
        assignments = [];
        for (let i = 0; i < laneOrder.length; i++) {
          const { role, label } = laneOrder[i];
          const hero = availableHeroes.find(
            (h) => h.roles.includes(role) && !usedHeroes.has(h.name)
          );
          if (!hero) {
            if (
              message.channel instanceof TextChannel ||
              message.channel instanceof NewsChannel ||
              message.channel instanceof ThreadChannel
            ) {
              await message.channel.send("Not enough heroes to fill all roles for -aligned mode.");
            }
            return;
          }
          assignments.push({
            name: teamNames[i],
            hero: hero.name,
            role: label,
          });
          usedHeroes.add(hero.name);
        }
      }
      const teamOutput = assignments
        .map((a) => `${a.name} = ${a.hero} (${a.role})`)
        .join("\n");
      allTeamsOutput.push(`**Team ${t + 1}:**\n${teamOutput}`);
    }
    if (
      message.channel instanceof TextChannel ||
      message.channel instanceof NewsChannel ||
      message.channel instanceof ThreadChannel
    ) {
      await message.channel.send(`Input: ${input}\n\n${allTeamsOutput.join("\n\n")}`);
    }
  });
}
import { SlashCommandBuilder } from "discord.js";

const heroes = [
  // Exp Lane
  { name: "Lukas", roles: ["Exp", "Jungle"] },
  { name: "Ruby", roles: ["Exp"] },
  { name: "Yin", roles: ["Exp", "Jungle"] },
  { name: "Cici", roles: ["Exp"] },
  { name: "Minsitthar", roles: ["Exp", "Roam"] },
  { name: "Edith", roles: ["Exp", "Roam"] },
  { name: "Dyrroth", roles: ["Exp", "Jungle"] },
  { name: "Alpha", roles: ["Exp", "Jungle"] },
  { name: "Silvanna", roles: ["Exp"] },
  { name: "Esmeralda", roles: ["Exp"] },
  { name: "Hilda", roles: ["Exp", "Roam"] },
  { name: "Freya", roles: ["Exp", "Jungle"] },
  { name: "Bane", roles: ["Exp", "Jungle"] },
  { name: "Balmond", roles: ["Exp", "Jungle"] },
  { name: "Zilong", roles: ["Exp"] },
  { name: "Masha", roles: ["Exp"] },
  { name: "Argus", roles: ["Exp"] },
  { name: "Chou", roles: ["Exp", "Roam"] },
  { name: "Gatotkaca", roles: ["Exp", "Roam"] },
  { name: "Lapu-Lapu", roles: ["Exp"] },
  { name: "Alice", roles: ["Exp", "Jungle"] },
  { name: "Sun", roles: ["Exp", "Jungle"] },
  { name: "Uranus", roles: ["Exp"] },
  { name: "Guinevere", roles: ["Exp"] },
  { name: "Jawhead", roles: ["Exp", "Roam"] },
  { name: "Yu Zhong", roles: ["Exp"] },
  { name: "Khaleed", roles: ["Exp", "Roam"] },
  { name: "Terizla", roles: ["Exp"] },
  { name: "Aldous", roles: ["Exp"] },
  { name: "Thamuz", roles: ["Exp"] },
  { name: "Badang", roles: ["Exp", "Roam"] },
  { name: "X.Borg", roles: ["Exp"] },
  { name: "Benedetta", roles: ["Exp"] },
  { name: "Paquito", roles: ["Exp", "Jungle"] },
  { name: "Gloo", roles: ["Exp", "Roam"] },
  { name: "Phoveus", roles: ["Exp"] },
  { name: "Arlott", roles: ["Exp"] },

  // Mid Lane
  { name: "Luo Yi", roles: ["Mid"] },
  { name: "Zetian", roles: ["Mid"] },
  { name: "Selena", roles: ["Mid", "Roam"] },
  { name: "Vale", roles: ["Mid"] },
  { name: "Faramis", roles: ["Mid"] },
  { name: "Zhuxin", roles: ["Mid"] },
  { name: "Novaria", roles: ["Mid"] },
  { name: "Lylia", roles: ["Mid"] },
  { name: "Xavier", roles: ["Mid"] },
  { name: "Chang'e", roles: ["Mid"] },
  { name: "Cecilion", roles: ["Mid"] },
  { name: "Aurora", roles: ["Mid"] },
  { name: "Cyclops", roles: ["Mid"] },
  { name: "Odette", roles: ["Mid"] },
  { name: "Gord", roles: ["Mid"] },
  { name: "Vexana", roles: ["Mid"] },
  { name: "Nana", roles: ["Mid"] },
  { name: "Eudora", roles: ["Mid"] },
  { name: "Kagura", roles: ["Mid"] },
  { name: "Zhask", roles: ["Mid"] },
  { name: "Lunox", roles: ["Mid"] },
  { name: "Pharsa", roles: ["Mid"] },
  { name: "Kadita", roles: ["Mid"] },
  { name: "Valir", roles: ["Mid"] },
  { name: "Kimmy", roles: ["Mid", "Gold"] },
  { name: "Harith", roles: ["Mid", "Gold"] },
  { name: "Yve", roles: ["Mid"] },
  { name: "Valentina", roles: ["Mid"] },

  // Roam
  { name: "Angela", roles: ["Roam"] },
  { name: "Chip", roles: ["Roam"] },
  { name: "Hylos", roles: ["Roam"] },
  { name: "Kalea", roles: ["Roam"] },
  { name: "Mathilda", roles: ["Roam"] },
  { name: "Atlas", roles: ["Roam"] },
  { name: "Belerick", roles: ["Roam"] },
  { name: "Floryn", roles: ["Roam"] },
  { name: "Carmilla", roles: ["Roam"] },
  { name: "Diggie", roles: ["Roam"] },
  { name: "Akai", roles: ["Roam"] },
  { name: "Franco", roles: ["Roam"] },
  { name: "Tigreal", roles: ["Roam"] },
  { name: "Rafaela", roles: ["Roam"] },
  { name: "Estes", roles: ["Roam"] },
  { name: "Saber", roles: ["Roam", "Jungle"] },
  { name: "Lolita", roles: ["Roam"] },
  { name: "Natalia", roles: ["Roam", "Jungle"] },
  { name: "Grock", roles: ["Roam"] },
  { name: "Minotaur", roles: ["Roam"] },
  { name: "Johnson", roles: ["Roam"] },
  { name: "Kaja", roles: ["Roam"] },
  { name: "Khufra", roles: ["Roam"] },

  // Jungle
  { name: "Yi Sun-shin", roles: ["Jungle"] },
  { name: "Aamon", roles: ["Jungle"] },
  { name: "Ling", roles: ["Jungle"] },
  { name: "Roger", roles: ["Jungle"] },
  { name: "Suyou", roles: ["Jungle"] },
  { name: "Hayabusa", roles: ["Jungle"] },
  { name: "Lancelot", roles: ["Jungle"] },
  { name: "Martis", roles: ["Jungle"] },
  { name: "Harley", roles: ["Jungle"] },
  { name: "Alucard", roles: ["Jungle"] },
  { name: "Hanzo", roles: ["Jungle"] },
  { name: "Karina", roles: ["Jungle"] },
  { name: "Fanny", roles: ["Jungle"] },
  { name: "Helcurt", roles: ["Jungle"] },
  { name: "Leomord", roles: ["Jungle"] },
  { name: "Baxia", roles: ["Jungle"] },
  { name: "Popol and Kupa", roles: ["Jungle", "Gold"] },
  { name: "Barats", roles: ["Jungle"] },
  { name: "Aulus", roles: ["Jungle"] },
  { name: "Julian", roles: ["Jungle"] },
  { name: "Fredrinn", roles: ["Jungle"] },
  { name: "Joy", roles: ["Jungle"] },
  { name: "Nolan", roles: ["Jungle"] },
  { name: "Gusion", roles: ["Jungle"] },

  // Gold Lane
  { name: "Brody", roles: ["Gold"] },
  { name: "Granger", roles: ["Gold"] },
  { name: "Ixia", roles: ["Gold"] },
  { name: "Karrie", roles: ["Gold"] },
  { name: "Hanabi", roles: ["Gold"] },
  { name: "Lesley", roles: ["Gold"] },
  { name: "Clint", roles: ["Gold"] },
  { name: "Miya", roles: ["Gold"] },
  { name: "Layla", roles: ["Gold"] },
  { name: "Moskov", roles: ["Gold"] },
  { name: "Irithel", roles: ["Gold"] },
  { name: "Bruno", roles: ["Gold"] },
  { name: "Melissa", roles: ["Gold"] },
  { name: "Claude", roles: ["Gold"] },
  { name: "Wanwan", roles: ["Gold"] },
  { name: "Beatrix", roles: ["Gold"] },
  { name: "Natan", roles: ["Gold"] },
];


const laneOrder = [
  { role: "Gold", label: "Gold Lane" },
  { role: "Exp", label: "Exp Lane" },
  { role: "Mid", label: "Mid Lane" },
  { role: "Jungle", label: "Jungle" },
  { role: "Roam", label: "Roaming" },
];

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v);
}

export const data = new SlashCommandBuilder()
  .setName("mlmatch")
  .setDescription("Generate a fun Mobile Legends match assignment!")
  .addStringOption(option =>
    option.setName("input")
      .setDescription("5 player names separated by commas, optionally add -random or -aligned (default: aligned).")
      .setRequired(true)
  );

export async function execute(interaction: any) {
  const input = interaction.options.getString("input");
  if (!input) {
    await interaction.reply({ content: "Input required.", ephemeral: true });
    return;
  }

  // Parse input
  // Automatically detect number of teams
  let namesPart = input.replace(/-(random|aligned)$/i, "").trim();
  const names = namesPart.split(",").map((n: string) => n.trim()).filter(Boolean);
  const numTeams = names.length / 5;
  const modeMatch = input.match(/-(random|aligned)$/i);
  const mode = modeMatch ? modeMatch[1].toLowerCase() : "aligned";
  // Check for duplicate/similar names (case-insensitive, trimmed)
  const lowerNames = names.map((n: string) => n.toLowerCase());
  const nameSet = new Set(lowerNames);
  if (nameSet.size !== names.length) {
    await interaction.reply({ content: `❗ Duplicate or similar player names detected. Please use unique names for each player.`, ephemeral: true });
    return;
  }
  if (!Number.isInteger(numTeams) || numTeams < 1) {
    await interaction.reply({ content: `❗ Please input a multiple of 5 player names separated by commas (5, 10, 15, ...). Example: alex,laurent,vio,fika,john,emma,kevin,steve,amy,ben`, ephemeral: true });
    return;
  }
  if (mode !== "random" && mode !== "aligned") {
    await interaction.reply({ content: "❗ Invalid mode. Use -random or -aligned.\nExample: alex,laurent,vio,fika,john -random", ephemeral: true });
    return;
  }

  let allTeamsOutput: string[] = [];
  for (let t = 0; t < numTeams; t++) {
    const teamNames = names.slice(t * 5, (t + 1) * 5);
    let assignments: { name: string, hero: string, role: string }[] = [];
    if (mode === "random") {
      const heroPool = shuffle([...heroes]);
      if (heroPool.length < 5) {
        await interaction.reply({ content: "Not enough heroes in the pool.", ephemeral: true });
        return;
      }
      const chosenHeroes = heroPool.slice(0, 5);
      assignments = teamNames.map((name: string, i: number) => {
        const hero = chosenHeroes[i];
        const lane = laneOrder[i];
        return { name, hero: hero.name, role: lane.label };
      });
    } else if (mode === "aligned") {
      const availableHeroes = shuffle([...heroes]);
      const usedHeroes: Set<string> = new Set();
      assignments = [];
      for (let i = 0; i < laneOrder.length; i++) {
        const { role, label } = laneOrder[i];
        const hero = availableHeroes.find(
          (h) => h.roles.includes(role) && !usedHeroes.has(h.name)
        );
        if (!hero) {
          await interaction.reply({
            content: `Not enough heroes to fill all roles for -aligned mode.`,
            ephemeral: true,
          });
          return;
        }
        assignments.push({
          name: teamNames[i],
          hero: hero.name,
          role: label,
        });
        usedHeroes.add(hero.name);
      }
    }
    const teamOutput = assignments
      .map((a) => `${a.name} = ${a.hero} (${a.role})`)
      .join("\n");
    allTeamsOutput.push(`**Team ${t + 1}:**\n${teamOutput}`);
  }
  await interaction.reply({
    content: allTeamsOutput.join("\n\n"),
  });
}
