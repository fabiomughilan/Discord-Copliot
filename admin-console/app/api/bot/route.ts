import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { queryKnowledge } from '@/lib/supabase';

/**
 * Get bot configuration - used by Discord bot
 */
export async function GET() {
  try {
    const config = await prisma.botConfig.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!config) {
      return NextResponse.json({
        systemInstructions: 'You are a helpful assistant.',
        allowedChannels: [],
        isActive: false,
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Get bot config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Store conversation message - used by Discord bot
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, channelId, role, content, authorId, authorName, query } = body;

    if (action === 'store_message') {
      // Find or create conversation
      let conversation = await prisma.conversation.findFirst({
        where: { channelId },
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: { channelId },
        });
      }

      // Store message
      const message = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role,
          content,
          authorId,
          authorName,
        },
      });

      // Update conversation summary if needed
      const messageCount = await prisma.message.count({
        where: { conversationId: conversation.id },
      });

      // Every 10 messages, update the running summary
      if (messageCount % 10 === 0) {
        const recentMessages = await prisma.message.findMany({
          where: { conversationId: conversation.id },
          orderBy: { timestamp: 'desc' },
          take: 10,
        });

        const summary = `Recent conversation: ${recentMessages
          .reverse()
          .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
          .join('; ')}`;

        await prisma.conversation.update({
          where: { id: conversation.id },
          data: { runningSummary: summary },
        });
      }

      return NextResponse.json({ success: true, message });
    }

    if (action === 'get_context') {
      // Get conversation context
      const conversation = await prisma.conversation.findFirst({
        where: { channelId },
        include: {
          messages: {
            orderBy: { timestamp: 'desc' },
            take: 20,
          },
        },
      });

      return NextResponse.json({
        messages: conversation?.messages.reverse() || [],
        summary: conversation?.runningSummary || null,
      });
    }

    if (action === 'query_knowledge') {
      // Query RAG knowledge base
      const results = await queryKnowledge(query, 3);
      return NextResponse.json({ results });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Bot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
