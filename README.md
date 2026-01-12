# Figmenta Copilot

AI-powered Discord bot with admin control panel, RAG knowledge base, and intelligent responses.

## 🚀 Features

- **Admin Web Console** - Manage bot settings, view conversations, upload PDFs
- **Discord Bot** - AI-powered responses with context awareness
- **RAG Knowledge Base** - Upload PDFs for the bot to reference
- **100% Free** - Uses Groq, Hugging Face, and Supabase free tiers

## 🏗️ Tech Stack

- **AI**: Groq (Llama 3.3 70B) - Chat completions
- **Embeddings**: Hugging Face (sentence-transformers) - FREE!
- **Database**: Supabase (PostgreSQL + pgvector)
- **Frontend**: Next.js 14, React 19, TypeScript
- **Bot**: Discord.js v14

## 📁 Project Structure

```
Figmenta/
├── admin-console/     # Next.js admin web interface
└── discord-bot/       # Discord bot application
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account (free)
- Groq API key (free)
- Hugging Face API key (free)
- Discord Bot Token

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/figmenta-copilot.git
cd figmenta-copilot
```

### 2. Set Up Admin Console

```bash
cd admin-console
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma db push
npm run db:seed
npm run dev
```

### 3. Set Up Discord Bot

```bash
cd ../discord-bot
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## 📖 Documentation

- **README.md** - This file
- **DEPLOYMENT.md** - Production deployment guide
- Check individual folders for detailed setup

## 🔑 Environment Variables

### Admin Console
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `HUGGINGFACE_API_KEY` - Hugging Face API token
- `NEXTAUTH_SECRET` - Random secret for sessions

### Discord Bot
- `DISCORD_TOKEN` - Discord bot token
- `DISCORD_CLIENT_ID` - Discord application ID
- `API_BASE_URL` - Admin console URL
- `GROQ_API_KEY` - Groq API key

## 💰 Cost

**$0.00/month** - All services use free tiers!

- Groq: Free tier
- Hugging Face: Free tier
- Supabase: Free tier (500MB DB)
- Discord: Free

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📝 License

MIT License

## 🙏 Credits

Built with:
- [Groq](https://groq.com/) - Fast AI inference
- [Hugging Face](https://huggingface.co/) - Free embeddings
- [Supabase](https://supabase.com/) - Database & vectors
- [Discord.js](https://discord.js.org/) - Discord API wrapper
