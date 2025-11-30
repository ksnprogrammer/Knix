# Knix - AI Learning Platform

Knix is an open-source, advanced AI-powered learning platform for A/L Biology, Physics, and Chemistry students in Sri Lanka. It features an AI Live Tutor, Video Analysis, and Interactive Lessons.

## 🚀 Deploy Now

Click the button below to deploy this project to Vercel for free.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fknix-ai-platform)

## 🛠 Features

- **AI Voice Tutor**: Real-time voice conversations with Gemini 2.5 Live API.
- **Video Analyst**: Upload and analyze educational videos.
- **Smart Scanner**: Analyze diagrams and notes using Vision AI.
- **Resource Library**: Download past papers and marking schemes.
- **Creator Studio**: Manage content and courses.

## 🔧 Configuration

The application is currently configured to use a local browser-based database (LocalStorage) for zero-latency, zero-cost operation suitable for demos and initial deployment.

### Database Credentials (Saved)
Your database credentials for **Neon (PostgreSQL)** and **Supabase** are safely stored in `services/credentials.ts`. You can switch the `services/db.ts` logic to use these credentials when you are ready to implement server-side logic.

## 🌐 Custom Domain

After deploying to Vercel:
1. Go to your Project Dashboard on Vercel.
2. Click **Settings** > **Domains**.
3. Add `knix.gt.tc` (or your preferred domain).
4. Follow the DNS configuration instructions provided by Vercel.

## 📜 License

Open Source. Built for the students of Sri Lanka.
