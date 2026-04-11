package com.example.suprisetest.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.suprisetest.demo.model.Complaint;
import com.example.suprisetest.demo.model.User;
import com.example.suprisetest.demo.repository.ComplaintRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    public Complaint saveComplaint(Complaint c) {
        return repo.save(c);
    }

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public Optional<Complaint> getComplaintById(Long id) {
        return repo.findById(id);
    }

    public List<Complaint> getByUser(User user) {
        return repo.findByUser(user);
    }

    public List<Complaint> getComplaintsByStatus(String status) {
        return repo.findByStatus(status);
    }

    public long getTotalComplaints() {
        return repo.count();
    }

    public Complaint updateStatus(Long id, String status) {
        Complaint c = repo.findById(id).orElseThrow();
        c.setStatus(status);
        return repo.save(c);
    }

    public void deleteComplaint(Long id) {
        repo.deleteById(id);
    }
}
