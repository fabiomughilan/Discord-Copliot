import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { handleMessage } from './handlers/messageHandler.js';
import { log } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Ready event
client.once('ready', () => {
  log.info(`Discord bot logged in as ${client.user?.tag}`);
  log.info(`Bot is active in ${client.guilds.cache.size} servers`);
});

// Message create event
client.on('messageCreate', async (message) => {
  await handleMessage(message, client);
});

// Error handling
client.on('error', (error) => {
  log.error('Discord client error', error);
});

process.on('unhandledRejection', (error) => {
  log.error('Unhandled promise rejection', error);
});

// Login to Discord
const token = process.env.DISCORD_TOKEN;

if (!token) {
  log.error('DISCORD_TOKEN is not set in environment variables');
  process.exit(1);
}

client.login(token).catch((error) => {
  log.error('Failed to login to Discord', error);
  process.exit(1);
});
