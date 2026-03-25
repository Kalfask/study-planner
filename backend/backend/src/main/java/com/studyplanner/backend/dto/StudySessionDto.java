package com.studyplanner.backend.dto;

import java.time.LocalDateTime;

public class StudySessionDto {

    public static class SessionRequest{
        private Integer durationMinutes;
        private Long taskId;
        private String notes;

        public SessionRequest() {}

        public Integer getDurationMinutes() {
            return durationMinutes;
        }

        public void setDurationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
        }

        public Long getTaskId() {
            return taskId;
        }

        public void setTaskId(Long taskId) {
            this.taskId = taskId;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }

    public static class SessionResponse{

        private Long id;
        private Integer durationMinutes;
        private LocalDateTime startedAt;
        private String notes;
        private Long taskId;
        private String taskTitle;
        private String courseName;
        private String courseColor;

        public SessionResponse() {}

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Integer getDurationMinutes() {
            return durationMinutes;
        }

        public void setDurationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
        }

        public LocalDateTime getStartedAt() {
            return startedAt;
        }

        public void setStartedAt(LocalDateTime startedAt) {
            this.startedAt = startedAt;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public Long getTaskId() {
            return taskId;
        }

        public void setTaskId(Long taskId) {
            this.taskId = taskId;
        }

        public String getTaskTitle() {
            return taskTitle;
        }

        public void setTaskTitle(String taskTitle) {
            this.taskTitle = taskTitle;
        }

        public String getCourseName() {
            return courseName;
        }

        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }

        public String getCourseColor() {
            return courseColor;
        }

        public void setCourseColor(String courseColor) {
            this.courseColor = courseColor;
        }
    }

    public static class StatsResponse{
        private Integer totalMinutes;
        private Integer weekMinutes;
        private Integer todayMinutes;
        private Integer sessionCount;

        public StatsResponse() {}

        public StatsResponse(Integer totalMinutes, Integer weekMinutes, Integer todayMinutes, Integer sessionCount) {
            this.totalMinutes = totalMinutes;
            this.weekMinutes = weekMinutes;
            this.todayMinutes = todayMinutes;
            this.sessionCount = sessionCount;
        }


        public Integer getTotalMinutes() {
            return totalMinutes;
        }

        public void setTotalMinutes(Integer totalMinutes) {
            this.totalMinutes = totalMinutes;
        }

        public Integer getWeekMinutes() {
            return weekMinutes;
        }

        public void setWeekMinutes(Integer weekMinutes) {
            this.weekMinutes = weekMinutes;
        }

        public Integer getTodayMinutes() {
            return todayMinutes;
        }

        public void setTodayMinutes(Integer todayMinutes) {
            this.todayMinutes = todayMinutes;
        }

        public Integer getSessionCount() {
            return sessionCount;
        }

        public void setSessionCount(Integer sessionCount) {
            this.sessionCount = sessionCount;
        }
    }

    public static class CustomStatsResponse {
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private Integer customMinutes;
        private Integer customSessionCount;

        public CustomStatsResponse() {}

        public CustomStatsResponse(LocalDateTime startDate, LocalDateTime endDate,
                                   Integer customMinutes, Integer customSessionCount) {
            this.startDate = startDate;
            this.endDate = endDate;
            this.customMinutes = customMinutes;
            this.customSessionCount = customSessionCount;
        }

        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDateTime startDate) {
            this.startDate = startDate;
        }

        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDateTime endDate) {
            this.endDate = endDate;
        }

        public Integer getCustomMinutes() {
            return customMinutes;
        }

        public void setCustomMinutes(Integer customMinutes) {
            this.customMinutes = customMinutes;
        }

        public Integer getCustomSessionCount() {
            return customSessionCount;
        }

        public void setCustomSessionCount(Integer customSessionCount) {
            this.customSessionCount = customSessionCount;
        }
    }
}
