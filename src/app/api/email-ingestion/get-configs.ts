import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const configs = await prisma.emailIngestionConfig.findMany();
    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch configurations' }, { status: 500 });
  }
}
