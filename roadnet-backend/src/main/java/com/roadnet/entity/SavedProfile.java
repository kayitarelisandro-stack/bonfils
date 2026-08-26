package com.roadnet.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "saved_profiles", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "saved_user_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_user_id", nullable = false)
    private User savedUser;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
