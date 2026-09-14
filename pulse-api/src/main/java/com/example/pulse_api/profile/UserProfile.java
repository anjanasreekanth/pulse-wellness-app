package com.example.pulse_api.profile;

import com.example.pulse_api.user.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateOfBirth;

    @Column(precision = 5, scale = 2)
    private BigDecimal heightCm;

    @Column(precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(length = 30)
    private String PrimaryGoal;

    private Integer dailyWaterTargetMl;

    @Column(precision = 3, scale = 1)
    private BigDecimal sleepTargetHours;

    @Column(nullable = false, length = 20)
    private String preferredUnit = "METRIC";

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)

    private User user;

    public UserProfile() {

    }

    public UserProfile(LocalDate dateOfBirth, BigDecimal heightCm, BigDecimal weightKg, String primaryGoal, Integer dailyWaterTargetMl, BigDecimal sleepTargetHours, String preferredUnit, Instant updatedAt, User user) {
        this.dateOfBirth = dateOfBirth;
        this.heightCm = heightCm;
        this.weightKg = weightKg;
        PrimaryGoal = primaryGoal;
        this.dailyWaterTargetMl = dailyWaterTargetMl;
        this.sleepTargetHours = sleepTargetHours;
        this.preferredUnit = preferredUnit;
        this.updatedAt = updatedAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public BigDecimal getHeightCm() {
        return heightCm;
    }

    public void setHeightCm(BigDecimal heightCm) {
        this.heightCm = heightCm;
    }

    public BigDecimal getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }

    public String getPrimaryGoal() {
        return PrimaryGoal;
    }

    public void setPrimaryGoal(String primaryGoal) {
        PrimaryGoal = primaryGoal;
    }

    public Integer getDailyWaterTargetMl() {
        return dailyWaterTargetMl;
    }

    public void setDailyWaterTargetMl(Integer dailyWaterTargetMl) {
        this.dailyWaterTargetMl = dailyWaterTargetMl;
    }

    public BigDecimal getSleepTargetHours() {
        return sleepTargetHours;
    }

    public void setSleepTargetHours(BigDecimal sleepTargetHours) {
        this.sleepTargetHours = sleepTargetHours;
    }

    public String getPreferredUnit() {
        return preferredUnit;
    }

    public void setPreferredUnit(String preferredUnit) {
        this.preferredUnit = preferredUnit;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
