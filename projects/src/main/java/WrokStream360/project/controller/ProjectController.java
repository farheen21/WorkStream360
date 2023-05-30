package WrokStream360.project.controller;

import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.modal.ProjectResponse;
import WrokStream360.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Create project in DB
    @PostMapping("/add-project")
    public ResponseEntity<Long> addProject(@RequestBody ProjectRequest projectRequest){

        long projectId = projectService.addProject(projectRequest);
      return new ResponseEntity<>(projectId , HttpStatus.CREATED);
    }

    // View project from DB to client

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable("projectId") long projectId){
        ProjectResponse projectResponse = projectService.getProjectById(projectId);
        return new ResponseEntity<>( projectResponse, HttpStatus.OK);
    }

}
