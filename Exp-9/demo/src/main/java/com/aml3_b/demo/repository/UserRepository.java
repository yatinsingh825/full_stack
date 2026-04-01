package com.aml3_b.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aml3_b.demo.model.User; 

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}