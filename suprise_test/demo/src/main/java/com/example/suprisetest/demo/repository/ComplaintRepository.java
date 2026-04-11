package com.example.suprisetest.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.suprisetest.demo.model.Complaint;
import com.example.suprisetest.demo.model.User;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUser(User user);
    List<Complaint> findByStatus(String status);
}
