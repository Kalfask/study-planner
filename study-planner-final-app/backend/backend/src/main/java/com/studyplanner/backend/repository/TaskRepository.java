package com.studyplanner.backend.repository;

import com.studyplanner.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByDeadlineAsc(Long userId);
    List<Task> findByUserIdAndStatusOrderByDeadlineAsc(Long userId, String status);
    List<Task> findByUserIdAndCourseIdOrderByDeadlineAsc(Long userId, Long courseId);
    List<Task> findByUserIdAndDeadlineBetweenOrderByDeadlineAsc(Long userId, LocalDate from, LocalDate to);
}
