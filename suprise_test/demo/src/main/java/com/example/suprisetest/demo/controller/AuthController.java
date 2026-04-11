package com.example.suprisetest.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import com.example.suprisetest.demo.security.JwtUtil;
import com.example.suprisetest.demo.model.User;
import com.example.suprisetest.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AuthController {

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

    // ✅ Health check endpoint
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "message", "Server is running");
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password) && user.get().getActive()) {
            User userData = user.get();
            String token = JwtUtil.generateToken(username, userData.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", userData.getRole());
            response.put("username", userData.getUsername());
            response.put("fullName", userData.getFullName());
            response.put("userId", userData.getId());
            response.put("email", userData.getEmail());

            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> registerData) {
        String username = registerData.get("username");
        String password = registerData.get("password");
        String fullName = registerData.get("fullName");
        String email = registerData.get("email");

        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password); // In production, hash this!
        newUser.setFullName(fullName);
        newUser.setEmail(email);
        newUser.setRole("USER");
        newUser.setActive(true);

        userRepository.save(newUser);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("role", "USER");

        return response;
    }
}
