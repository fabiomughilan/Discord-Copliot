import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the current bot configuration
    const config = await prisma.botConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!config) {
      return NextResponse.json({
        systemInstructions: '',
        allowedChannels: [],
        isActive: true,
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Get config error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { systemInstructions, allowedChannels, isActive } = body;

    // Get or create config
    let config = await prisma.botConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (config) {
      // Update existing config
      config = await prisma.botConfig.update({
        where: { id: config.id },
        data: {
          systemInstructions: systemInstructions ?? config.systemInstructions,
          allowedChannels: allowedChannels ?? config.allowedChannels,
          isActive: isActive ?? config.isActive,
        },
      });
    } else {
      // Create new config
      config = await prisma.botConfig.create({
        data: {
          systemInstructions: systemInstructions || 'You are a helpful assistant.',
          allowedChannels: allowedChannels || [],
          isActive: isActive ?? true,
        },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Update config error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
