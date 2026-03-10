package com.sample.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.demo.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}