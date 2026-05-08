package com.studyplanner.backend.controller;

import com.studyplanner.backend.dto.TaskDto;
import com.studyplanner.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto.TaskResponse>> getMyTasks(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(
                taskService.getUserTasks(userDetails.getUsername(), status, courseId, from, to));
    }

    @PostMapping
    public ResponseEntity<TaskDto.TaskResponse> createTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TaskDto.TaskRequest request) {
        return ResponseEntity.ok(
            taskService.createTask(userDetails.getUsername(),request)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto.TaskResponse> updateTask(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TaskDto.TaskRequest request) {

        return ResponseEntity.ok(
            taskService.updateTask(userDetails.getUsername(),id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id)
    {
        taskService.deleteTask(userDetails.getUsername(),id);
        return ResponseEntity.noContent().build();
    }
}
