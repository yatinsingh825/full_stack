package com.sample.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.demo.model.Student;
import com.sample.demo.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public Student getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }

    // ✅ ADD THIS
    public Student updateStudent(int id, Student newStudent) {
        Student existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(newStudent.getName());
            existing.setCourse(newStudent.getCourse());
            return repository.save(existing);
        }

        return null;
    }

    // ✅ ADD THIS
    public void deleteStudent(int id) {
        repository.deleteById(id);
    }
}