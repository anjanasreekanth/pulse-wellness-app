package com.example.pulse_api.goal;

import com.example.pulse_api.user.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "weekly_goal",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "week_start"})
)
public class WeeklyGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate weekStart;

    @Column(nullable = false)
    private Integer targetActivities;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public WeeklyGoal(){

    }

    public WeeklyGoal(LocalDate weekStart, Integer targetActivities, User user) {
        this.weekStart = weekStart;
        this.targetActivities = targetActivities;
        this.user = user;
    }

    public Long getId() {
        return id;
    }



    public LocalDate getWeekStart() {
        return weekStart;
    }

    public void setWeekStart(LocalDate weekStart) {
        this.weekStart = weekStart;
    }

    public Integer getTargetActivities() {
        return targetActivities;
    }

    public void setTargetActivities(Integer targetActivities) {
        this.targetActivities = targetActivities;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
