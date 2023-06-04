package WrokStream360.project.controller;

import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.modal.ProjectResourceRequest;
import WrokStream360.project.modal.ProjectResponse;
import WrokStream360.project.service.ProjectService;
import lombok.extern.log4j.Log4j2;
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



    @PostMapping("/add-resource-to-project")
    public ResponseEntity<Long> addResourceToProject(@RequestBody ProjectResourceRequest projectResourceRequest) {
        long allocationId = projectService.addResourceToProject(projectResourceRequest);
        return new ResponseEntity<>(allocationId, HttpStatus.CREATED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable long projectId) {
        // Call the deleteProjectById() method of the project service
        projectService.deleteProjectById(projectId);

        // Return a success response
        return ResponseEntity.ok("Project and associated resources deleted");
    }



}
