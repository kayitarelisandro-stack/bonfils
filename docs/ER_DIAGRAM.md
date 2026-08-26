# ROAD.NET — Entity Relationship Diagram

This document defines the complete database schema for ROAD.NET.

---

## Entity Overview

| # | Entity | Description |
|---|--------|-------------|
| 1 | users | Platform accounts (authentication) |
| 2 | profiles | User profile data |
| 3 | intentions | Relationship intention types |
| 4 | interests | Interest/hobby tags |
| 5 | languages | Language list |
| 6 | profile_languages | M:N join — profiles ↔ languages |
| 7 | profile_interests | M:N join — profiles ↔ interests |
| 8 | profile_intentions | M:N join — profiles ↔ intentions |
| 9 | introduction_requests | Introduction requests between users |
| 10 | connections | Established connections |
| 11 | compatibility_scores | Cached compatibility calculations |
| 12 | moments | Social content posts |
| 13 | comments | Comments on moments |
| 14 | reactions | Reactions on moments |
| 15 | experiences | Experience marketplace listings |
| 16 | availability | Weekly time slots for experiences |
| 17 | bookings | User bookings for experiences |
| 18 | payments | Payment records for bookings |
| 19 | reviews | Reviews for experiences |
| 20 | reports | User abuse reports |
| 21 | blocks | User block records |
| 22 | notifications | User notifications |

---

## Relationships Diagram

```
                            ┌─────────────────────┐
                            │      intentions     │
                            │─────────────────────│
                            │ id          UUID PK │
                            │ name        VARCHAR │
                            │ description VARCHAR │
                            └────────┬────────────┘
                                     │
                             1:N     │
                             M:N     │
                                     │
┌──────────────┐  1:1  ┌────────────┴──┐  M:N  ┌──────────────┐
│    users     │◄─────►│   profiles    │◄─────►│  interests   │
│──────────────│       │───────────────│       │──────────────│
│ id       UUID│  PK   │ id       UUID │  PK   │ id      UUID │  PK
│ email    VCH│  UQ   │ user_id  UUID │  FK   │ name     VCH │
│ password VCH│       │ dob      DATE │       │ category VCH │
│ display  VCH│       │ gender   VCH │       └──────────────┘
│ role     VCH│       │ country  VCH │
│ status   VCH│       │ region   VCH │  ┌──────────────┐
│ verif    VCH│       │ bio      TXT │  │  languages   │
│ created  TS │       │ prof     VCH │  │──────────────│
│ updated  TS │       │ lat    FLOAT │  │ id      UUID │  PK
└──────┬───────┘       │ lng    FLOAT │  │ name     VCH │
       │               │ country_orig│  │ code     VCH │  UQ
       │               │ visib   VCH │  └──────┬───────┘
       │               │ marital VCH │         │
       │               │ purpose VCH │     M:N │
       │               └──────┬──────┘         │
       │                      │                │
       │    ┌─────────────────┼────────────────┤
       │    │                 │                │
       │    │     ┌───────────┴────────┐       │
       │    │     │ profile_languages  │       │
       │    │     │────────────────────│       │
       │    │     │ profile_id UUID FK │       │
       │    │     │ language_id UUID FK│       │
       │    │     └────────────────────┘       │
       │    │                                  │
       │    │     ┌────────────────────┐       │
       │    │     │ profile_interests  │       │
       │    │     │────────────────────│       │
       │    │     │ profile_id UUID FK │       │
       │    │     │ interest_id UUID FK│       │
       │    │     └────────────────────┘       │
       │    │                                  │
       │    │     ┌──────────────────────┐     │
       │    │     │ profile_intentions   │     │
       │    │     │──────────────────────│     │
       │    │     │ profile_id  UUID FK  │     │
       │    │     │ intention_id UUID FK │     │
       │    │     └──────────────────────┘     │
       │                                       │
       │  ┌────────────────────────────────────┘
       │  │
       │  │  ┌────────────────────┐
       │  │  │introduction_requests│
       │  │  │────────────────────│
       ├──┼─►│ id          UUID PK│
       │  │  │ sender_id   UUID FK│──► users
       │  │  │ receiver_id UUID FK│──► users
       │  │  │ message     TEXT   │
       │  │  │ status      VARCHAR│
       │  │  │ created_at  TIMESTAMP│
       │  │  └────────────────────┘
       │  │
       │  │  ┌────────────────────┐
       │  │  │    connections     │
       │  │  │────────────────────│
       ├──┼─►│ id           UUID PK│
       │  │  │ connection_code VCH │
       │  │  │ user1_id    UUID FK │──► users
       │  │  │ user2_id    UUID FK │──► users
       │  │  │ compatibility_score │
       │  │  │ status      VARCHAR │
       │  │  │ created_at  TIMESTAMP│
       │  │  │ updated_at  TIMESTAMP│
       │  │  └────────────────────┘
       │  │
       │  │  ┌──────────────────────────┐
       │  │  │  compatibility_scores    │
       │  │  │──────────────────────────│
       ├──┼─►│ id              UUID PK  │
       │  │  │ user1_id        UUID FK  │──► users
       │  │  │ user2_id        UUID FK  │──► users
       │  │  │ total_score     INTEGER  │
       │  │  │ intention_score INTEGER  │
       │  │  │ geography_score INTEGER  │
       │  │  │ interest_score  INTEGER  │
       │  │  │ lifestyle_score INTEGER  │
       │  │  │ language_score  INTEGER  │
       │  │  │ distance_score  INTEGER  │
       │  │  │ other_score     INTEGER  │
       │  │  │ reasons         JSONB    │
       │  │  │ created_at      TIMESTAMP│
       │  │  └──────────────────────────┘
       │  │
       │  │  ┌────────────────────┐
       │  │  │      moments       │
       │  │  │────────────────────│
       ├──┼─►│ id          UUID PK│
       │  │  │ author_id  UUID FK │──► users
       │  │  │ caption     TEXT   │
       │  │  │ image_url   VARCHAR│
       │  │  │ category    VARCHAR│
       │  │  │ visibility  VARCHAR│
       │  │  │ likes_count INTEGER│
       │  │  │ comments_count INT │
       │  │  │ created_at  TIMESTAMP│
       │  │  └────────┬───────────┘
       │  │           │
       │  │           │ 1:N
       │  │           │
       │  │    ┌──────┴───────────┐    ┌──────────────────┐
       │  │    │    comments      │    │    reactions     │
       │  │    │──────────────────│    │──────────────────│
       │  │    │ id       UUID PK │    │ id       UUID PK │
       │  │    │ moment_id UUID FK│──┐ │ moment_id UUID FK│──┐
       │  │    │ user_id  UUID FK │──┤ │ user_id  UUID FK │──┤
       │  │    │ content   TEXT   │  │ │ type     VARCHAR │  │
       │  │    │ created_at  TS  │  │ │ created_at  TS   │  │
       │  │    └──────────────────┘  │ └──────────────────┘  │
       │  │                          │                       │
       │  │                          └──► users              │
       │  │                                                  │
       │  │  ┌────────────────────────┐     ┌──────────────┐ │
       │  │  │     experiences        │     │  reviews     │ │
       │  │  │────────────────────────│     │──────────────│ │
       │  │  │ id           UUID PK   │     │ id    UUID PK│ │
       ├──┼─►│ provider_id  UUID FK   │◄────│ experience_id│ │
       │  │  │ title        VARCHAR   │     │ booking_id FK│─┤
       │  │  │ description  TEXT      │     │ reviewer_id  │ │
       │  │  │ category     VARCHAR   │     │ rating  INT  │ │
       │  │  │ price        DECIMAL   │     │ comment TEXT │ │
       │  │  │ duration     VARCHAR   │     │ created_at TS│ │
       │  │  │ location     VARCHAR   │     └──────────────┘ │
       │  │  │ image_url    VARCHAR   │                      │
       │  │  │ status       VARCHAR   │                      │
       │  │  │ avg_rating   DECIMAL   │                      │
       │  │  │ review_count INTEGER   │                      │
       │  │  │ created_at   TIMESTAMP │                      │
       │  │  └───────────┬────────────┘                      │
       │  │              │                                   │
       │  │              │ 1:N                               │
       │  │              │                                   │
       │  │    ┌─────────┴──────────┐                        │
       │  │    │    availability    │                        │
       │  │    │────────────────────│                        │
       │  │    │ id          UUID PK│                        │
       │  │    │ experience_id UUID FK│──► experiences       │
       │  │    │ day_of_week VARCHAR│                        │
       │  │    │ start_time  TIME   │                        │
       │  │    │ end_time    TIME   │                        │
       │  │    └────────────────────┘                        │
       │  │                                                  │
       │  │  ┌──────────────────────────┐  ┌──────────────┐  │
       │  │  │        bookings          │  │   payments   │  │
       │  │  │──────────────────────────│  │──────────────│  │
       │  │  │ id              UUID PK  │  │ id    UUID PK│  │
       ├──┼─►│ experience_id   UUID FK  │◄─┤ booking_id FK│  │
       │  │  │ user_id         UUID FK  │  │ amount  DEC  │  │
       │  │  │ booking_date    DATE     │  │ method  VCH  │  │
       │  │  │ start_time      TIME     │  │ status  VCH  │  │
       │  │  │ end_time        TIME     │  │ ref     VCH  │  │
       │  │  │ status          VARCHAR  │  │ created_at TS│  │
       │  │  │ created_at      TIMESTAMP│  └──────────────┘  │
       │  │  └──────────────────────────┘                    │
       │  │                                                  │
       │  │  ┌──────────────────┐    ┌──────────────────┐    │
       │  │  │     reports      │    │      blocks      │    │
       │  │  │──────────────────│    │──────────────────│    │
       │  │  │ id       UUID PK │    │ id       UUID PK │    │
       ├──┼─►│ reporter_id UUID FK│   │ blocker_id UUID FK│──►│
       │  │  │ reported_id UUID FK│   │ blocked_id UUID FK│──►│
       │  │  │ reason    VARCHAR │    │ created_at  TS   │    │
       │  │  │ category  VARCHAR │    └──────────────────┘    │
       │  │  │ details   TEXT    │                            │
       │  │  │ status    VARCHAR │                            │
       │  │  │ admin_note TEXT   │                            │
       │  │  │ created_at  TS   │                            │
       │  │  └──────────────────┘                            │
       │  │                                                  │
       │  │  ┌──────────────────────────┐                    │
       │  │  │     notifications        │                    │
       │  │  │──────────────────────────│                    │
       └──┴─►│ id              UUID PK  │                    │
              │ user_id        UUID FK  │──► users           │
              │ type           VARCHAR  │                    │
              │ title          VARCHAR  │                    │
              │ message        TEXT     │                    │
              │ reference_type VARCHAR  │                    │
              │ reference_id   UUID     │                    │
              │ is_read        BOOLEAN  │                    │
              │ created_at     TIMESTAMP│                    │
              └──────────────────────────┘                    │
```

---

## Detailed Entity Definitions

### 1. users

The central authentication entity. Every other entity references this via foreign key.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| display_name | VARCHAR(100) | NOT NULL | Public display name |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'USER' | USER / PROVIDER / AGENCY / ADMIN |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | ACTIVE / SUSPENDED / DEACTIVATED |
| verification_status | VARCHAR(20) | NOT NULL, DEFAULT 'UNVERIFIED' | UNVERIFIED / PENDING / VERIFIED |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

---

### 2. profiles

One-to-one extension of users with demographic and preference data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| user_id | UUID | FK → users(id), UNIQUE, NOT NULL | One profile per user |
| date_of_birth | DATE | NOT NULL | Date of birth |
| gender | VARCHAR(20) | NOT NULL | MALE / FEMALE / NON_BINARY / PREFER_NOT_TO_SAY |
| country | VARCHAR(100) | NOT NULL | Country of residence |
| region | VARCHAR(100) | | State / province / region |
| city | VARCHAR(100) | | City of residence |
| bio | TEXT | | Personal bio |
| profession | VARCHAR(100) | | Job title or profession |
| education | VARCHAR(100) | | Education level |
| height_cm | INTEGER | | Height in centimeters |
| marital_status | VARCHAR(30) | | SINGLE / DIVORCED / WIDOWED / SEPARATED |
| country_of_origin | VARCHAR(100) | | Country of birth / heritage |
| latitude | DOUBLE PRECISION | | Geolocation latitude |
| longitude | DOUBLE PRECISION | | Geolocation longitude |
| visibility | VARCHAR(20) | DEFAULT 'PUBLIC' | PUBLIC / CONNECTIONS_ONLY / HIDDEN |
| account_purpose | VARCHAR(30) | | MARRIANCE / FRIENDSHIP / COMPANIONSHIP / CULTURAL |
| profile_image_url | VARCHAR(500) | | Primary profile image URL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Profile creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last profile update |

**Relationship:** profiles.user_id → users.id (1:1)

---

### 3. intentions

Lookup table for relationship intentions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| name | VARCHAR(50) | UNIQUE, NOT NULL | Intention name |
| description | VARCHAR(255) | | Intention description |

**Sample rows:** MARRIAGE, LONG_TERM_RELATIONSHIP, FRIENDSHIP, COMPANIONSHIP, CULTURAL_EXCHANGE, TRAVEL_BUDDY, MENTORSHIP

---

### 4. interests

Lookup table for interest and hobby tags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| name | VARCHAR(50) | UNIQUE, NOT NULL | Interest name |
| category | VARCHAR(50) | | Grouping category |

**Sample rows:** TRAVEL, COOKING, FITNESS, MUSIC, READING, OUTDOORS, TECHNOLOGY, ARTS

---

### 5. languages

Lookup table for languages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| name | VARCHAR(50) | UNIQUE, NOT NULL | Language name |
| code | VARCHAR(10) | UNIQUE, NOT NULL | ISO 639-1 code |

**Sample rows:** English/en, French/fr, Portuguese/pt, Spanish/es, Arabic/ar, Swahili/sw

---

### 6. profile_languages (Join Table)

Many-to-many: profiles ↔ languages.

| Column | Type | Constraints |
|--------|------|-------------|
| profile_id | UUID | PK (composite), FK → profiles(id) ON DELETE CASCADE |
| language_id | UUID | PK (composite), FK → languages(id) ON DELETE CASCADE |

**Cardinality:** Many-to-Many

---

### 7. profile_interests (Join Table)

Many-to-many: profiles ↔ interests.

| Column | Type | Constraints |
|--------|------|-------------|
| profile_id | UUID | PK (composite), FK → profiles(id) ON DELETE CASCADE |
| interest_id | UUID | PK (composite), FK → interests(id) ON DELETE CASCADE |

**Cardinality:** Many-to-Many

---

### 8. profile_intentions (Join Table)

Many-to-many: profiles ↔ intentions.

| Column | Type | Constraints |
|--------|------|-------------|
| profile_id | UUID | PK (composite), FK → profiles(id) ON DELETE CASCADE |
| intention_id | UUID | PK (composite), FK → intentions(id) ON DELETE CASCADE |

**Cardinality:** Many-to-Many

---

### 9. introduction_requests

Users send introductions to other users before establishing a connection.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| sender_id | UUID | FK → users(id), NOT NULL | Who sends the introduction |
| receiver_id | UUID | FK → users(id), NOT NULL | Who receives it |
| message | TEXT | NOT NULL | Introduction message |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'PENDING' | PENDING / ACCEPTED / DECLINED / WITHDRAWN |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Request timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Response timestamp |

**Constraint:** sender_id ≠ receiver_id

**Cardinality:** Users 1 ──► N introduction_requests ◄── N Users

---

### 10. connections

Established mutual connections between users (created when an introduction is accepted).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| connection_code | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable code (RD-2026-XXXX) |
| user1_id | UUID | FK → users(id), NOT NULL | First user |
| user2_id | UUID | FK → users(id), NOT NULL | Second user |
| compatibility_score | INTEGER | | Cached compatibility (0-100) |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'ACTIVE' | ACTIVE / PAUSED / ENDED |
| introduction_request_id | UUID | FK → introduction_requests(id) | Source introduction |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Connection established |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last status change |

**Constraint:** user1_id ≠ user2_id; user1_id < user2_id (canonical ordering)

**Cardinality:** Users 1 ──► N connections ◄── N Users

---

### 11. compatibility_scores

Cached compatibility calculations between two users with full score breakdown.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| user1_id | UUID | FK → users(id), NOT NULL | First user |
| user2_id | UUID | FK → users(id), NOT NULL | Second user |
| total_score | INTEGER | NOT NULL | Overall score (0-100) |
| intention_score | INTEGER | | Intention component (0-25) |
| geography_score | INTEGER | | Geography component (0-10) |
| interest_score | INTEGER | | Interest component (0-15) |
| lifestyle_score | INTEGER | | Lifestyle component (0-15) |
| language_score | INTEGER | | Language component (0-10) |
| distance_score | INTEGER | | Distance component (0-5) |
| other_score | INTEGER | | Other component (0-20) |
| reasons | JSONB | | Array of human-readable match reasons |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Calculation timestamp |

**Constraint:** user1_id < user2_id (canonical ordering to prevent duplicates)

**Cardinality:** Users 1 ──► N compatibility_scores ◄── N Users

---

### 12. moments

Social content posts (photos, text, shared experiences).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| author_id | UUID | FK → users(id), NOT NULL | Post author |
| caption | TEXT | | Post caption |
| image_url | VARCHAR(500) | | Image URL |
| category | VARCHAR(30) | | TRAVEL / FOOD / CULTURE / FITNESS / DAILY / EVENT |
| visibility | VARCHAR(20) | DEFAULT 'PUBLIC' | PUBLIC / CONNECTIONS_ONLY |
| likes_count | INTEGER | DEFAULT 0 | Denormalized like count |
| comments_count | INTEGER | DEFAULT 0 | Denormalized comment count |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Post timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last edit timestamp |

**Cardinality:** Users 1 ──► N moments

---

### 13. comments

Comments on moments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| moment_id | UUID | FK → moments(id), NOT NULL | Parent moment |
| user_id | UUID | FK → users(id), NOT NULL | Comment author |
| content | TEXT | NOT NULL | Comment text |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Comment timestamp |

**Cardinality:** Moments 1 ──► N comments; Users 1 ──► N comments

---

### 14. reactions

Reactions (likes, loves, etc.) on moments.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| moment_id | UUID | FK → moments(id), NOT NULL | Parent moment |
| user_id | UUID | FK → users(id), NOT NULL | Who reacted |
| type | VARCHAR(20) | DEFAULT 'LIKE' | LIKE / LOVE / CELEBRATE / SUPPORT |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Reaction timestamp |

**Constraint:** UNIQUE(moment_id, user_id) — one reaction per user per moment

**Cardinality:** Moments 1 ──► N reactions; Users 1 ──► N reactions

---

### 15. experiences

Experience marketplace listings (wellness, cultural, travel, events).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| provider_id | UUID | FK → users(id), NOT NULL | Experience provider |
| title | VARCHAR(200) | NOT NULL | Experience title |
| description | TEXT | NOT NULL | Full description |
| category | VARCHAR(30) | NOT NULL | WELLNESS / CULTURAL / TRAVEL / EVENT / DINING / ADVENTURE |
| price | DECIMAL(10,2) | NOT NULL | Price in platform currency |
| currency | VARCHAR(3) | DEFAULT 'USD' | ISO 4217 currency code |
| duration | VARCHAR(50) | | Duration string (e.g., "2 hours", "Full day") |
| location | VARCHAR(200) | | Physical location or "Online" |
| latitude | DOUBLE PRECISION | | Location latitude |
| longitude | DOUBLE PRECISION | | Location longitude |
| image_url | VARCHAR(500) | | Cover image URL |
| status | VARCHAR(20) | DEFAULT 'ACTIVE' | ACTIVE / INACTIVE / PENDING_REVIEW |
| avg_rating | DECIMAL(3,2) | DEFAULT 0.00 | Denormalized average rating |
| review_count | INTEGER | DEFAULT 0 | Denormalized review count |
| max_participants | INTEGER | | Maximum participants per slot |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Listing creation |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update |

**Cardinality:** Users 1 ──► N experiences

---

### 16. availability

Weekly recurring time slots for experiences.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| experience_id | UUID | FK → experiences(id), NOT NULL | Parent experience |
| day_of_week | VARCHAR(10) | NOT NULL | MONDAY / TUESDAY / ... / SUNDAY |
| start_time | TIME | NOT NULL | Slot start time |
| end_time | TIME | NOT NULL | Slot end time |
| is_active | BOOLEAN | DEFAULT true | Whether slot is bookable |

**Constraint:** end_time > start_time

**Cardinality:** Experiences 1 ──► N availability

---

### 17. bookings

User bookings for experiences.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| experience_id | UUID | FK → experiences(id), NOT NULL | Booked experience |
| user_id | UUID | FK → users(id), NOT NULL | Booking user |
| availability_id | UUID | FK → availability(id) | Booked time slot |
| booking_date | DATE | NOT NULL | Date of booking |
| start_time | TIME | NOT NULL | Booked start time |
| end_time | TIME | NOT NULL | Booked end time |
| participants | INTEGER | DEFAULT 1 | Number of participants |
| status | VARCHAR(20) | DEFAULT 'PENDING' | PENDING / CONFIRMED / COMPLETED / CANCELLED / REFUNDED |
| notes | TEXT | | Special requests or notes |
| total_amount | DECIMAL(10,2) | NOT NULL | Total amount charged |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Booking creation |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update |

**Cardinality:** Experiences 1 ──► N bookings; Users 1 ──► N bookings; Availability 1 ──► N bookings

---

### 18. payments

Payment records linked to bookings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| booking_id | UUID | FK → bookings(id), NOT NULL | Associated booking |
| amount | DECIMAL(10,2) | NOT NULL | Payment amount |
| currency | VARCHAR(3) | DEFAULT 'USD' | ISO 4217 currency |
| method | VARCHAR(30) | NOT NULL | CARD / MOBILE_MONEY / BANK_TRANSFER / MOCK |
| status | VARCHAR(20) | DEFAULT 'PENDING' | PENDING / COMPLETED / FAILED / REFUNDED |
| reference | VARCHAR(100) | UNIQUE | External payment reference |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Payment timestamp |

**Cardinality:** Bookings 1 ──► N payments

---

### 19. reviews

User reviews for experiences after a completed booking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| experience_id | UUID | FK → experiences(id), NOT NULL | Reviewed experience |
| booking_id | UUID | FK → bookings(id), UNIQUE, NOT NULL | One review per booking |
| reviewer_id | UUID | FK → users(id), NOT NULL | Review author |
| rating | INTEGER | NOT NULL | Rating (1-5) |
| comment | TEXT | | Review text |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Review timestamp |

**Constraint:** rating BETWEEN 1 AND 5; UNIQUE(booking_id) — one review per booking

**Cardinality:** Experiences 1 ──► N reviews; Bookings 1 ──► 1 review; Users 1 ──► N reviews

---

### 20. reports

Abuse and safety reports filed by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| reporter_id | UUID | FK → users(id), NOT NULL | Who filed the report |
| reported_user_id | UUID | FK → users(id), NOT NULL | Who is reported |
| reason | VARCHAR(50) | NOT NULL | HARASSMENT / FAKE_PROFILE / INAPPROPRIATE_CONTENT / SCAM / OTHER |
| category | VARCHAR(30) | NOT NULL | LOW / MEDIUM / HIGH / CRITICAL |
| details | TEXT | | Additional details |
| status | VARCHAR(20) | DEFAULT 'PENDING' | PENDING / UNDER_REVIEW / RESOLVED / DISMISSED |
| admin_notes | TEXT | | Internal admin notes |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Report timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last status change |

**Cardinality:** Users 1 ──► N reports (as reporter); Users 1 ──► N reports (as reported)

---

### 21. blocks

User-to-user block records.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| blocker_id | UUID | FK → users(id), NOT NULL | Who blocks |
| blocked_id | UUID | FK → users(id), NOT NULL | Who is blocked |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Block timestamp |

**Constraint:** UNIQUE(blocker_id, blocked_id); blocker_id ≠ blocked_id

**Cardinality:** Users 1 ──► N blocks (as blocker); Users 1 ──► N blocks (as blocked)

---

### 22. notifications

In-app notifications for users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Primary key |
| user_id | UUID | FK → users(id), NOT NULL | Notification recipient |
| type | VARCHAR(30) | NOT NULL | INTRODUCTION / CONNECTION / BOOKING / REVIEW / SYSTEM / REPORT |
| title | VARCHAR(200) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification body |
| reference_type | VARCHAR(30) | | Entity type referenced |
| reference_id | UUID | | ID of referenced entity |
| is_read | BOOLEAN | DEFAULT false | Read status |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Notification timestamp |

**Cardinality:** Users 1 ──► N notifications

---

## Relationship Summary

| Relationship | Type | FK Column | From → To |
|-------------|------|-----------|-----------|
| users → profiles | 1:1 | profiles.user_id | users → profiles |
| profiles ↔ intentions | M:N | profile_intentions join | profiles → intentions |
| profiles ↔ interests | M:N | profile_interests join | profiles → interests |
| profiles ↔ languages | M:N | profile_languages join | profiles → languages |
| users → introduction_requests (sender) | 1:N | introduction_requests.sender_id | users → introduction_requests |
| users → introduction_requests (receiver) | 1:N | introduction_requests.receiver_id | users → introduction_requests |
| users → connections (user1) | 1:N | connections.user1_id | users → connections |
| users → connections (user2) | 1:N | connections.user2_id | users → connections |
| introduction_requests → connections | 1:0..1 | connections.introduction_request_id | introduction_requests → connections |
| users → compatibility_scores (user1) | 1:N | compatibility_scores.user1_id | users → compatibility_scores |
| users → compatibility_scores (user2) | 1:N | compatibility_scores.user2_id | users → compatibility_scores |
| users → moments | 1:N | moments.author_id | users → moments |
| moments → comments | 1:N | comments.moment_id | moments → comments |
| users → comments | 1:N | comments.user_id | users → comments |
| moments → reactions | 1:N | reactions.moment_id | moments → reactions |
| users → reactions | 1:N | reactions.user_id | users → reactions |
| users → experiences | 1:N | experiences.provider_id | users → experiences |
| experiences → availability | 1:N | availability.experience_id | experiences → availability |
| experiences → bookings | 1:N | bookings.experience_id | experiences → bookings |
| users → bookings | 1:N | bookings.user_id | users → bookings |
| availability → bookings | 1:N | bookings.availability_id | availability → bookings |
| bookings → payments | 1:N | payments.booking_id | bookings → payments |
| experiences → reviews | 1:N | reviews.experience_id | experiences → reviews |
| bookings → reviews | 1:0..1 | reviews.booking_id | bookings → reviews |
| users → reviews | 1:N | reviews.reviewer_id | users → reviews |
| users → reports (reporter) | 1:N | reports.reporter_id | users → reports |
| users → reports (reported) | 1:N | reports.reported_user_id | users → reports |
| users → blocks (blocker) | 1:N | blocks.blocker_id | users → blocks |
| users → blocks (blocked) | 1:N | blocks.blocked_id | users → blocks |
| users → notifications | 1:N | notifications.user_id | users → notifications |

---

## Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | idx_users_email | email | Login lookup |
| users | idx_users_role | role | Admin filtering |
| users | idx_users_status | status | Account filtering |
| profiles | idx_profiles_user_id | user_id | Profile lookup by user |
| profiles | idx_profiles_country | country | Geographic filtering |
| profiles | idx_profiles_gender | gender | Discovery filtering |
| profiles | idx_profiles_coords | latitude, longitude | Proximity queries |
| introduction_requests | idx_intro_sender | sender_id | Sent introductions |
| introduction_requests | idx_intro_receiver | receiver_id | Received introductions |
| introduction_requests | idx_intro_status | status | Status filtering |
| connections | idx_conn_user1 | user1_id | User connections |
| connections | idx_conn_user2 | user2_id | User connections |
| connections | idx_conn_status | status | Status filtering |
| compatibility_scores | idx_compat_user1 | user1_id | Score lookup |
| compatibility_scores | idx_compat_user2 | user2_id | Score lookup |
| compatibility_scores | idx_compat_total | total_score | Ranking |
| moments | idx_moments_author | author_id | Author's posts |
| moments | idx_moments_category | category | Category filtering |
| moments | idx_moments_created | created_at DESC | Chronological feed |
| comments | idx_comments_moment | moment_id | Comments per moment |
| reactions | idx_reactions_moment | moment_id | Reactions per moment |
| experiences | idx_exp_provider | provider_id | Provider's listings |
| experiences | idx_exp_category | category | Category filtering |
| experiences | idx_exp_status | status | Active listings |
| experiences | idx_exp_price | price | Price filtering |
| availability | idx_avail_experience | experience_id | Slots per experience |
| bookings | idx_bookings_user | user_id | User's bookings |
| bookings | idx_bookings_experience | experience_id | Experience bookings |
| bookings | idx_bookings_status | status | Status filtering |
| bookings | idx_bookings_date | booking_date | Date-based queries |
| payments | idx_payments_booking | booking_id | Payment per booking |
| payments | idx_payments_status | status | Payment status |
| reviews | idx_reviews_experience | experience_id | Reviews per experience |
| reviews | idx_reviews_reviewer | reviewer_id | User's reviews |
| reports | idx_reports_reporter | reporter_id | Reports filed |
| reports | idx_reports_reported | reported_user_id | Reports received |
| reports | idx_reports_status | status | Admin queue |
| blocks | idx_blocks_blocker | blocker_id | Who blocked |
| blocks | idx_blocks_blocked | blocked_id | Who is blocked |
| notifications | idx_notif_user | user_id | User notifications |
| notifications | idx_notif_read | is_read | Unread filtering |

---

## Cardinality Diagram

```
                    ┌──────────┐
                    │  users   │
                    └────┬─────┘
                         │
            ┌────────────┼──────────────────────────────┐
            │            │                              │
            │ 1:1       │ 1:N                          │ 1:N
            ▼            ▼                              ▼
      ┌──────────┐ ┌───────────┐               ┌────────────┐
      │ profiles │ │  moments  │               │ experiences│
      └────┬─────┘ └─────┬─────┘               └──────┬─────┘
           │              │                           │
     M:N   │        1:N   │                     1:N   │
   ┌───┴───┴───┐     ┌───┴───┐               ┌───┴───┐
   │  join     │     │       │               │       │
   │  tables   │     ▼       ▼               ▼       ▼
   │           │ ┌────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐
   └───────────┘ │comments│ │ reactions│ │ avail. │ │ reviews │
                 └────────┘ └──────────┘ └────┬───┘ └─────────┘
                                              │
                                         1:N  │
                                              ▼
                                         ┌────────┐
                                         │bookings│──► payments
                                         └────────┘
```
