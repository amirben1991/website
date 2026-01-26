# PrinceDev Portfolio Website

Full-stack portfolio web application with AI-powered Chat assistant.

## 🎯 Features

- **Angular 19** frontend with standalone components & Tailwind CSS
- **Spring Boot 4.0.1** backend with PostgreSQL
- **AI Chat Assistant (Jarvis)** powered by OpenAI GPT-4o-mini
  - Auto-opens on user login
  - Tony Stark-inspired humor
  - Dynamic context from portfolio data
  - Persistent conversation history
- **JWT Authentication** for secure user access
- **Responsive Design** with smooth page transitions
- **French UI** with professional styling

## 📋 Project Structure

```
website/
├── frontend/              # Angular 19 SPA
│   ├── src/app/
│   │   ├── components/    # Navbar, Chat Widget, Page components
│   │   ├── services/      # Auth, Chat, Data services
│   │   ├── guards/        # Auth guard
│   │   └── interceptors/  # JWT auth interceptor
│   └── angular.json       # Dev proxy to backend
├── backend/               # Spring Boot REST API
│   ├── src/main/java/
│   │   ├── controller/    # REST endpoints
│   │   ├── service/       # Business logic (ChatService, OpenAI)
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Spring Data JPA repos
│   │   └── security/      # JWT utils & config
│   └── build.gradle       # Gradle dependencies
└── README.md

```

## 🚀 Getting Started

### Prerequisites
- Node.js 25+ (for frontend)
- Java 25+ (for backend)
- PostgreSQL 18+ (running on localhost:5432)
- OpenAI API key (for Chat AI)

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Server runs on `http://localhost:4200` (or port suggested if 4200 is in use).

### Backend Setup

```bash
cd backend

# Set OpenAI API key
export OPENAI_API_KEY="sk-proj-..."  # Linux/Mac
# OR
$env:OPENAI_API_KEY="sk-proj-..."    # PowerShell

# Run Spring Boot
./gradlew bootRun
```

Server runs on `http://localhost:8081`.

### Dev Proxy Configuration

Frontend automatically proxies `/api/*` requests to backend via `proxy.conf.json`.

## 🔐 Authentication & Secrets

- **JWT Secret** : dynamically generated per session (change for production)
- **OpenAI API Key** : set via `OPENAI_API_KEY` environment variable
- **Never commit secrets** : use `.env.local` or CI/CD secrets management

### Production Checklist

Before deployment:
1. Set static JWT secret in backend config (not random)
2. Use secure OpenAI API key management (AWS Secrets Manager, etc.)
3. Enable rate limiting on `/api/chat/send`
4. Configure CORS for production domain
5. Set up PostgreSQL with proper credentials
6. Review logs and error handling

## 🤖 Chat AI (Jarvis)

The Chat widget is available to authenticated users on all pages.

### Features
- **Auto-opens** 500ms after user login
- **Dynamic context** : injects real projects, experience, education from DB
- **Personality** : Tony Stark-inspired sarcasm and humor
- **Constrained scope** : only discusses portfolio content
- **Persistent history** : per-user conversation storage

### How It Works

1. User sends message via widget
2. Frontend calls `POST /api/chat/send` with JWT
3. Backend retrieves user conversation and portfolio data
4. ChatService builds dynamic system prompt with real data
5. Calls OpenAI GPT-4o-mini API
6. Stores conversation in PostgreSQL
7. Returns AI reply to frontend with formatting

### System Prompt

The system prompt is **dynamic** and includes:
- Jarvis personality description
- Real projects with tech stack
- Professional experience with dates
- Education and degrees
- Constraints (portfolio topics only)

Example topics Jarvis can discuss:
- "Quels sont les projets récents ?"
- "Quelle est ton expérience en Angular ?"
- "Parle-moi de ta formation"

Out-of-scope (politely declined):
- "Parle-moi de politique"
- "Quelle est la météo ?"

## 📦 Build & Deployment

### Frontend Build

```bash
cd frontend
npm run build
# Output in dist/structure/
```

### Backend Build

```bash
cd backend
./gradlew build
# Output in build/libs/*.jar
```

### Deploy to Production

1. **Frontend** : deploy `dist/structure/` to static hosting (Netlify, Vercel, etc.)
2. **Backend** : deploy JAR to application server (Heroku, AWS EC2, etc.)
3. **Database** : ensure PostgreSQL is accessible and migrated
4. **Environment Variables** : set `OPENAI_API_KEY`, database URL, JWT secret

## 🧪 Testing

### Frontend Unit Tests

```bash
cd frontend
npm test
```

### Backend Unit Tests

```bash
cd backend
./gradlew test
```

## 📝 Development Workflow

1. **Frontend changes** : HMR auto-reload on `npm start`
2. **Backend changes** : Spring DevTools auto-restart on `./gradlew bootRun`
3. **Database changes** : update JPA entities & run migrations
4. **API changes** : update both backend controller & frontend service

## 🎨 Tech Stack

**Frontend:**
- Angular 19 (standalone components)
- Tailwind CSS + SCSS
- RxJS & Reactive Forms
- TypeScript

**Backend:**
- Spring Boot 4.0.1
- Spring Data JPA / Hibernate
- Spring Security with JWT
- PostgreSQL
- OpenAI API client

## 📄 License

Personal project - Amir Ben

## 🙋 Support

For issues or questions, check the code comments or the git commit history.

---

**Last Updated:** January 26, 2026  
**Status:** Jarvis Chat AI operational, ready for production review
