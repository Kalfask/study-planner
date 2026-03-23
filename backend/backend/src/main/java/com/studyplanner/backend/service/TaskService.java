package com.studyplanner.backend.service;

import com.studyplanner.backend.dto.TaskDto;
import com.studyplanner.backend.model.Course;
import com.studyplanner.backend.model.Task;
import com.studyplanner.backend.model.User;
import com.studyplanner.backend.repository.CourseRepository;
import com.studyplanner.backend.repository.TaskRepository;
import com.studyplanner.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       CourseRepository courseRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDto.TaskResponse> getUserTasks(String username, String status, Long courseId, LocalDate from, LocalDate to) {
        User user = findUser(username);
        List<Task> tasks;

        if(status!=null) {
            tasks = taskRepository.findByUserIdAndStatusOrderByDeadlineAsc(user.getId(), status);
        } else if (courseId != null) {
            tasks = taskRepository.findByUserIdAndCourseIdOrderByDeadlineAsc(user.getId(), courseId);
        } else if (from != null && to  !=null) {
            tasks =taskRepository.findByUserIdAndDeadlineBetweenOrderByDeadlineAsc(user.getId(), from, to);
        }
        else  {
            tasks = taskRepository.findByUserIdOrderByDeadlineAsc(user.getId());
        }
        return tasks.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskDto.TaskResponse createTask(String username, TaskDto.TaskRequest request) {
        User user = findUser(username);
        Task task = new Task();
        task.setUser(user);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());

        if(request.getCourseId()!=null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(()-> new RuntimeException("course not found"));
            task.setCourse(course);
        }
        task = taskRepository.save(task);
        return toResponse(task);
    }

    public TaskDto.TaskResponse updateTask(String username, Long taskId, TaskDto.TaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()-> new RuntimeException("task not found"));
        if(!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not Authorized");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());

        if(request.getCourseId()!=null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(()-> new RuntimeException("course not found"));
            task.setCourse(course);
        }
        else   {
            task.setCourse(null);
        }
        task = taskRepository.save(task);
        return toResponse(task);
    }

    public TaskDto.TaskResponse deleteTask(String username, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()-> new RuntimeException("task not found"));
        if(!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Not Authorized");
        }
        taskRepository.delete(task);
        return toResponse(task);
    }

    //Helpers
    private User findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private TaskDto.TaskResponse toResponse(Task task)
    {
        TaskDto.TaskResponse response = new TaskDto.TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setDeadline(task.getDeadline());
        response.setPriority(task.getPriority());
        response.setStatus(task.getStatus());
        response.setCreatedAt(task.getCreatedAt());

        if (task.getCourse() != null) {
            response.setCourseId(task.getCourse().getId());
            response.setCourseName(task.getCourse().getName());
            response.setCourseColor(task.getCourse().getColor());
        }

        return response;

    }

}
