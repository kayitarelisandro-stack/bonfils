package com.roadnet.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "compatibility_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompatibilityScore {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    private Double totalScore;

    private Double intentionsScore;

    private Double geographyScore;

    private Double interestsScore;

    private Double lifestyleScore;

    private Double languagesScore;

    private Double distanceScore;

    private Double otherScore;

    @Column(columnDefinition = "TEXT")
    private String reasons;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime calculatedAt;
}
