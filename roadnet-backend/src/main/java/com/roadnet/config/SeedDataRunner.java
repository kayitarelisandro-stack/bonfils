package com.roadnet.config;

import com.roadnet.entity.*;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final LanguageRepository languageRepository;
    private final InterestRepository interestRepository;
    private final IntentionRepository intentionRepository;
    private final ConnectionRepository connectionRepository;
    private final CompatibilityScoreRepository compatibilityScoreRepository;
    private final MomentRepository momentRepository;
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;
    private final ExperienceRepository experienceRepository;
    private final AvailabilityRepository availabilityRepository;
    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final NotificationRepository notificationRepository;
    private final IntroductionRequestRepository introductionRequestRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        log.info("Seeding database...");

        List<Language> languages = seedLanguages();
        List<Interest> interests = seedInterests();
        List<Intention> intentions = seedIntentions();

        User admin = createUser("admin@roadnet.app", "Admin@12345", "Admin", UserRole.ADMIN, AccountStatus.ACTIVE, VerificationStatus.VERIFIED);
        User demo = createUser("demo@roadnet.app", "Demo@12345", "Amara", UserRole.USER, AccountStatus.ACTIVE, VerificationStatus.VERIFIED);

        List<User> demoUsers = createDemoUsers();

        createProfile(admin, LocalDate.of(1985, 3, 15), Gender.MALE, "Rwanda", "Rwanda", "Kigali",
                "Platform administrator", "Rwanda", "engineering",
                Set.of(languages.get(0), languages.get(1)), Set.of(interests.get(0), interests.get(5)),
                Set.of(intentions.get(3)), MaritalStatus.MARRIED, AccountPurpose.RELATIONSHIP,
                GeographicPreference.LOCAL, 1.9403, 29.8739);

        createProfile(demo, LocalDate.of(1995, 7, 22), Gender.FEMALE, "Rwanda", "Rwanda", "Kigali",
                "Hi! I'm Amara from Rwanda. I love connecting with people from different cultures and sharing experiences.",
                null, "Marketing",
                Set.of(languages.get(0), languages.get(1), languages.get(3)),
                Set.of(interests.get(0), interests.get(1), interests.get(4), interests.get(8)),
                Set.of(intentions.get(0), intentions.get(2)),
                MaritalStatus.SINGLE, AccountPurpose.INTERNATIONAL_CONNECTIONS,
                GeographicPreference.GLOBAL, 1.9403, 29.8739);

        String[] countries = {"Kenya", "Uganda", "Nigeria", "South Africa", "Canada", "United Kingdom", "France", "Germany", "United States", "Japan"};
        String[] countryCoords = {
                "-1.2921,36.8219", "1.3733,32.2903", "6.5244,3.3792",
                "-33.9249,18.4241", "43.6532,-79.3832", "51.5074,-0.1278",
                "48.8566,2.3522", "52.5200,13.4050", "38.9072,-77.0369", "35.6762,139.6503"
        };
        Gender[] genders = {Gender.MALE, Gender.FEMALE, Gender.NON_BINARY, Gender.PREFER_NOT_TO_SAY, Gender.MALE, Gender.FEMALE, Gender.MALE, Gender.FEMALE, Gender.MALE, Gender.FEMALE, Gender.MALE, Gender.FEMALE, Gender.NON_BINARY, Gender.PREFER_NOT_TO_SAY, Gender.MALE};
        String[] names = {"Kwame", "Fatima", "Olumide", "Zuri", "Jean-Pierre", "Hans", "Yuki", "Emily", "Marcus", "Aisha", "Chen", "Liam", "Priya", "Diego", "Sophie"};
        String[] bios = {
                "Software engineer from Nairobi, passionate about tech and travel",
                "Artist and cultural enthusiast from Kampala",
                "Lagos-based entrepreneur who loves meeting new people",
                "Cape Town photographer capturing life's moments",
                "Toronto-based wellness advocate and yoga instructor",
                "London-based foodie exploring world cuisines",
                "Parisian artist looking for cultural exchanges",
                "Berlin tech professional interested in African culture",
                "NYC-based travel blogger with African heritage",
                "Lagos-based tech founder and connector",
                "Beijing-based global connector",
                "Dublin software developer and cultural enthusiast",
                "Mumbai-based wellness practitioner",
                "Mexico City chef passionate about global cuisine",
                "Melbourne-based traveler and storyteller"
        };
        int[] years = {1992, 1990, 1988, 1995, 1985, 1991, 1993, 1989, 1987, 1994, 1990, 1996, 1988, 1992, 1991};
        int[] months = {5, 8, 11, 3, 7, 1, 9, 12, 6, 4, 2, 10, 8, 3, 7};
        int[] days = {10, 22, 5, 18, 15, 28, 14, 3, 20, 12, 25, 7, 19, 30, 8};

        for (int i = 0; i < 15; i++) {
            User user = createUser(names[i].toLowerCase() + "@roadnet.app", "Password123!", names[i],
                    i < 3 ? UserRole.PROVIDER : UserRole.USER, AccountStatus.ACTIVE, VerificationStatus.VERIFIED);
            demoUsers.add(user);

            String[] parts = countryCoords[i % countries.length].split(",");
            double lat = Double.parseDouble(parts[0]) + ThreadLocalRandom.current().nextDouble(-0.5, 0.5);
            double lng = Double.parseDouble(parts[1]) + ThreadLocalRandom.current().nextDouble(-0.5, 0.5);

            Set<Language> userLangs = new HashSet<>();
            userLangs.add(languages.get(0));
            userLangs.add(languages.get(i % languages.size()));

            Set<Interest> userInterests = new HashSet<>();
            userInterests.add(interests.get(i % interests.size()));
            userInterests.add(interests.get((i + 3) % interests.size()));

            Set<Intention> userIntentions = new HashSet<>();
            userIntentions.add(intentions.get(i % intentions.size()));

            createProfile(user, LocalDate.of(years[i], months[i], days[i]),
                    genders[i], countries[i % countries.length], countries[i % countries.length],
                    null, bios[i], null, "Various professions",
                    userLangs, userInterests, userIntentions,
                    MaritalStatus.values()[i % MaritalStatus.values().length],
                    AccountPurpose.values()[i % AccountPurpose.values().length],
                    GeographicPreference.values()[i % GeographicPreference.values().length],
                    lat, lng);
        }

        List<User> allUsers = userRepository.findAll();
        if (allUsers.size() >= 4) {
            createConnection(allUsers.get(1), allUsers.get(2), "RD-2026-A1B2", 78.5);
            createConnection(allUsers.get(1), allUsers.get(3), "RD-2026-C3D4", 65.2);
            createConnection(allUsers.get(2), allUsers.get(4), "RD-2026-E5F6", 72.1);
        }

        if (allUsers.size() >= 6) {
            createIntroduction(allUsers.get(5), allUsers.get(1), "Hi! I'd love to connect with someone from Rwanda.", IntroductionStatus.PENDING);
            createIntroduction(allUsers.get(6), allUsers.get(1), "Interested in learning about Rwandan culture.", IntroductionStatus.ACCEPTED);
        }

        if (allUsers.size() >= 4) {
            createMoment(allUsers.get(1), "Just visited the beautiful Kigali Genocide Memorial. A powerful reminder of Rwanda's journey.", MomentCategory.CULTURE, "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800", 24, 8);
            createMoment(allUsers.get(2), "Amazing street art in Nairobi! The creativity here is unmatched.", MomentCategory.CULTURE, "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", 18, 5);
            createMoment(allUsers.get(3), "Lagos nightlife is always an adventure! Who else is out tonight?", MomentCategory.CELEBRATIONS, "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800", 32, 12);
            createMoment(allUsers.get(4), "Table Mountain never gets old. Nature's masterpiece.", MomentCategory.PLACES, "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800", 45, 15);
            createMoment(demo, "My first week on ROAD.NET! So excited to connect with amazing people from around the world.", MomentCategory.CELEBRATIONS, null, 12, 4);
        }

        if (allUsers.size() >= 4) {
            createComments(allUsers);
            createReactions(allUsers);
        }

        List<User> providers = allUsers.stream().filter(u -> u.getRole() == UserRole.PROVIDER).toList();
        if (providers.isEmpty() && allUsers.size() > 3) {
            providers = List.of(allUsers.get(2), allUsers.get(3), allUsers.get(4));
        }
        if (providers.size() >= 3) {
            createExperiences(providers, languages, interests);
        }

        createNotifications(demo);

        log.info("Database seeded successfully!");
    }

    private User createUser(String email, String password, String displayName, UserRole role,
                            AccountStatus status, VerificationStatus verificationStatus) {
        User user = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .displayName(displayName)
                .role(role)
                .status(status)
                .verificationStatus(verificationStatus)
                .build();
        return userRepository.save(user);
    }

    private Profile createProfile(User user, LocalDate dob, Gender gender, String countryOrigin,
                                   String currentCountry, String region, String bio, String imageUrl,
                                   String profession, Set<Language> languages, Set<Interest> interests,
                                   Set<Intention> intentions, MaritalStatus maritalStatus,
                                   AccountPurpose purpose, GeographicPreference geoPref,
                                   double lat, double lng) {
        Profile profile = Profile.builder()
                .user(user)
                .dateOfBirth(dob)
                .gender(gender)
                .countryOfOrigin(countryOrigin)
                .currentCountry(currentCountry)
                .region(region)
                .bio(bio)
                .profileImageUrl(imageUrl)
                .languages(languages)
                .interests(interests)
                .intentions(intentions)
                .maritalStatus(maritalStatus)
                .profession(profession)
                .geographicPreference(geoPref)
                .accountPurpose(purpose)
                .accountType(AccountType.INDIVIDUAL)
                .latitude(lat)
                .longitude(lng)
                .build();
        return profileRepository.save(profile);
    }

    private List<Language> seedLanguages() {
        String[][] langData = {
                {"English", "en"}, {"French", "fr"}, {"Swahili", "sw"}, {"Kinyarwanda", "rw"},
                {"Arabic", "ar"}, {"Spanish", "es"}, {"Portuguese", "pt"}, {"German", "de"},
                {"Japanese", "ja"}, {"Hindi", "hi"}, {"Mandarin", "zh"}, {"Yoruba", "yo"},
                {"Amharic", "am"}, {"Zulu", "zu"}, {"Luganda", "lg"}
        };
        List<Language> langs = new ArrayList<>();
        for (String[] l : langData) {
            langs.add(languageRepository.save(Language.builder().name(l[0]).code(l[1]).build()));
        }
        return langs;
    }

    private List<Interest> seedInterests() {
        String[][] intData = {
                {"Travel", "Lifestyle"}, {"Photography", "Creative"}, {"Cooking", "Lifestyle"},
                {"Music", "Entertainment"}, {"Hiking", "Outdoor"}, {"Reading", "Intellectual"},
                {"Dance", "Entertainment"}, {"Yoga", "Wellness"}, {"Art", "Creative"},
                {"Technology", "Professional"}, {"Volunteering", "Social"}, {"Wine Tasting", "Lifestyle"},
                {"Surfing", "Outdoor"}, {"Fashion", "Creative"}, {"Gaming", "Entertainment"}
        };
        List<Interest> ints = new ArrayList<>();
        for (String[] i : intData) {
            ints.add(interestRepository.save(Interest.builder().name(i[0]).category(i[1]).build()));
        }
        return ints;
    }

    private List<Intention> seedIntentions() {
        Object[][] intData = {
                {"Serious Relationship", "Looking for a committed long-term partnership"},
                {"Marriage", "Seeking a life partner for marriage"},
                {"Dating", "Open to casual and serious dating"},
                {"Friendship", "Looking to build genuine friendships"},
                {"Cultural Exchange", "Interested in learning about other cultures"},
                {"Travel Companions", "Looking for travel buddies"},
                {"Networking", "Professional and social networking"},
                {"Mentorship", "Seeking or offering mentorship"}
        };
        List<Intention> ints = new ArrayList<>();
        for (Object[] i : intData) {
            ints.add(intentionRepository.save(Intention.builder().name((String) i[0]).description((String) i[1]).build()));
        }
        return ints;
    }

    private void createConnection(User user1, User user2, String code, double score) {
        connectionRepository.save(Connection.builder()
                .connectionCode(code)
                .user1(user1)
                .user2(user2)
                .compatibilityScore(score)
                .status(ConnectionStatus.ACCEPTED)
                .build());
    }

    private void createIntroduction(User sender, User receiver, String message, IntroductionStatus status) {
        com.roadnet.entity.IntroductionRequest intro = com.roadnet.entity.IntroductionRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .status(status)
                .build();
        if (status != IntroductionStatus.PENDING) {
            intro.setRespondedAt(LocalDateTime.now());
        }
        introductionRequestRepository.save(intro);
    }

    private void createMoment(User author, String caption, MomentCategory category, String imageUrl, int likes, int comments) {
        Moment moment = momentRepository.save(Moment.builder()
                .author(author)
                .caption(caption)
                .category(category)
                .imageUrl(imageUrl)
                .likesCount(likes)
                .commentsCount(comments)
                .build());
    }

    private void createComments(List<User> users) {
        if (users.size() < 4) return;
        List<Moment> moments = momentRepository.findAll();
        if (moments.isEmpty()) return;
        String[] commentTexts = {"Beautiful!", "Love this!", "So inspiring!", "Amazing experience!", "Can't wait to visit!"};
        for (int i = 0; i < Math.min(5, moments.size()); i++) {
            commentRepository.save(Comment.builder()
                    .moment(moments.get(i))
                    .author(users.get((i + 1) % Math.min(users.size(), 6)))
                    .content(commentTexts[i])
                    .build());
        }
    }

    private void createReactions(List<User> users) {
        if (users.size() < 4) return;
        List<Moment> moments = momentRepository.findAll();
        if (moments.isEmpty()) return;
        for (int i = 0; i < Math.min(5, moments.size()); i++) {
            reactionRepository.save(Reaction.builder()
                    .moment(moments.get(i))
                    .user(users.get((i + 2) % Math.min(users.size(), 6)))
                    .type(ReactionType.LIKE)
                    .build());
        }
    }

    private void createExperiences(List<User> providers, List<Language> languages, List<Interest> interests) {
        Object[][] expData = {
                {providers.get(0), "Kigali Cultural Walking Tour", "Explore the vibrant streets of Kigali with a local guide. Visit art galleries, local markets, and learn about Rwanda's incredible transformation.", ExperienceCategory.CULTURAL, "Kigali, Rwanda", 35.00, "USD", 180, 10},
                {providers.get(0), "Traditional Rwandan Cooking Class", "Learn to prepare traditional Rwandan dishes including isombe, brochettes, and ugali with fresh local ingredients.", ExperienceCategory.LOCAL_EXPERIENCES, "Kigali, Rwanda", 45.00, "USD", 150, 8},
                {providers.get(1), "Nairobi Art & Culture Walk", "Discover Nairobi's thriving art scene through galleries, street art, and cultural centers.", ExperienceCategory.CULTURAL, "Nairobi, Kenya", 30.00, "USD", 120, 12},
                {providers.get(1), "Safari Sunrise Experience", "Start your day with a breathtaking sunrise safari experience in the Nairobi National Park.", ExperienceCategory.TRAVEL, "Nairobi, Kenya", 120.00, "USD", 240, 6},
                {providers.get(2), "Lagos Nightlife Tour", "Experience the best of Lagos nightlife with a guided tour of the city's hottest spots.", ExperienceCategory.SOCIAL_ACTIVITIES, "Lagos, Nigeria", 50.00, "USD", 300, 15},
                {providers.get(2), "Couples Wellness Retreat", "A rejuvenating wellness retreat designed for couples seeking relaxation and connection.", ExperienceCategory.WELLNESS, "Lagos, Nigeria", 200.00, "USD", 480, 4}
        };

        for (Object[] data : expData) {
            Experience exp = experienceRepository.save(Experience.builder()
                    .provider((User) data[0])
                    .title((String) data[1])
                    .description((String) data[2])
                    .category((ExperienceCategory) data[3])
                    .location((String) data[4])
                    .price(BigDecimal.valueOf((Double) data[5]))
                    .currency((String) data[6])
                    .durationMinutes((Integer) data[7])
                    .maxParticipants((Integer) data[8])
                    .isActive(true)
                    .build());

            availabilityRepository.save(Availability.builder()
                    .experience(exp)
                    .dayOfWeek(1)
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(17, 0))
                    .slotDurationMinutes(60)
                    .maxBookings(5)
                    .isAvailable(true)
                    .build());

            availabilityRepository.save(Availability.builder()
                    .experience(exp)
                    .dayOfWeek(6)
                    .startTime(LocalTime.of(10, 0))
                    .endTime(LocalTime.of(18, 0))
                    .slotDurationMinutes(90)
                    .maxBookings(8)
                    .isAvailable(true)
                    .build());
        }

        List<User> allUsers = userRepository.findAll();
        List<Experience> experiences = experienceRepository.findAll();
        if (allUsers.size() >= 5 && !experiences.isEmpty()) {
            User booker = allUsers.get(1);
            Booking booking = bookingRepository.save(Booking.builder()
                    .experience(experiences.get(0))
                    .user(booker)
                    .bookingDate(LocalDate.now().plusDays(7))
                    .timeSlot(LocalTime.of(10, 0))
                    .status(BookingStatus.COMPLETED)
                    .participantsCount(2)
                    .totalPrice(BigDecimal.valueOf(70.00))
                    .currency("USD")
                    .build());

            reviewRepository.save(Review.builder()
                    .experience(experiences.get(0))
                    .booking(booking)
                    .reviewer(booker)
                    .rating(5)
                    .comment("Absolutely amazing experience! The guide was incredibly knowledgeable and passionate about Kigali's history.")
                    .build());

            if (experiences.size() >= 3) {
                User booker2 = allUsers.get(3);
                Booking booking2 = bookingRepository.save(Booking.builder()
                        .experience(experiences.get(2))
                        .user(booker2)
                        .bookingDate(LocalDate.now().plusDays(3))
                        .timeSlot(LocalTime.of(14, 0))
                        .status(BookingStatus.CONFIRMED)
                        .participantsCount(1)
                        .totalPrice(BigDecimal.valueOf(30.00))
                        .currency("USD")
                        .build());

                reviewRepository.save(Review.builder()
                        .experience(experiences.get(2))
                        .booking(booking2)
                        .reviewer(booker2)
                        .rating(4)
                        .comment("Great cultural experience in Nairobi! Learned so much about the local art scene.")
                        .build());
            }
        }
    }

    private void createNotifications(User user) {
        notificationRepository.save(com.roadnet.entity.Notification.builder()
                .user(user)
                .type(NotificationType.SYSTEM)
                .title("Welcome to ROAD.NET!")
                .message("Welcome to ROAD.NET - Human Connection Beyond Borders. Start exploring and connecting with people worldwide!")
                .isRead(false)
                .build());
    }
}
