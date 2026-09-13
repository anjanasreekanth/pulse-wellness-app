package com.example.pulse_api.activity;

import com.example.pulse_api.user.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "activity_log")
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate activityDate;

    @Column(nullable = false, length = 100)
    private String activityName;

    @Column(nullable = false, length = 30)
    private String activityType;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false)
    private Integer waterMl;

    @Column(nullable = false, precision = 3, scale = 1)
    private BigDecimal sleepHours;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public ActivityLog() {
    }

    public ActivityLog(User user, LocalDate activityDate, String activityName, String activityType, Integer durationMinutes, Integer waterMl, BigDecimal sleepHours, Integer score) {
        this.user = user;
        this.activityDate = activityDate;
        this.activityName = activityName;
        this.activityType = activityType;
        this.durationMinutes = durationMinutes;
        this.waterMl = waterMl;
        this.sleepHours = sleepHours;
        this.score = score;
    }

    public Long getId() {
        return id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Integer getWaterMl() {
        return waterMl;
    }

    public void setWaterMl(Integer waterMl) {
        this.waterMl = waterMl;
    }

    public BigDecimal getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(BigDecimal sleepHours) {
        this.sleepHours = sleepHours;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
