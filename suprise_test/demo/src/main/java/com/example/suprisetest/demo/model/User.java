package com.example.suprisetest.demo.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN, VIEWER, USER

    @Column(nullable = false)
    private String fullName;

    private String email;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean active = true;
}
