# ROAD.NET — HUMAN CONNECTION BEYOND BORDERS
## Full-Stack MVP Development Master Prompt

You are a **senior full-stack software architect and UI/UX engineer**. Your task is to design and build a polished, functional MVP for **ROAD.NET — Human Connection Beyond Borders**, an innovative adult human-connection platform.

This is an **internship software-development assessment and live presentation project**, so do not create a basic demo or a generic dating website.

The application must demonstrate strong:

- Product thinking
- UI/UX
- React frontend development
- Spring Boot backend development
- PostgreSQL database architecture
- REST API design
- Authentication and authorization
- Matching/compatibility logic
- Security and privacy
- Innovation
- Clean architecture
- Professional documentation

The goal is to make the application look and behave like a serious startup MVP.

---

# 1. CORE PRODUCT IDEA

ROAD.NET is NOT a Tinder clone.

Do NOT build a primary:

> Like → Dislike → Next

experience.

Instead, the product flow should be:

> Discover → Understand → Compatibility → Introduction → Mutual Acceptance → Connection → Shared Experience

The platform helps adults discover meaningful:

- Relationships
- Marriage opportunities
- Serious relationships
- Friendships
- Companionship
- International connections
- Cultural connections
- Shared experiences

The core product philosophy is:

> **INTENTION + COMPATIBILITY + TRUST + EXPERIENCE + HUMAN CONNECTION**

The application must be strictly **18+**.

Do not implement explicit sexual-service functionality. Experience/service functionality must use legitimate categories such as:

- Wellness
- Massage
- Travel
- Cultural experiences
- Events
- Social activities
- Couple activities
- Companionship

---

# 2. REQUIRED TECHNOLOGY STACK

Use EXACTLY this architecture:

## Frontend

- React.js
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod or equivalent validation
- Lucide React icons
- Recharts for admin analytics where appropriate

## Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT authentication
- Bean Validation
- BCrypt password hashing
- PostgreSQL driver
- Lombok
- Maven

## Database

- PostgreSQL
- Hibernate/JPA
- Proper relational database design
- Foreign keys
- Constraints
- Indexes
- Timestamps
- Enum handling where appropriate

## API

RESTful JSON API.

Frontend and backend must be completely separated.

Example:

Frontend:

http://localhost:5173

Backend:

http://localhost:8080

PostgreSQL:

localhost:5432

---

# 3. DEVELOPMENT PRINCIPLE

Do not build everything as fake frontend data.

The MVP must be genuinely functional.

A user should be able to:

1. Register
2. Login
3. Complete profile
4. Select intentions
5. Select preferences
6. Discover users
7. Search/filter users
8. See compatibility scores
9. See why they match
10. Send an introduction
11. Accept/decline an introduction
12. Create a connection
13. Create moments
14. Comment/react to moments
15. Browse experiences
16. View availability
17. Create a booking
18. Leave a review
19. Report/block users
20. Receive notifications

The backend must persist these actions in PostgreSQL.

---

# 4. DESIGN DIRECTION

Create a premium, modern, global social platform.

The interface should feel like a combination of:

- Modern social network
- Premium relationship platform
- International community platform
- Experience marketplace

Do NOT make it look like a cheap dating template.

## Visual style

Use:

- Clean white/light backgrounds
- Deep dark typography
- Sophisticated accent color
- Large modern typography
- Rounded cards
- Subtle shadows
- Elegant gradients used sparingly
- High-quality profile imagery using safe placeholder images
- Excellent spacing
- Responsive layouts
- Smooth micro-interactions
- Skeleton loading
- Toast notifications
- Empty states
- Error states
- Confirmation dialogs

Make the UI impressive during a live presentation.

---

# 5. LANDING PAGE

Create an exceptional landing page.

Hero section:

ROAD.NET

> Human Connection Beyond Borders

Supporting text:

> Discover meaningful people, experiences and connections across communities, countries and continents.

Primary CTA:

> Start Your Journey

Secondary CTA:

> Explore ROAD.NET

Add a visual representation of global connection.

Sections:

1. How ROAD.NET Works
2. Discover by Intention
3. Global Connections
4. Compatibility
5. Trust & Safety
6. Moments
7. Experiences
8. Why ROAD.NET is different
9. Final CTA
10. Footer

The landing page should immediately communicate that ROAD.NET is different from ordinary dating applications.

---

# 6. AGE GATE

ROAD.NET is strictly 18+.

Before registration:

Display:

> ROAD.NET is an 18+ platform.

Require the user to confirm that they are 18 or older.

The backend must ALSO validate date of birth.

Never rely only on frontend validation.

---

# 7. REGISTRATION

Create a beautiful multi-step registration flow.

## Step 1 — Account purpose

Question:

> What brings you to ROAD.NET?

Options:

- Find a meaningful relationship
- Find a marriage partner
- Meet new people
- Make international connections
- Discover experiences
- Offer experiences/services

## Step 2 — Account type

Options:

- Individual
- Experience / Service Provider
- Organization / Agency

## Step 3 — Basic information

Fields:

- Display name
- Date of birth
- Gender
- Country
- Region/city
- Languages
- Marital status
- Profession
- Biography

## Step 4 — Intentions

Allow multiple selections:

- Marriage
- Serious relationship
- Dating
- Friendship
- Companionship
- Long-distance relationship
- Diaspora connection
- Cultural exchange
- Shared experiences

## Step 5 — Interests

Examples:

- Travel
- Technology
- Sports
- Music
- Food
- Art
- Business
- Fitness
- Culture
- Education
- Photography
- Movies
- Nature

## Step 6 — Geographic preference

Options:

- Local
- National
- Regional
- Diaspora
- Cross-border
- Intercontinental
- Global

## Step 7 — Profile photo

Allow image upload.

For the MVP, implement safe image-upload handling and clearly separate the storage abstraction so cloud storage can be added later.

---

# 8. AUTHENTICATION

Implement real authentication.

Backend:

- Register
- Login
- JWT
- BCrypt
- Role-based authorization
- Protected endpoints
- Token validation
- Account status checking

Roles:

- USER
- PROVIDER
- AGENCY
- ADMIN

Never store plain-text passwords.

Return appropriate HTTP status codes.

Examples:

201 Created
200 OK
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error

---

# 9. USER DASHBOARD

After login, show a premium dashboard.

Navigation:

- Home
- Discover
- Connections
- Moments
- Experiences
- Bookings
- Notifications
- Profile
- Settings

Dashboard should show:

> Welcome back, [Name]

Cards:

- Compatible people
- Pending introductions
- Active connections
- Upcoming experiences
- Notifications

Add a global search/discovery entry point.

---

# 10. PROFILE SYSTEM

Profile page must display:

- Profile photo
- Name
- Age
- Country
- Region
- Verification status
- Biography
- Intentions
- Interests
- Languages
- Lifestyle
- Location visibility
- Compatibility when viewing another user

Do NOT expose:

- Exact home address
- Private phone number
- Payment credentials
- Sensitive account information

Use general location only.

---

# 11. DISCOVERY ENGINE

Create a sophisticated discovery page.

Do NOT use swipe cards as the primary interface.

Use profile cards/list/grid.

Each recommendation must show:

- Profile photo
- Name
- Age
- Country
- Main intentions
- Interests
- Verification badge
- Compatibility percentage

Example:

> 87% Compatible

Then:

> Why you may connect

Example:

> You both selected serious relationships, speak English, enjoy travel, and are open to long-distance connections.

Buttons:

- View Profile
- Save
- Introduce Yourself

---

# 12. COMPATIBILITY ENGINE

This is one of the most important features.

Create an explainable deterministic compatibility algorithm.

Do NOT claim:

> "Our AI knows who you will fall in love with."

Instead say:

> "Your compatibility score shows how closely your stated preferences and interests align."

Calculate a score from 0–100.

Recommended MVP weighting:

### Relationship intention — 25%

Compare matching intentions.

### Geography — 10%

Local/national/regional/diaspora/cross-border/global compatibility.

### Interests — 15%

Calculate overlap.

### Lifestyle — 15%

Compare compatible lifestyle preferences.

### Languages — 10%

Compare shared languages.

### Long-distance preference — 5%

Check whether preferences align.

### Other preferences — 20%

Age range, gender preference, marital preference, cultural interests, etc.

Return:

```json
{
  "score": 87,
  "breakdown": {
    "intentions": 25,
    "geography": 9,
    "interests": 13,
    "lifestyle": 12,
    "languages": 10,
    "distance": 5,
    "other": 13
  },
  "reasons": [
    "You share serious relationship intentions",
    "You both speak English",
    "You both enjoy travelling",
    "You are both open to international connections"
  ]
}
```

Make the calculation transparent and explainable.

---

# 13. SEARCH AND FILTERS

Create an excellent search interface.

Filters:

- Country
- Region
- Age range
- Gender
- Relationship intention
- Language
- Interests
- Diaspora
- Distance
- Long-distance preference
- Verified status

Allow users to combine filters.

Backend must support filtering efficiently.

---

# 14. INTRODUCTION SYSTEM

This is one of ROAD.NET's signature features.

Users must NOT immediately receive someone's private contact details.

Instead:

Button:

> Introduce Yourself

Open modal:

> Send an introduction

Allow a short personalized message.

Example:

> "Hello, I noticed that we both selected serious relationships and enjoy international travel. I'd like to get to know you."

Recipient sees:

- Accept
- Maybe Later
- Decline

Only after acceptance does the connection become active.

---

# 15. CONNECTION SYSTEM

When an introduction is accepted:

Create a Connection.

Generate a unique Connection ID.

Example:

> RD-2026-8F24

Connection page should display:

- Connection ID
- Both users
- Date connected
- Shared interests
- Compatibility score
- Why you matched
- Shared moments
- Connection status

Statuses:

- PENDING
- ACCEPTED
- DECLINED
- BLOCKED
- CLOSED

---

# 16. MOMENTS

Create a social discovery feature called:

> MOMENTS

Users can share appropriate content about:

- Travel
- Food
- Hobbies
- Culture
- Celebrations
- Achievements
- Places
- Activities
- Interests

A moment contains:

- Author
- Caption
- Image
- Date
- Likes/reactions
- Comments

Actions:

- Like
- Comment
- React
- View profile
- Introduce yourself

Create a beautiful feed.

---

# 17. EXPERIENCE MARKETPLACE

Create a separate:

> Experiences

section.

Categories:

- Wellness
- Massage
- Travel
- Cultural
- Events
- Social activities
- Couple activities
- Local experiences

Provider can create:

- Title
- Description
- Category
- Photos
- Location
- Price
- Duration
- Availability
- Booking rules

Example:

> Kigali Cultural Experience

Price:

> RWF 25,000

Duration:

> 3 hours

---

# 18. AVAILABILITY

Providers can configure:

- Working days
- Working hours
- Available slots
- Duration
- Price

Once a booking is confirmed:

The selected slot becomes unavailable.

Prevent double booking at the backend/database level.

---

# 19. BOOKING SYSTEM

Booking flow:

Discover Experience

↓

View Details

↓

Select Date

↓

Select Available Time

↓

Review Booking

↓

Mock Payment

↓

Provider Confirmation

↓

Booking Confirmed

Use a mock payment gateway for the internship MVP.

Clearly label it:

> Demo Payment

Do NOT pretend that a real payment was processed.

Architecture should allow future integration with:

- Mobile Money
- Cards
- Bank payments

---

# 20. REVIEWS

After a completed experience:

Allow:

- 1–5 star rating
- Written review

Only allow reviews for legitimate completed bookings.

Show reviews on provider/service pages.

---

# 21. TRUST & SAFETY

Create a visible:

> Safety Center

Features:

- Report User
- Block User
- Report Content
- Unmatch
- Safety Information
- Contact Support

Report categories:

- Harassment
- Scam
- Fake profile
- Inappropriate content
- Suspicious behavior
- Other

Store reports in PostgreSQL.

---

# 22. PRIVACY SETTINGS

Create a professional Settings → Privacy page.

Controls:

- Profile visibility
- Search visibility
- Location visibility
- Who can send introductions
- Moment visibility
- International profile visibility

Use toggles and clear explanations.

---

# 23. VERIFICATION CONCEPT

Implement a simple MVP verification system.

Statuses:

- UNVERIFIED
- EMAIL_VERIFIED
- PHONE_VERIFIED
- VERIFIED

Display badges appropriately.

For the internship MVP, the verification process can be simulated, but the architecture must allow real verification services later.

---

# 24. NOTIFICATIONS

Create notification functionality.

Notify users about:

- Introduction requests
- Accepted introductions
- Compatible connections
- Comments
- Moment reactions
- Bookings
- Payment status
- Verification status
- Safety alerts

Create:

- Notification bell
- Unread count
- Notification dropdown
- Notification page
- Mark as read
- Mark all as read

---

# 25. ADMIN DASHBOARD

Create a completely separate admin interface.

Admin sidebar:

- Dashboard
- Users
- Profiles
- Reports
- Providers
- Experiences
- Bookings
- Payments
- Analytics
- Settings

Dashboard statistics:

- Total users
- Active users
- Verified users
- Connections
- Introductions
- Bookings
- Reports
- Experiences

Add charts for:

- Users by country
- Registration trends
- Connections
- Bookings

User management:

- Search
- Filter
- View
- Suspend
- Activate
- Verify

Report management:

- View report
- Reporter
- Reported user
- Reason
- Status
- Resolve
- Reject

---

# 26. DATABASE ARCHITECTURE

Design a proper normalized PostgreSQL schema.

Minimum entities:

- users
- profiles
- preferences
- countries
- regions
- languages
- interests
- user_languages
- user_interests
- intentions
- user_intentions
- matches
- compatibility_scores
- introduction_requests
- connections
- moments
- comments
- reactions
- providers
- services
- availability
- bookings
- payments
- reviews
- reports
- blocks
- notifications
- subscriptions
- admin_users

Use:

- UUID or BIGINT primary keys
- Foreign keys
- Unique constraints
- Indexes
- Created timestamps
- Updated timestamps
- Appropriate cascading rules

Generate:

1. ER diagram
2. SQL schema
3. JPA entities
4. Repository layer

---

# 27. SPRING BOOT ARCHITECTURE

Use a clean layered architecture:

```text
controller/
service/
repository/
entity/
dto/
mapper/
security/
exception/
config/
util/
```

Do not put business logic inside controllers.

Use:

Controller
→ Service
→ Repository
→ Database

Use DTOs rather than exposing JPA entities directly.

Create global exception handling.

Use:

`@ControllerAdvice`

for consistent API errors.

---

# 28. REST API

Implement clean endpoints.

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

Profile:

```text
GET /api/profile
PUT /api/profile
POST /api/profile/photo
```

Discovery:

```text
GET /api/discover
GET /api/discover/{id}
GET /api/search
```

Compatibility:

```text
GET /api/compatibility/{userId}
```

Introductions:

```text
POST /api/introductions
GET /api/introductions/received
GET /api/introductions/sent
PUT /api/introductions/{id}/accept
PUT /api/introductions/{id}/decline
```

Connections:

```text
GET /api/connections
GET /api/connections/{id}
```

Moments:

```text
GET /api/moments
POST /api/moments
POST /api/moments/{id}/comments
POST /api/moments/{id}/reactions
```

Experiences:

```text
GET /api/experiences
POST /api/experiences
GET /api/experiences/{id}
```

Bookings:

```text
POST /api/bookings
GET /api/bookings
GET /api/bookings/{id}
PUT /api/bookings/{id}/confirm
PUT /api/bookings/{id}/cancel
```

Safety:

```text
POST /api/reports
POST /api/blocks
```

Notifications:

```text
GET /api/notifications
PUT /api/notifications/{id}/read
```

Admin:

```text
GET /api/admin/dashboard
GET /api/admin/users
PUT /api/admin/users/{id}/suspend
GET /api/admin/reports
PUT /api/admin/reports/{id}/resolve
```

---

# 29. SECURITY

Security is heavily evaluated.

Implement:

- BCrypt
- JWT
- Role-based authorization
- Request validation
- DTO validation
- SQL injection protection through JPA
- CORS configuration
- Secure authentication
- Authorization checks
- Rate limiting concept
- Secure upload validation
- File type validation
- File size limits
- Privacy controls
- Access control
- Global exception handling

Never return passwords.

Never expose sensitive user information.

Never trust frontend authorization.

Backend must independently enforce permissions.

---

# 30. INNOVATION — MAKE ROAD.NET STAND OUT

The internship requires at least three mechanisms that distinguish ROAD.NET from ordinary dating apps.

Implement these three prominently:

## INNOVATION 1 — WHY WE MATCHED

Instead of only showing:

> 87% Compatible

show:

> Why you may connect

Then explain exactly which preferences produced the score.

This demonstrates explainable matching.

---

## INNOVATION 2 — CONNECTION JOURNEY

Create a visible progress journey:

```text
DISCOVERED
   ↓
INTRODUCTION
   ↓
ACCEPTED
   ↓
CONNECTION
   ↓
SHARED EXPERIENCE
```

Users can see the relationship journey progressing.

---

## INNOVATION 3 — DIASPORA BRIDGE

Allow users to specify:

> Country of origin

and:

> Current country

Example:

> Origin: Rwanda
> Current location: Canada

Then allow discovery based on diaspora connections.

This makes ROAD.NET genuinely global rather than simply another local matching platform.

---

# 31. OPTIONAL FOURTH INNOVATION

Add:

## CONNECTION CIRCLE

A user can designate trusted people or communities that may facilitate appropriate introductions.

For MVP, implement this as a conceptual/profile feature rather than a complicated workflow.

---

# 32. RESPONSIVE DESIGN

The application must work beautifully on:

- Desktop
- Laptop
- Tablet
- Mobile

Prioritize mobile responsiveness.

Do not create separate broken mobile pages.

Use responsive Tailwind layouts.

---

# 33. FRONTEND COMPONENT ARCHITECTURE

Create reusable components.

Example:

```text
components/
  Navbar
  Sidebar
  ProfileCard
  CompatibilityCard
  CompatibilityBreakdown
  IntroductionModal
  ConnectionCard
  MomentCard
  ExperienceCard
  BookingModal
  NotificationDropdown
  SearchFilters
  VerificationBadge
  SafetyModal
  EmptyState
  LoadingState
  ErrorState
  ConfirmDialog
```

Avoid giant components.

Use reusable hooks:

```text
useAuth()
useProfile()
useDiscover()
useNotifications()
useConnections()
useBookings()
```

---

# 34. DEMO DATA

The MVP MUST include realistic seed/demo data.

Create at least:

- 10–20 demo users
- Multiple countries
- Multiple intentions
- Multiple interests
- Different compatibility scores
- Several moments
- Several comments
- Several experiences
- Provider accounts
- Availability slots
- Sample bookings
- Sample notifications
- Sample reports

Include Rwanda prominently but make the dataset global.

Example countries:

- Rwanda
- Kenya
- Uganda
- Tanzania
- Nigeria
- South Africa
- Canada
- United Kingdom
- France
- Germany
- United States
- Japan

Do NOT use real people's private information.

Use fictional demo profiles.

---

# 35. PRESENTATION MODE

The application must be easy to demonstrate.

Create a polished demo account.

Example:

```text
Email:
demo@roadnet.app

Password:
Demo@12345
```

Also create an admin demo account.

The README must explain these are demo credentials.

Create seed data so the following demonstration works immediately:

```text
Login
↓
Dashboard
↓
Discover
↓
Open compatible profile
↓
Show 87% compatibility
↓
Show "Why we matched"
↓
Send introduction
↓
Switch/demo recipient
↓
Accept
↓
Connection created
↓
Open Moments
↓
Create/view moment
↓
Open Experiences
↓
Select experience
↓
Choose available slot
↓
Mock payment
↓
Booking confirmed
↓
Admin dashboard
↓
Show user/report/booking statistics
```

This flow should be extremely smooth for a live presentation.

---

# 36. LOADING, ERROR AND EMPTY STATES

Do not leave blank screens.

Implement:

- Loading skeletons
- API error messages
- Empty discovery state
- Empty connections state
- Empty notifications state
- Empty bookings state
- Empty moments state
- Form validation messages
- Success toasts
- Confirmation dialogs

---

# 37. API DOCUMENTATION

Configure Swagger/OpenAPI.

The backend should expose interactive API documentation.

Document:

- Authentication
- Request body
- Response body
- HTTP status
- Authorization requirements

---

# 38. README

Create an excellent README containing:

1. Project overview
2. Problem statement
3. Product vision
4. Features
5. Innovation
6. Architecture
7. Tech stack
8. Folder structure
9. Database architecture
10. ER diagram
11. Matching algorithm
12. API documentation
13. Security
14. Installation
15. Environment variables
16. Running PostgreSQL
17. Running Spring Boot
18. Running React
19. Demo accounts
20. Deployment strategy
21. Known limitations
22. Future roadmap

---

# 39. ENVIRONMENT CONFIGURATION

Never hard-code secrets.

Frontend:

```text
VITE_API_URL=
```

Backend:

```text
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=
JWT_SECRET=
```

Use `.env.example`.

Never commit real credentials.

---

# 40. DEPLOYMENT-READY ARCHITECTURE

Prepare the project for:

Frontend:

Vercel / Netlify

Backend:

Render / Railway / AWS / similar

Database:

PostgreSQL hosting

Clearly document deployment architecture.

---

# 41. FUTURE ROADMAP

Document future phases:

## Phase 2

- Mobile application
- Advanced matching
- Video introductions
- Translation
- Better verification
- International communities

## Phase 3

- AI-assisted recommendations
- AI translation
- Recommendation engine
- Events
- Matchmaking communities
- Diaspora programs

## Phase 4

- International payments
- Verified experience marketplace
- Professional matchmaking
- Cross-border travel integration

AI must assist discovery and recommendations.

Never claim AI can predict love.

---

# 42. IMPORTANT PRODUCT SAFETY RULES

ROAD.NET is an 18+ platform.

Do not implement:

- Explicit sexual services
- Sexual-service marketplace
- Illegal services
- Exploitative services
- Unmoderated private contact exposure

Experience marketplace examples must remain legitimate and safe.

Implement reporting, blocking and privacy controls.

---

# 43. CODE QUALITY REQUIREMENTS

Write production-quality code.

Do NOT:

- Put everything in one file
- Use fake APIs when backend functionality is required
- Hard-code user data throughout React
- Put database logic in controllers
- Store plaintext passwords
- Expose JPA entities unnecessarily
- Ignore validation
- Ignore authorization
- Use random unnecessary dependencies
- Create dead buttons
- Create fake functionality without clearly labeling it as demo functionality

Every visible button should either work or clearly indicate that it is planned/future functionality.

---

# 44. DEVELOPMENT ORDER

Build the project in this exact order:

### STEP 1
Project architecture

### STEP 2
PostgreSQL database schema

### STEP 3
Spring Boot configuration

### STEP 4
Entities and relationships

### STEP 5
Repositories

### STEP 6
DTOs

### STEP 7
Services

### STEP 8
JWT authentication

### STEP 9
Controllers/API

### STEP 10
Seed/demo data

### STEP 11
React application

### STEP 12
Authentication screens

### STEP 13
Profile system

### STEP 14
Discovery

### STEP 15
Compatibility engine

### STEP 16
Introduction system

### STEP 17
Connections

### STEP 18
Moments

### STEP 19
Experience marketplace

### STEP 20
Bookings

### STEP 21
Safety

### STEP 22
Notifications

### STEP 23
Admin dashboard

### STEP 24
Swagger/OpenAPI

### STEP 25
Testing

### STEP 26
README

### STEP 27
Final UI polish

---

# 45. TESTING

Create tests for important backend functionality.

At minimum test:

- Registration
- Login
- Password hashing
- JWT authentication
- Authorization
- Profile creation
- Compatibility calculation
- Introduction creation
- Introduction acceptance
- Connection creation
- Booking creation
- Double-booking prevention
- Report creation

Also test important frontend flows.

---

# 46. FINAL QUALITY CHECK

Before declaring the application complete, verify:

[ ] React frontend works
[ ] Spring Boot backend works
[ ] PostgreSQL works
[ ] Registration works
[ ] Login works
[ ] JWT works
[ ] Profile works
[ ] Intentions work
[ ] Preferences work
[ ] Discovery works
[ ] Search works
[ ] Compatibility works
[ ] Why-we-match works
[ ] Introduction works
[ ] Accept/decline works
[ ] Connection works
[ ] Moments work
[ ] Comments/reactions work
[ ] Experiences work
[ ] Availability works
[ ] Booking works
[ ] Mock payment works
[ ] Reviews work
[ ] Reports work
[ ] Blocking works
[ ] Notifications work
[ ] Verification concept works
[ ] Admin dashboard works
[ ] Admin user management works
[ ] Admin report management works
[ ] Responsive design works
[ ] Error states work
[ ] Loading states work
[ ] Demo data exists
[ ] Swagger works
[ ] README exists
[ ] ER diagram exists
[ ] Security controls exist
[ ] No sensitive information is exposed

---

# 47. MOST IMPORTANT INSTRUCTION

Do not optimize for having the largest number of features.

Optimize for:

> **A SMALL, POLISHED, REAL, PRESENTABLE MVP.**

Every implemented feature must feel complete.

The evaluator should be able to look at the application and immediately understand:

1. What problem ROAD.NET solves
2. Why it is different from dating apps
3. How compatibility works
4. How trust is built
5. How users progressively connect
6. How the marketplace works
7. How the database is structured
8. How the backend API works
9. How security is handled
10. Why the architecture can scale

The final product should feel like a serious startup prototype built by a professional development team.

---

# 48. FINAL OUTPUT REQUIREMENT

When development is complete, provide:

1. Complete project source code
2. React frontend
3. Spring Boot backend
4. PostgreSQL schema
5. Seed/demo data
6. ER diagram
7. Swagger API documentation
8. README
9. `.env.example`
10. Testing
11. Demo credentials
12. Deployment instructions
13. Architecture explanation
14. Compatibility algorithm explanation
15. Known limitations
16. Future roadmap

Most importantly:

**Make the MVP fully demonstrable from registration through connection and experience booking.**

ROAD.NET should not feel like another dating application.

It should feel like a new category:

> **A trusted global platform for intentional human connection.**

Build it around:

> **INTENTION + COMPATIBILITY + TRUST + EXPERIENCE + HUMAN CONNECTION.**