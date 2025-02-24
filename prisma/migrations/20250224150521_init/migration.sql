-- CreateTable
CREATE TABLE "EmailIngestionConfig" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "connectionType" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "host" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailIngestionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAttachment" (
    "id" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "attachmentFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "EmailAttachment_pkey" PRIMARY KEY ("id")
);
