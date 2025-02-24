import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Imap from 'imap-simple';
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const pdfFolder = path.join(process.cwd(), 'pdfs');

export async function GET() {
  try {
    const configs = await prisma.emailIngestionConfig.findMany();
    if (!configs.length) return NextResponse.json({ message: 'No email configurations found' });

    for (const config of configs) {
      const connection = await Imap.connect({
        imap: {
          user: config.username,
          password: config.password,
          host: config.host || process.env.IMAP_HOST,
          port: 993,
          tls: true,
        },
      });

      await connection.openBox('INBOX');
      const searchCriteria = ['UNSEEN'];
      const fetchOptions = { bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)'], struct: true };

      const messages = await connection.search(searchCriteria, fetchOptions);

      for (const message of messages) {
        const fromAddress = message.parts[0].body.from[0];
        const subject = message.parts[0].body.subject[0];
        const dateReceived = new Date(message.parts[0].body.date[0]);

        const attachments = Imap.getParts(message.attributes.struct)
          .filter((part: any) => part.disposition && part.disposition.type === 'ATTACHMENT');

        for (const attachment of attachments) {
          const fileName = attachment.disposition.params.filename;
          const filePath = path.join(pdfFolder, fileName);

          const attachmentStream = await connection.getPartData(message, attachment);
          await fs.writeFile(filePath, attachmentStream);

          await prisma.emailAttachment.create({
            data: { fromAddress, dateReceived, subject, attachmentFileName: fileName, filePath },
          });
        }
      }

      connection.end();
    }

    return NextResponse.json({ message: 'Emails processed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}
