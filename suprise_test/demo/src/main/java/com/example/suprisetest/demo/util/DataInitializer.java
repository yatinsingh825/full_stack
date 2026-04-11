package com.example.suprisetest.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.example.suprisetest.demo.model.User;
import com.example.suprisetest.demo.repository.UserRepository;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initializeData() {
        // Check if users already exist
        if (userRepository.findByUsername("admin").isPresent()) {
            return; // Data already initialized
        }

        // Create test users
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("password123");
        admin.setFullName("Administrator");
        admin.setEmail("admin@example.com");
        admin.setRole("ADMIN");
        admin.setActive(true);
        userRepository.save(admin);

        User viewer = new User();
        viewer.setUsername("viewer");
        viewer.setPassword("password123");
        viewer.setFullName("Viewer User");
        viewer.setEmail("viewer@example.com");
        viewer.setRole("VIEWER");
        viewer.setActive(true);
        userRepository.save(viewer);

        User user1 = new User();
        user1.setUsername("user1");
        user1.setPassword("password123");
        user1.setFullName("John Doe");
        user1.setEmail("john@example.com");
        user1.setRole("USER");
        user1.setActive(true);
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("user2");
        user2.setPassword("password123");
        user2.setFullName("Jane Smith");
        user2.setEmail("jane@example.com");
        user2.setRole("USER");
        user2.setActive(true);
        userRepository.save(user2);

        System.out.println("✅ Test users initialized successfully!");
    }
}
