package com.roadnet.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String countryOfOrigin;

    private String currentCountry;

    private String region;

    @Column(length = 2000)
    private String bio;

    private String profileImageUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "profile_languages",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    @Builder.Default
    private Set<Language> languages = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "profile_interests",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "interest_id")
    )
    @Builder.Default
    private Set<Interest> interests = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "profile_intentions",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "intention_id")
    )
    @Builder.Default
    private Set<Intention> intentions = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;

    private String profession;

    @Enumerated(EnumType.STRING)
    private GeographicPreference geographicPreference;

    @Enumerated(EnumType.STRING)
    private AccountPurpose accountPurpose;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private Double latitude;

    private Double longitude;

    @Builder.Default
    private Boolean visibilityProfile = true;

    @Builder.Default
    private Boolean visibilitySearch = true;

    @Builder.Default
    private Boolean visibilityLocation = true;

    @Builder.Default
    private String whoCanSendIntroductions = "ALL";

    @Enumerated(EnumType.STRING)
    private MomentCategory momentVisibility;

    @Builder.Default
    private Boolean internationalVisibility = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
