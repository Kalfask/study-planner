package com.studyplanner.backend.repository;

import com.studyplanner.backend.model.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession,Long> {

    List<StudySession> findByUserIdOrderByStartedAtDesc(Long userId);

    List<StudySession> findByUserIdAndStartedAtBetweenOrderByStartedAtDesc(Long userId, LocalDateTime from , LocalDateTime to);

    //ForStats: Total minutes per user

    @Query("SELECT COALESCE(SUM(s.durationMinutes), 0) FROM StudySession s WHERE s.user.id = :userId")
    Integer getTotalMinutesByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(s.durationMinutes),0) FROM StudySession s WHERE s.user.id = :userId AND s.startedAt BETWEEN :from AND :to")
    Integer getTotalMinutesByUserIdAndDateRange(
            @Param("userId") Long userId,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to);

    @Query("SELECT COUNT(s) FROM StudySession s WHERE s.user.id = :userId")
    Integer getSessionCountByUserId(@Param("userId") Long userId);



}
