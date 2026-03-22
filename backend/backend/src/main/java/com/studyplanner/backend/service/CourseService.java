package com.studyplanner.backend.service;

import com.studyplanner.backend.dto.CourseDto;
import com.studyplanner.backend.model.Course;
import com.studyplanner.backend.model.User;
import com.studyplanner.backend.repository.CourseRepository;
import com.studyplanner.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;

    }

    public List<CourseDto.CourseResponse> getUserCourses(String username){
        User user=userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        return courseRepository.findByUserIdOrderByNameAsc(user.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public CourseDto.CourseResponse createCourse(String username, CourseDto.CourseRequest courseRequest){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        Course course = new Course();
        course.setUser(user);
        course.setName(courseRequest.getName());
        course.setColor(courseRequest.getColor());
        course.setProfessor(courseRequest.getProfessor());
        course.setSemester(courseRequest.getSemester());
        course = courseRepository.save(course);
        return toResponse(course);
    }

    public CourseDto.CourseResponse updateCourse(String username, CourseDto.CourseRequest courseRequest){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        Course course = new Course();
        course.setUser(user);
        course.setName(courseRequest.getName());
        course.setColor(courseRequest.getColor());
        course.setProfessor(courseRequest.getProfessor());
        course.setSemester(courseRequest.getSemester());
        course = courseRepository.save(course);
        return toResponse(course);
    }

    public void deleteCourse(Long id, String username){
        Course course = courseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Course not found!"));
        if(!course.getUser().getUsername().equals(username)){
            throw new RuntimeException("Not Authorized");
        }
        courseRepository.delete(course);
    }

    private CourseDto.CourseResponse toResponse(Course course) {
        return new CourseDto.CourseResponse(
                course.getId(),
                course.getName(),
                course.getColor(),
                course.getProfessor(),
                course.getSemester()
        );
    }
}
