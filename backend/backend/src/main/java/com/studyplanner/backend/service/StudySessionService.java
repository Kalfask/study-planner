package com.studyplanner.backend.service;

import com.studyplanner.backend.dto.StudySessionDto;
import com.studyplanner.backend.model.StudySession;
import com.studyplanner.backend.model.Task;
import com.studyplanner.backend.model.User;
import com.studyplanner.backend.repository.StudySessionRepository;
import com.studyplanner.backend.repository.TaskRepository;
import com.studyplanner.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudySessionService {

    private final StudySessionRepository studySessionRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public StudySessionService(StudySessionRepository studySessionRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.studySessionRepository = studySessionRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public StudySessionDto.SessionResponse logSession(String username, StudySessionDto.SessionRequest request) {
        User user = findUser(username);

        StudySession session = new StudySession();
        session.setUser(user);
        session.setDurationMinutes(request.getDurationMinutes());
        session.setNotes(request.getNotes());

        if (request.getTaskId() != null) {
            Task task = taskRepository.findById(request.getTaskId())
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            session.setTask(task);
        }
        session = studySessionRepository.save(session);
        return toResponse(session);
    }

    public List<StudySessionDto.SessionResponse> getSessionsByUserId(String username, LocalDateTime from, LocalDateTime to) {
        User user = findUser(username);
        List<StudySession> sessions;
        if (from != null && to != null) {
            sessions = studySessionRepository.findByUserIdAndStartedAtBetweenOrderByStartedAtDesc(user.getId(), from, to);
        }
        else {
            sessions = studySessionRepository.findByUserIdOrderByStartedAtDesc(user.getId());
        }

        return sessions.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public StudySessionDto.StatsResponse getStats(String username)
    {
        User user = findUser(username);
        Long userId = user.getId();

        Integer totalMinutes = studySessionRepository.getTotalMinutesByUserId(userId);
        Integer sessionCount = studySessionRepository.getSessionCountByUserId(userId);

        //This Week (Monday to now)

        LocalDateTime weekStart = LocalDate.now()
                .with(DayOfWeek.MONDAY)
                .atStartOfDay();
        LocalDateTime now  = LocalDateTime.now();
        Integer weekMinutes = studySessionRepository.getTotalMinutesByUserIdAndDateRange(userId, weekStart, weekStart);

        //Today

        LocalDateTime TodayStart = LocalDate.now().atStartOfDay();
        Integer todayMinutes = studySessionRepository.getTotalMinutesByUserIdAndDateRange(userId, TodayStart, now);

        return new StudySessionDto.StatsResponse(totalMinutes,weekMinutes,todayMinutes,sessionCount);

    }


        //Helpers
        private User findUser (String username){
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found!"));
        }

        private StudySessionDto.SessionResponse toResponse (StudySession studySession){
            StudySessionDto.SessionResponse sessionResponse = new StudySessionDto.SessionResponse();
            sessionResponse.setId(studySession.getId());
            sessionResponse.setDurationMinutes(studySession.getDurationMinutes());
            sessionResponse.setStartedAt(studySession.getStartedAt());
            sessionResponse.setNotes(studySession.getNotes());

            if (studySession.getTask() != null) {
                sessionResponse.setTaskId(studySession.getTask().getId());
                sessionResponse.setTaskTitle(studySession.getTask().getTitle());
                if (studySession.getTask().getCourse() != null) {
                    sessionResponse.setCourseName(studySession.getTask().getCourse().getName());
                    sessionResponse.setCourseColor(studySession.getTask().getCourse().getColor());
                }
            }
            return sessionResponse;
        }

    }

