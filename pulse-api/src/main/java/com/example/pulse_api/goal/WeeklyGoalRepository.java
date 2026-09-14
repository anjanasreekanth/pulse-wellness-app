package com.example.pulse_api.goal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, Long> {
    Optional<WeeklyGoal> findByUserIdAndWeekStart(Long userId, LocalDate weekStart);
}
