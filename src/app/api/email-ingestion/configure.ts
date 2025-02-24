import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { emailAddress, connectionType, username, password, host } = await req.json();
    const config = await prisma.emailIngestionConfig.create({
      data: { emailAddress, connectionType, username, password, host },
    });

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}
