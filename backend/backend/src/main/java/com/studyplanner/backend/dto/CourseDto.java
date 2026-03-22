package com.studyplanner.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CourseDto {

    public static class CourseRequest{

        @NotBlank
        @Size(max = 100)
        private String Name;

        private String Color;
        private String professor;
        private String semester;

        public CourseRequest() {}

        public String getName() {
            return Name;
        }

        public void setName(String name) {
            Name = name;
        }

        public String getColor() {
            return Color;
        }

        public void setColor(String color) {
            Color = color;
        }

        public String getProfessor() {
            return professor;
        }

        public void setProfessor(String professor) {
            this.professor = professor;
        }

        public String getSemester() {
            return semester;
        }

        public void setSemester(String semester) {
            this.semester = semester;
        }
    }

    public static class CourseResponse{
        private Long id;
        private String name;
        private String color;
        private String professor;
        private String semester;

        public CourseResponse() {}

        public CourseResponse(Long id, String name, String color, String professor, String semester) {
            this.id = id;
            this.name = name;
            this.color = color;
            this.professor = professor;
            this.semester = semester;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getProfessor() {
            return professor;
        }

        public void setProfessor(String professor) {
            this.professor = professor;
        }

        public String getSemester() {
            return semester;
        }

        public void setSemester(String semester) {
            this.semester = semester;
        }
    }
}
