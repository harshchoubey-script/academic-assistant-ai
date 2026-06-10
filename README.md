# AI Academic Assistant

An AI-powered study platform where students upload PDF notes and instantly get AI-generated summaries, flashcards, and quizzes.

**Live Demo:** [academic-assistant-ai-36hj.vercel.app](https://academic-assistant-ai-36hj.vercel.app)

---

## Features

- **PDF Upload** — Upload your study notes as PDF files
- **AI Summary** — Get concise, student-friendly summaries of your notes
- **AI Flashcards** — Auto-generated question/answer cards for active recall
- **AI Quiz** — Multiple choice questions with instant correct/wrong feedback
- **Authentication** — Secure signup/login with JWT; all data is private per user
- **Dashboard** — View and manage all your uploaded notes in one place

---

## Tech Stack

### Frontend
- React + TypeScript + Vite
- Tailwind CSS
- Axios
- React Router
- Zustand (auth state)

### Backend
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer (file upload)

### AI
- OpenRouter API (OpenAI SDK compatible)
- Model: `openai/gpt-3.5-turbo`

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → Render PostgreSQL

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenRouter API key

### 1. Clone the repository

```bash
git clone https://github.com/harshchoubey-script/academic-assistant-ai.git
cd academic-assistant-ai
```

### 2. Install dependencies

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd server
pnpm install
```

### 3. Configure environment variables

Create `.env` in the project root (frontend):

```env
VITE_API_URL=http://localhost:3000
```

Create `.env` in `/server` (backend):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/academic_assistant
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
PORT=3000
```

### 4. Set up the database

```bash
cd server
pnpm exec prisma generate
pnpm exec prisma migrate dev --name init
```

### 5. Run the development servers

```bash
# Start backend (from /server)
npx tsx src/index.ts

# Start frontend (from project root)
pnpm dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

---

## Project Structure

```
root/
├── src/                        # React frontend
│   ├── api/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── NoteCard.tsx
│   │   ├── QuizCard.tsx
│   │   └── FlashcardCard.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── UploadPage.tsx
│   │   └── NotePage.tsx
│   └── routes/
├── server/                     # Express backend
│   └── src/
│       ├── controllers/        # auth, note, summary, quiz, flashcard
│       ├── middlewares/        # JWT auth
│       ├── routes/
│       ├── services/           # AI service (OpenRouter)
│       └── lib/                # Prisma client
├── prisma/
│   └── schema.prisma
└── uploads/                    # Local PDF storage (dev only)
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notes/upload` | Upload a PDF note |
| GET | `/notes` | Get all notes for current user |
| GET | `/notes/:id` | Get a single note |

### AI Generation *(all protected, require Bearer token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/summary/generate/:noteId` | Generate AI summary |
| POST | `/flashcards/generate/:noteId` | Generate flashcards |
| POST | `/quiz/generate/:noteId` | Generate MCQ quiz |

---

## Database Schema

```prisma
model User         { id, name, email, password, createdAt }
model UploadedNote  { id, userId, filename, extractedText, status }
model Summary       { id, userId, noteId, content }
model Flashcard     { id, userId, noteId, question, answer }
model Quiz          { id, userId, noteId, question, options, correctAnswer }
```

---

## Deployment

### Backend (Render)

Set these environment variables in Render:
- `DATABASE_URL`
- `JWT_SECRET`
- `OPENROUTER_API_KEY`
- `PORT` (Render sets this automatically)

Build command: `pnpm install && pnpm exec prisma generate && pnpm build`  
Start command: `node dist/index.js`

### Frontend (Vercel)

Set in Vercel project settings:
- `VITE_API_URL` → your Render backend URL

Add a `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Roadmap

- [ ] AI chat with notes (RAG / context-aware assistant)
- [ ] Streaming AI responses
- [ ] Cloud storage for PDFs (S3 / Cloudflare R2)
- [ ] PDF preview in browser
- [ ] Analytics dashboard
- [ ] Vector DB + embeddings
- [ ] Rate limiting & input validation hardening
- [ ] Docker deployment

---

## License

MIT