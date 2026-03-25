package com.studyplanner.backend.service;

import com.studyplanner.backend.dto.ScheduleDto;
import com.studyplanner.backend.model.Schedule;
import com.studyplanner.backend.model.ScheduleSlot;
import com.studyplanner.backend.model.User;
import com.studyplanner.backend.repository.CourseRepository;
import com.studyplanner.backend.repository.ScheduleRepository;
import com.studyplanner.backend.repository.ScheduleSlotRepository;
import com.studyplanner.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleSlotRepository scheduleSlotRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public ScheduleService(
            ScheduleRepository scheduleRepository,
            ScheduleSlotRepository scheduleSlotRepository,
            UserRepository userRepository,
            CourseRepository courseRepository)
    {
        this.scheduleRepository = scheduleRepository;
        this.scheduleSlotRepository = scheduleSlotRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public List<ScheduleDto.ScheduleResponse> getUserSchedules(String username) {
        User user = findUser(username);
        return scheduleRepository.findByUserIdOrderByNameAsc(user.getId()).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ScheduleDto.ScheduleResponse createSchedule(String username, ScheduleDto.ScheduleRequest scheduleRequest) {
        User user = findUser(username);
        Schedule schedule = new Schedule();
        schedule.setUser(user);
        schedule.setName(scheduleRequest.getName());
        schedule.setActive(false);

        schedule =scheduleRepository.save(schedule);
        return toResponse(schedule);
    }



    //Helpers
    private User findUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found!"));
    }




    private ScheduleDto.ScheduleResponse toResponse(Schedule schedule) {
        ScheduleDto.ScheduleResponse response = new ScheduleDto.ScheduleResponse();
        response.setId(schedule.getId());
        response.setName(schedule.getName());
        response.setActive(schedule.getActive());
        response.setSlots(schedule.getSlots().stream().map(this::toSlotResponse).collect(Collectors.toList()));
        return response;
    }

    private ScheduleDto.SlotResponse toSlotResponse(ScheduleSlot slot) {
        ScheduleDto.SlotResponse response = new ScheduleDto.SlotResponse();
        response.setId(slot.getId());
        response.setDayOfWeek(slot.getDayOfWeek());
        response.setStartTime(slot.getStartTime());
        response.setEndTime(slot.getEndTime());
        response.setLocation(slot.getLocation());

        if (slot.getCourse() != null) {
            response.setCourseId(slot.getCourse().getId());
            response.setCourseName(slot.getCourse().getName());
            response.setCourseColor(slot.getCourse().getColor());
        }

        return response;
    }
}
