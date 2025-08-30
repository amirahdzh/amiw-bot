# amiw-bot

**amiw-bot** is a powerful, customizable Discord bot designed for modern servers. It features both slash and prefix commands, dynamic reaction roles, public and private messaging, and is easy to extend for new features.

---

## ✨ Features

- **Slash Commands**: `/ping`, `/account`, `/mlmatch`, `/active-dev-badge`, and more
- **Prefix Commands**: `!mlmatch` for public match assignments
- **Dynamic Reaction Roles**: Assign roles via emoji reactions
- **Private & Public Messaging**: Send DMs or public messages as needed
- **Multi-Team Match Assignment**: Randomly or role-aligned assign Mobile Legends teams
- **Duplicate Name Detection**: Prevents errors in team assignments
- **Easy Configuration & Extension**: Add new commands or features quickly

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/amirahdzh/amiw-bot.git
cd amiw-bot
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

- Copy `.env.example` to `.env` and fill in your Discord bot token and other required values.

### 4. Deploy Slash Commands

```sh
npx ts-node src/deploy-commands.ts
```

### 5. Start the Bot

```sh
npm run dev
```

---

## ⚙️ Configuration

- **Reaction Roles**: Edit `src/utils/reactionRoleMap.ts` to map emojis to role IDs.
- **Commands**: Add or modify commands in `src/commands/` (see existing files for examples).
- **Events**: Add or modify event handlers in `src/events/`.

---

## 🛠 Usage

- **Slash Commands**: Use `/ping`, `/account`, `/mlmatch`, etc., directly in Discord.
- **Prefix Commands**: Use `!mlmatch` in any text channel for public team assignments.
- **Reaction Roles**: React to configured messages to receive roles automatically.

---

## 🤝 Contributing

Pull requests are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a pull request

---

## 📝 License

MIT License

---

## 💬 Support & Questions

For help, feature requests, or questions, open an issue on GitHub or contact [@amirahdzh](https://github.com/amirahdzh).
