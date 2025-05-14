package com.example.api.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rolSequence")
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String name;
}
