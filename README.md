# ROAD.NET — Human Connection Beyond Borders

INTENTION + COMPATIBILITY + TRUST + EXPERIENCE + HUMAN CONNECTION

---

## Project Overview

ROAD.NET is an innovative adult human-connection platform that helps adults discover meaningful relationships, marriage opportunities, friendships, companionship, international connections, and shared experiences across communities, countries, and continents.

**Core Philosophy:** INTENTION + COMPATIBILITY + TRUST + EXPERIENCE + HUMAN CONNECTION

---

## Problem Statement

Traditional dating apps focus on superficial swipe-based interactions. ROAD.NET addresses the need for a trusted global platform for intentional human connection — bridging cultures, borders, and communities through meaningful introductions, compatibility matching, and shared experiences.

---

## Product Vision

A new category: A trusted global platform for intentional human connection — not another dating app.

---

## Features

- Multi-step registration with intentions, interests, and preferences
- Explainable compatibility scoring algorithm (0-100)
- "Why You Matched" — transparent matching reasons
- Introduction system (not instant messaging)
- Connection journey visualization
- Diaspora Bridge — connect across origins and current locations
- Moments — social content sharing
- Experience marketplace (wellness, cultural, travel, events)
- Booking system with availability management
- Mock payment processing
- Reviews and ratings
- Trust & Safety center (report, block, unmatch)
- Privacy controls
- Notification system
- Admin dashboard with analytics
- Responsive design (desktop, tablet, mobile)

---

## Innovation

### 1. Why We Matched

Instead of just showing a compatibility percentage, ROAD.NET explains exactly which preferences produced the score — demonstrating explainable matching.

### 2. Connection Journey

A visible progress tracker: DISCOVERED → INTRODUCTION → ACCEPTED → CONNECTION → SHARED EXPERIENCE

### 3. Diaspora Bridge

Users specify Country of Origin and Current Country, enabling discovery based on diaspora connections — making ROAD.NET genuinely global.

---

## Architecture

```
roadnet/
├── roadnet-backend/          # Spring Boot REST API
│   ├── src/main/java/com/roadnet/
│   │   ├── config/           # Security, CORS, Seed data
│   │   ├── controller/       # REST controllers
│   │   ├── dto/              # Data transfer objects
│   │   ├── entity/           # JPA entities
│   │   ├── exception/        # Global exception handling
│   │   ├── mapper/           # Entity-DTO mappers
│   │   ├── repository/       # Spring Data repositories
│   │   ├── security/         # JWT, authentication
│   │   ├── service/          # Business logic
│   │   └── util/             # Utilities
│   └── src/main/resources/   # Application config
├── roadnet-frontend/          # React SPA
│   └── src/
│       ├── api/              # API service layer
│       ├── components/       # Reusable components
│       ├── context/          # React context (auth)
│       ├── guards/           # Route guards
│       ├── hooks/            # Custom hooks
│       ├── pages/            # Page components
│       └── types/            # TypeScript interfaces
└── README.md
```

---

## Tech Stack

### Frontend

- React.js 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod
- Lucide React icons
- Recharts (admin analytics)

### Backend

- Java 17
- Spring Boot 3.2.5
- Spring Data JPA
- Spring Security + JWT
- Bean Validation
- BCrypt password hashing
- Lombok
- SpringDoc OpenAPI (Swagger)

### Database

- PostgreSQL
- Hibernate/JPA
- Normalized relational schema with UUIDs

---

## Database Architecture

### ER Diagram (Text Format)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    users     │    │   profiles   │    │  languages   │
│──────────────│    │──────────────│    │──────────────│
│ id (UUID)    │◄──┐│ id (UUID)    │    │ id (UUID)    │
│ email        │   ││ user_id (FK) │    │ name         │
│ password_hash│   ││ date_of_birth│    │ code         │
│ display_name │   ││ gender       │    └──────┬───────┘
│ role         │   ││ country      │           │
│ status       │   ││ region       │    ┌──────┴───────┐
│ verification │   ││ bio          │    │profile_langs  │
│ created_at   │   ││ profession   │    │──────────────│
│ updated_at   │   ││ latitude     │    │ profile_id   │
└──────────────┘   ││ longitude    │    │ language_id  │
                   │└──────────────┘    └──────────────┘
                   │    │
                   │    ├──◄── profile_interests ──► interests
                   │    └──◄── profile_intentions ──► intentions
                   │
├──────────────────┤
│ introduction_req │
│──────────────────│
│ id (UUID)        │
│ sender_id (FK)   │──► users
│ receiver_id (FK) │──► users
│ message          │
│ status           │
│ created_at       │
├──────────────────┤
│  connections     │
│──────────────────│
│ id (UUID)        │
│ connection_code  │
│ user1_id (FK)    │──► users
│ user2_id (FK)    │──► users
│ compatibility    │
│ status           │
├──────────────────┤
│compatibility_sc  │
│──────────────────│
│ id (UUID)        │
│ user1_id (FK)    │
│ user2_id (FK)    │
│ total_score      │
│ breakdown scores │
│ reasons (JSON)   │
├──────────────────┤
│    moments       │
│──────────────────│
│ id (UUID)        │
│ author_id (FK)   │──► users
│ caption          │
│ image_url        │
│ category         │
│ likes_count      │
│ comments_count   │
├──────┬───────────┤
│      │           │
│comments│ reactions│
├──────┴───────────┤
│   experiences    │
│──────────────────│
│ id (UUID)        │
│ provider_id (FK) │──► users
│ title            │
│ description      │
│ category         │
│ price            │
│ duration         │
├──────────────────┤
│  availability    │
│──────────────────│
│ id (UUID)        │
│ experience_id(FK)│──► experiences
│ day_of_week      │
│ start_time       │
│ end_time         │
├──────────────────┤
│    bookings      │    ┌──────────────┐
│──────────────────│    │   payments   │
│ id (UUID)        │◄───│──────────────│
│ experience_id(FK)│    │ id (UUID)    │
│ user_id (FK)     │    │ booking_id   │
│ booking_date     │    │ amount       │
│ time_slot        │    │ status       │
│ status           │    └──────────────┘
├──────────────────┤
│    reviews       │
│──────────────────│
│ id (UUID)        │
│ experience_id    │
│ booking_id       │
│ reviewer_id      │
│ rating (1-5)     │
├──────────────────┤
│   reports        │    ┌──────────────┐
│──────────────────│    │   blocks     │
│ id (UUID)        │    │──────────────│
│ reporter_id      │    │ id (UUID)    │
│ reported_user_id │    │ blocker_id   │
│ category         │    │ blocked_id   │
│ status           │    └──────────────┘
├──────────────────┤
│ notifications    │
│──────────────────│
│ id (UUID)        │
│ user_id (FK)     │
│ type             │
│ title            │
│ message          │
│ is_read          │
└──────────────────┘
```

---

## Matching Algorithm

The compatibility score (0-100) is calculated using weighted components:

| Component | Weight | Method |
|-----------|--------|--------|
| Relationship Intention | 25% | Jaccard similarity of shared intentions |
| Geography | 10% | Country match, current location, geographic preference |
| Interests | 15% | Jaccard similarity of shared interests |
| Lifestyle | 15% | Marital status, account purpose, profession compatibility |
| Languages | 10% | Shared languages |
| Distance | 5% | Haversine distance between coordinates |
| Other | 20% | Age range, gender, visibility preferences |

**Explainability:** Each score includes human-readable reasons explaining why the match was generated.

---

## API Documentation

Swagger UI available at: `http://localhost:8080/swagger-ui.html`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET/PUT | /api/profile | Get/update profile |
| GET | /api/discover | Discovery feed |
| GET | /api/search | Search with filters |
| GET | /api/compatibility/{id} | Compatibility score |
| POST | /api/introductions | Send introduction |
| PUT | /api/introductions/{id}/accept | Accept introduction |
| GET | /api/connections | List connections |
| GET/POST | /api/moments | Moments feed/create |
| GET/POST | /api/experiences | Experiences marketplace |
| POST | /api/bookings | Create booking |
| POST | /api/reports | Report user |
| GET | /api/notifications | Notifications |
| GET | /api/admin/dashboard | Admin statistics |

---

## Security

- BCrypt password hashing
- JWT token authentication
- Role-based authorization (USER, PROVIDER, AGENCY, ADMIN)
- Request validation (Bean Validation)
- SQL injection protection (JPA/Hibernate)
- CORS configuration
- Secure file upload validation
- Privacy controls
- Backend authorization enforcement
- Global exception handling

---

## Installation

### Prerequisites

- Java 17+
- Maven 3.8+
- PostgreSQL 14+
- Node.js 18+
- npm 9+

### 1. Database Setup

```sql
CREATE DATABASE roadnet;
CREATE DATABASE roadnet_dev;
```

### 2. Backend Setup

```bash
cd roadnet-backend

# Configure database in application.yml
# Default: localhost:5432/roadnet, postgres/postgres

mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 3. Frontend Setup

```bash
cd roadnet-frontend

npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:8080/api
```

### Backend (application.yml)

```yaml
spring.datasource.url: jdbc:postgresql://localhost:5432/roadnet
spring.datasource.username: postgres
spring.datasource.password: postgres
jwt.secret: YOUR_JWT_SECRET_KEY_HERE
jwt.expiration: 86400000
```

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@roadnet.app | Admin@12345 |
| Demo User | demo@roadnet.app | Demo@12345 |

**Note:** These are demo credentials for presentation purposes only.

### Demo Flow

1. Login with demo@roadnet.app / Demo@12345
2. Dashboard shows welcome message and stats
3. Navigate to Discover — browse compatible profiles
4. View a profile — see compatibility score and "Why You Matched"
5. Send an introduction with a personalized message
6. Switch to demo recipient — accept the introduction
7. Connection created with unique ID (RD-2026-XXXX)
8. Navigate to Moments — create/view social content
9. Navigate to Experiences — browse and book an experience
10. Mock payment — booking confirmed
11. Login as admin — view dashboard with analytics

---

## Deployment Strategy

- **Frontend:** Vercel / Netlify (static build)
- **Backend:** Render / Railway / AWS (Java runtime)
- **Database:** PostgreSQL hosting (Render, AWS RDS, Supabase)

---

## Known Limitations

- Mock payment system (no real payment processing)
- Verification is simulated (architecture ready for real services)
- No real-time messaging (planned for Phase 2)
- No mobile app (planned for Phase 2)
- No AI-assisted recommendations (planned for Phase 3)

---

## Future Roadmap

### Phase 2

- Mobile application (React Native)
- Advanced matching algorithms
- Video introductions
- Real-time translation
- Enhanced verification services
- International communities

### Phase 3

- AI-assisted recommendations
- AI translation
- Events platform
- Matchmaking communities
- Diaspora programs

### Phase 4

- International payments (Mobile Money, Cards, Bank)
- Verified experience marketplace
- Professional matchmaking services
- Cross-border travel integration

---

## License

This project was developed as an internship software development assessment.

---

**ROAD.NET — Human Connection Beyond Borders**

INTENTION + COMPATIBILITY + TRUST + EXPERIENCE + HUMAN CONNECTION
