package com.roadnet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "intentions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Intention {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    @Column(nullable = false)
    private String name;

    private String description;
}
