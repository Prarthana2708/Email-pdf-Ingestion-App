# Email PDF Ingestion App

This Next.js application enables users to configure email accounts, fetch emails with PDF attachments, and store metadata in a PostgreSQL database using Prisma.

## 🚀 Features
- Configure email accounts (IMAP, POP3, Gmail API, Outlook API)
- Automatically fetch emails with PDF attachments
- Save PDFs locally and store metadata in the database
- Simple UI for managing email configurations

## 🛠 Tech Stack
- **Frontend**: Next.js (TypeScript)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Email Handling**: IMAP, POP3, Gmail API, Outlook API

---

## 📂 Project Structure
```
Email-pdf-Ingestion-App/
│-- prisma/ (Prisma schema & migrations)
│-- src/
│   │-- app/
│   │   │-- api/email-ingestion/ (API routes for email processing)
│   │   │-- page.tsx (UI for email configuration)
│-- pdfs/ (Locally stored PDFs)
│-- .env (Environment variables)
│-- package.json
│-- README.md
```

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Prarthana2708/Email-pdf-Ingestion-App.git
cd Email-pdf-Ingestion-App
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```
DATABASE_URL="postgresql://user:password@localhost:5432/email_db"
EMAIL_HOST="imap.example.com"
EMAIL_PORT=993
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-password"
```
(Update these values based on your email provider and database credentials.)

### 4️⃣ Run Database Migrations
```sh
npx prisma migrate dev
```

### 5️⃣ Start the Application
```sh
npm run dev
```
The app will be available at `http://localhost:3000`

---

## 📌 Usage
1. Open the app and add an email configuration.
2. The system will automatically check for emails with PDF attachments.
3. PDFs will be saved in the `pdfs/` folder, and metadata will be stored in the database.

## 📝 Testing
- Send an email with a PDF attachment to the configured inbox.
- Check if the PDF appears in the `pdfs/` directory.
- Verify the database contains the email metadata.

## 🔥 Issues & Contributions
If you encounter any issues, feel free to open an issue in the repository. Contributions are welcome!

---

## 🌟 Credits
Developed as part of a project exploring email automation and data ingestion. 🚀

