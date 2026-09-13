package com.example.pulse_api.activity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long>{
    List<ActivityLog> findByUserId(Long userId);

}
