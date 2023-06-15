package WrokStream360.project.controller;

import WrokStream360.project.modal.*;
import WrokStream360.project.service.ProjectService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Create project in DB
    @PostMapping("/create-project")
    public ResponseEntity<Long> addProject(@RequestBody ProjectRequest projectRequest){
        long projectId = projectService.addProject(projectRequest);
      return new ResponseEntity<>(projectId , HttpStatus.CREATED);
    }

    // View project from DB to client

    @GetMapping("/{projectId}")
    public ResponseEntity<AllProjectResponse> getProjectById(@PathVariable("projectId") long projectId){
        AllProjectResponse allProjectResponse = projectService.getProjectById(projectId);
        return new ResponseEntity<>( allProjectResponse, HttpStatus.OK);
    }



    @PostMapping("/add-resource-to-project")
    public ResponseEntity<Long> addResourceToProject(@RequestBody ProjectResourceRequest projectResourceRequest) {
        long allocationId = projectService.addResourceToProject(projectResourceRequest);
        return new ResponseEntity<>(allocationId, HttpStatus.CREATED);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable long projectId) {
        // Check if the project exists
        if (!projectService.exists(projectId)) {
            return new ResponseEntity<>("Project not found", HttpStatus.NOT_FOUND);
        }
        // Delete the project and its resources
        projectService.deleteProjectById(projectId);
        return new ResponseEntity<>("Project and resources deleted successfully", HttpStatus.OK);
    }



    @PutMapping("/{id}")
    public ResponseEntity<String> updateProject(@PathVariable("id") Long projectId, @RequestBody ProjectRequest projectRequest) {
        try {
            projectService.updateProject(projectId, projectRequest);
            return ResponseEntity.ok("Project updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update project");
        }
    }


    @PatchMapping("/update-budget-data/{id}")
    public ResponseEntity<Long> updateBudgetData(@PathVariable("id") Long projectId, @RequestBody ProjectBudgetChange projectBudgetChange) {
        long updateProjectBudgetData = projectService.updateBudgetData(projectId, projectBudgetChange);
        return new ResponseEntity<>(updateProjectBudgetData, HttpStatus.OK);
    }


    @GetMapping
    public List<AllProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{projectId}/resources")
    public List<ResourceByProjectName> getResourcesByProjectId(@PathVariable long projectId) {
        return projectService.getResourcesByProjectId(projectId);
    }

    @GetMapping("/resource/{resourceName}")
    public ResponseEntity<List<AllProjectResponse>> getProjectsByResource(@PathVariable String resourceName) {
        List<AllProjectResponse> projects = projectService.getProjectsByResource(resourceName);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

}
