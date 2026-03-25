package com.studyplanner.backend.controller;

import com.studyplanner.backend.dto.StudySessionDto;

import com.studyplanner.backend.service.StudySessionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;



import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/sessions")
public class StudySessionController {

    private final StudySessionService studySessionService;

    public StudySessionController(StudySessionService studySessionService) {
        this.studySessionService = studySessionService;
    }

    @PostMapping
    public ResponseEntity<StudySessionDto.SessionResponse> logSession(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody StudySessionDto.SessionRequest request)
    {
        return ResponseEntity.ok(studySessionService.logSession(userDetails.getUsername(), request));
    }

    @GetMapping
    public ResponseEntity<List<StudySessionDto.SessionResponse>> getMySessions(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to)
    {
        return ResponseEntity.ok(studySessionService.getSessionsByUserId(userDetails.getUsername(), from, to));
    }

    @GetMapping("/stats")
    public ResponseEntity<StudySessionDto.StatsResponse> getSessionStats(
            @AuthenticationPrincipal UserDetails userDetails)
    {
        return ResponseEntity.ok(studySessionService.getStats(userDetails.getUsername()));
    }

    @GetMapping("/stats/custom")
    public ResponseEntity<StudySessionDto.CustomStatsResponse> getCustomStats(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        String username = authentication.getName();
        return ResponseEntity.ok(
                studySessionService.getCustomStats(username, startDate, endDate)
        );
    }


}
