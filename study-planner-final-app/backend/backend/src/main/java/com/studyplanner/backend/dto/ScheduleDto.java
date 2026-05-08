package com.studyplanner.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class ScheduleDto {

    public static class ScheduleRequest {
        private String name;
        public ScheduleRequest() {}
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class SlotRequest {
        private String title; // ΠΡΟΣΘΗΚΗ
        private Long courseId;
        private String dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;
        private String location;
        private LocalDate weekStart;
        private Boolean isRecurring; // ΠΡΟΣΘΗΚΗ

        public SlotRequest() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }

        public String getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

        public LocalTime getStartTime() { return startTime; }
        public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

        public LocalTime getEndTime() { return endTime; }
        public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }

        public LocalDate getWeekStart() { return weekStart; }
        public void setWeekStart(LocalDate weekStart) { this.weekStart = weekStart; }

        public Boolean getIsRecurring() { return isRecurring; }
        public void setIsRecurring(Boolean isRecurring) { this.isRecurring = isRecurring; }
    }

    public static class ScheduleResponse {
        private Long id;
        private String name;
        private Boolean isActive;
        private List<SlotResponse> slots;

        public ScheduleResponse() {}
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Boolean getActive() { return isActive; }
        public void setActive(Boolean active) { isActive = active; }
        public List<SlotResponse> getSlots() { return slots; }
        public void setSlots(List<SlotResponse> slots) { this.slots = slots; }
    }

    public static class SlotResponse {
        private Long id;
        private String title; // ΠΡΟΣΘΗΚΗ
        private Long courseId;
        private String courseName;
        private String courseColor;
        private String dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;
        private String location;
        private LocalDate weekStart;
        private Boolean isRecurring; // ΠΡΟΣΘΗΚΗ

        public SlotResponse() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }

        public String getCourseName() { return courseName; }
        public void setCourseName(String courseName) { this.courseName = courseName; }

        public String getCourseColor() { return courseColor; }
        public void setCourseColor(String courseColor) { this.courseColor = courseColor; }

        public String getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }

        public LocalTime getStartTime() { return startTime; }
        public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

        public LocalTime getEndTime() { return endTime; }
        public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }

        public LocalDate getWeekStart() { return weekStart; }
        public void setWeekStart(LocalDate weekStart) { this.weekStart = weekStart; }

        public Boolean getIsRecurring() { return isRecurring; }
        public void setIsRecurring(Boolean isRecurring) { this.isRecurring = isRecurring; }
    }
}