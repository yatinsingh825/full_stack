package com.example.suprisetest.demo.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.suprisetest.demo.model.User;
import com.example.suprisetest.demo.repository.UserRepository;
import com.example.suprisetest.demo.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Handle preflight requests
    @RequestMapping(method = RequestMethod.OPTIONS)
    public void handleOptions(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String extractRole(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                return JwtUtil.getRole(token);
            } catch (Exception e) {
                throw new RuntimeException("Invalid token: " + e.getMessage());
            }
        }
        throw new RuntimeException("Missing or invalid Authorization header");
    }

    @GetMapping("/all")
    public List<User> getAllUsers(HttpServletRequest request) {
        String role = extractRole(request);
        if (!"ADMIN".equals(role)) {
            throw new RuntimeException("Only admins can access this");
        }
        return userRepository.findAll();
    }

    @GetMapping("/by-role/{role}")
    public List<User> getUsersByRole(@PathVariable String role, HttpServletRequest request) {
        String userRole = extractRole(request);
        if (!"ADMIN".equals(userRole)) {
            throw new RuntimeException("Only admins can access this");
        }
        return userRepository.findByRole(role);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates, HttpServletRequest request) {
        String role = extractRole(request);
        if (!"ADMIN".equals(role)) {
            throw new RuntimeException("Only admins can update users");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("fullName")) {
            user.setFullName((String) updates.get("fullName"));
        }
        if (updates.containsKey("email")) {
            user.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("role")) {
            user.setRole((String) updates.get("role"));
        }
        if (updates.containsKey("active")) {
            user.setActive((Boolean) updates.get("active"));
        }

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id, HttpServletRequest request) {
        String role = extractRole(request);
        if (!"ADMIN".equals(role)) {
            throw new RuntimeException("Only admins can delete users");
        }
        userRepository.deleteById(id);
    }
}
