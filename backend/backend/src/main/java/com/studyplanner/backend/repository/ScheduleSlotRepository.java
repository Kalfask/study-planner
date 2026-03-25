package com.studyplanner.backend.repository;

import com.studyplanner.backend.model.ScheduleSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleSlotRepository extends JpaRepository<ScheduleSlot,Long> {

    List<ScheduleSlot> findByScheduleIdOrderByDayOfWeekAscStartTimeAsc(Long scheduleId);
}
