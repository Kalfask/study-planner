package com.studyplanner.backend.repository;

import com.studyplanner.backend.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByUserIdOrderByNameAsc(Long userId);
    Optional<Schedule> findByUserIdAndIsActiveTrue(Long userId);
}
