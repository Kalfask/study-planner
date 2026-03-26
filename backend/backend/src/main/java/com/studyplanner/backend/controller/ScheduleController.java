package com.studyplanner.backend.controller;

import com.studyplanner.backend.dto.ScheduleDto;
import com.studyplanner.backend.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public ResponseEntity<List<ScheduleDto.ScheduleResponse>> getMySchedules(
            @AuthenticationPrincipal UserDetails userDetails
            )
    {
        return ResponseEntity.ok(scheduleService.getUserSchedules(userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<ScheduleDto.ScheduleResponse> createSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ScheduleDto.ScheduleRequest scheduleRequest)
    {
        return ResponseEntity.ok(scheduleService.createSchedule(userDetails.getUsername(), scheduleRequest));
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<ScheduleDto.ScheduleResponse> activateSchedule(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails)
    {
        return ResponseEntity.ok(scheduleService.setActiveSchedule(id,userDetails.getUsername()));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id)
    {
        scheduleService.deleteSchedule(id,userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/slots")
    public ResponseEntity<List<ScheduleDto.SlotResponse>> getSlots(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                scheduleService.getSlots(id, userDetails.getUsername()));
    }

    @PostMapping("/{id}/slots")
    public ResponseEntity<ScheduleDto.SlotResponse> addSlot(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ScheduleDto.SlotRequest request) {
        return ResponseEntity.ok(
                scheduleService.addSlot(id, userDetails.getUsername(), request));
    }

    @DeleteMapping("/{id}/slots/{slotId}")
    public ResponseEntity<Void> removeSlot(
            @PathVariable Long id,
            @PathVariable Long slotId,
            @AuthenticationPrincipal UserDetails userDetails) {
        scheduleService.removeSlot(id, slotId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

}
