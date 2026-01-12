import { Message, Client } from 'discord.js';
import { getBotConfig } from '../services/configService.js';
import { storeMessage } from '../services/conversationService.js';
import { generateResponse } from '../services/aiService.js';
import { log } from '../utils/logger.js';

export async function handleMessage(message: Message, client: Client) {
  // Ignore bot messages
  if (message.author.bot) return;

  try {
    // Get bot configuration
    const config = await getBotConfig();

    if (!config.isActive) {
      log.info('Bot is not active, ignoring message');
      return;
    }

    // Check if message is in an allowed channel
    const isAllowedChannel = config.allowedChannels.includes(message.channelId);
    const isMentioned = message.mentions.has(client.user!.id);

    if (!isAllowedChannel && !isMentioned) {
      return;
    }

    log.info('Processing message', {
      channelId: message.channelId,
      author: message.author.tag,
      content: message.content.substring(0, 100),
    });

    // Store user message
    await storeMessage(
      message.channelId,
      'user',
      message.content,
      message.author.id,
      message.author.tag
    );

    // Show typing indicator
    await message.channel.sendTyping();

    // Generate AI response
    const response = await generateResponse(
      config.systemInstructions,
      message.content,
      message.channelId
    );

    // Send response
    const sentMessage = await message.reply(response);

    // Store assistant message
    await storeMessage(
      message.channelId,
      'assistant',
      response,
      client.user!.id,
      client.user!.tag
    );

    log.info('Response sent successfully', {
      channelId: message.channelId,
      responseLength: response.length,
    });
  } catch (error) {
    log.error('Error handling message', error);
    
    try {
      await message.reply('I apologize, but I encountered an error while processing your message. Please try again later.');
    } catch (replyError) {
      log.error('Failed to send error message', replyError);
    }
  }
}
