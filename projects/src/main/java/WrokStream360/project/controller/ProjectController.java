package WrokStream360.project.controller;

import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @PostMapping("/add-project")
    public ResponseEntity<Long> addProject(@RequestBody ProjectRequest projectRequest){
      long projectId = projectService.addProject(projectRequest);
      return new ResponseEntity<>(projectId , HttpStatus.CREATED);
    }

}
