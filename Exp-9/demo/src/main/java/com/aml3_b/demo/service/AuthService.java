package com.aml3_b.demo.service;

import com.aml3_b.demo.service.AuthService; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aml3_b.demo.repository.UserRepository; 
import com.aml3_b.demo.security.JwtUtil; 

@Service
public class AuthService {
	@Autowired
    UserRepository repo;

    @Autowired
    JwtUtil jwtUtil;

    public String login(String username, String password) {

        var user = repo.findByUsername(username);

        if(user != null && user.getPassword().equals(password)) {
            return jwtUtil.generateToken(username);
        }

        return "Invalid Credentials";
    }
}