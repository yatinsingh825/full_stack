package com.example.suprisetest.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.suprisetest.demo.model.User;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByRole(String role);
}
