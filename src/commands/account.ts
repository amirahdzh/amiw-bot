import { SlashCommandBuilder } from "discord.js";

const codes = [
  "A9X2B7C4D1",
  "Q8W3E6R5T2",
  "Z7X6C5V4B3",
  "M1N2B3V4C5",
  "L6K7J8H9G0",
  "P2O3I4U5Y6",
  "T7R8E9W0Q1",
  "S2D3F4G5H6",
  "J7K8L9M0N1",
  "B2V3C4X5Z6",
  "Y7U8I9O0P1",
  "G2F3D4S5A6",
  "H7J8K9L0M1",
  "N2M3B4V5C6",
  "X7Z8A9S0D1",
  "F2G3H4J5K6",
  "L7M8N9B0V1",
  "C2X3Z4A5S6",
  "D7F8G9H0J1",
  "K2L3M4N5B6",
  "V7C8X9Z0A1",
  "A1B2C3D4E5",
  "F6G7H8I9J0",
  "K1L2M3N4O5",
  "P6Q7R8S9T0",
  "U1V2W3X4Y5",
  "Z6A7B8C9D0",
  "E1F2G3H4I5",
  "J6K7L8M9N0",
  "O1P2Q3R4S5",
  "T6U7V8W9X0",
  "Y1Z2A3B4C5",
  "D6E7F8G9H0",
  "I1J2K3L4M5",
  "N6O7P8Q9R0",
];

export const data = new SlashCommandBuilder()
  .setName("account")
  .setDescription("Get access to amiw's available account on MLBB!");

export async function execute(interaction: any) {
  const randomCode = codes[Math.floor(Math.random() * codes.length)];
  const member = interaction.user;
  const publicMsg =
    `**<@${member.id}>, jangan lupa cek DM ya!**\n\n` +
    `Cara akses akun MLBB Amiw sudah dikirim ke DM.\n` +
    `> *Pastikan kamu mengizinkan bot untuk mengirim pesan DM.*`;

  // Always reply publicly in the channel as soon as possible
  await interaction.reply({
    content: publicMsg,
    ephemeral: false,
  });

  // Send DM for privacy, but don't block the reply
  member.send(
    `✨ **Hai <@${member.id}>!** ✨\n\n` +
    `🔑 Kamu mendapatkan akses ke akun MLBB Amiw!\n\n` +
    `➡️ **Langkah selanjutnya:**\n` +
    `1. Kunjungi: https://amiw.dev/hidden\n` +
    `2. Masukkan kode rahasia berikut: \`${randomCode}\`\n\n` +
    `📋 Setelah itu, kamu bisa melihat daftar akun yang tersedia untuk kamu pakai!\n\n` +
    `> *Kalau mau akses akun utama amiw, DM langsung ke<@454985541327519744> aja yaa. Buat kamu pasti boleh kok! :3*`
  ).catch(() => {/* ignore DM errors */});
}
