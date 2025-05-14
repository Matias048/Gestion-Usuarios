package com.example.api.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSequence")
    private Long id;

    @Column(length = 20)
    private String name;

    @Column(length = 20)
    private String surname;

    @Column(length = 50, unique = true)
    private String email;

    @ManyToOne
    private Role role;

    @Version
    private Integer version;
}
