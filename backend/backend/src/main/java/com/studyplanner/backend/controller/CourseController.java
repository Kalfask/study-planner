package com.studyplanner.backend.controller;

import com.studyplanner.backend.dto.CourseDto;
import com.studyplanner.backend.model.Course;
import com.studyplanner.backend.repository.CourseRepository;
import com.studyplanner.backend.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<CourseDto.CourseResponse>> getMyCourses(
            @AuthenticationPrincipal UserDetails userDetails){
        return  ResponseEntity.ok(courseService.getUserCourses(userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<CourseDto.CourseResponse> CreateCourse(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CourseDto.CourseRequest courseRequest)
    {
        return ResponseEntity.ok(courseService.createCourse(userDetails.getUsername(),courseRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDto.CourseResponse> UpdateCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CourseDto.CourseRequest courseRequest)
    {
        return ResponseEntity.ok(courseService.updateCourse(id,userDetails.getUsername(), courseRequest));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        courseService.deleteCourse(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
