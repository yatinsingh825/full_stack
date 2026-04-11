package com.example.suprisetest.demo.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.suprisetest.demo.model.Complaint;
import com.example.suprisetest.demo.model.User;
import com.example.suprisetest.demo.service.ComplaintService;
import com.example.suprisetest.demo.repository.UserRepository;
import com.example.suprisetest.demo.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ComplaintController {

    @Autowired
    private ComplaintService service;

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

    private String extractUsername(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                return JwtUtil.validateToken(token);
            } catch (Exception e) {
                throw new RuntimeException("Invalid token: " + e.getMessage());
            }
        }
        throw new RuntimeException("Missing or invalid Authorization header");
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

    @PostMapping
    public Complaint create(@RequestBody Complaint c, HttpServletRequest request) {
        String username = extractUsername(request);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        c.setUser(user);
        c.setStatus("Pending");
        if (c.getPriority() == null) c.setPriority("Medium");
        if (c.getCategory() == null) c.setCategory("General");

        return service.saveComplaint(c);
    }

    @GetMapping
    public List<Complaint> getAll(HttpServletRequest request) {
        String role = extractRole(request);
        String username = extractUsername(request);

        if ("ADMIN".equals(role)) {
            return service.getAll();
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if ("VIEWER".equals(role)) {
            return service.getAll(); // Viewers can see all
        }

        return service.getByUser(user); // Users see only their own
    }

    @GetMapping("/my-complaints")
    public List<Complaint> getMyComplaints(HttpServletRequest request) {
        String username = extractUsername(request);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.getByUser(user);
    }

    @PutMapping("/{id}")
    public Complaint updateStatus(@PathVariable Long id, @RequestBody Complaint c, HttpServletRequest request) {
        String role = extractRole(request);
        String username = extractUsername(request);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Complaint complaint = service.getComplaintById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // Only ADMIN or the owner can update
        if (!"ADMIN".equals(role) && !complaint.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return service.updateStatus(id, c.getStatus());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        String role = extractRole(request);
        String username = extractUsername(request);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Complaint complaint = service.getComplaintById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // Only ADMIN or the owner can delete
        if (!"ADMIN".equals(role) && !complaint.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        service.deleteComplaint(id);
    }

    @GetMapping("/admin/stats")
    public Map<String, Object> getStats(HttpServletRequest request) {
        String role = extractRole(request);
        if (!"ADMIN".equals(role)) {
            throw new RuntimeException("Only admins can access stats");
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalComplaints", service.getTotalComplaints());
        stats.put("pendingComplaints", service.getComplaintsByStatus("Pending").size());
        stats.put("resolvedComplaints", service.getComplaintsByStatus("Resolved").size());
        stats.put("inProgressComplaints", service.getComplaintsByStatus("In Progress").size());

        return stats;
    }
}
