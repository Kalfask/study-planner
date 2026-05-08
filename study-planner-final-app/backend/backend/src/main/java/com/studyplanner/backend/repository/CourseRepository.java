package com.studyplanner.backend.repository;

import com.studyplanner.backend.model.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository  extends CrudRepository<Course, Long> {
        List<Course> findByUserIdOrderByNameAsc(long userId);
}
