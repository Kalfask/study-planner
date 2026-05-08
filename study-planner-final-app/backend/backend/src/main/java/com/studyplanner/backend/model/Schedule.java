package com.studyplanner.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false,length = 100)
    private String name;

    @Column(name ="is_active")
    private Boolean isActive = false;

    @OneToMany(mappedBy = "schedule",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleSlot> slots = new ArrayList<>();

    public Schedule() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public List<ScheduleSlot> getSlots() {
        return slots;
    }

    public void setSlots(List<ScheduleSlot> slots) {
        this.slots = slots;
    }
}
