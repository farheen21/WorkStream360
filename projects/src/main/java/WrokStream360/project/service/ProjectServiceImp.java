package WrokStream360.project.service;


import WrokStream360.project.entity.Project;
import WrokStream360.project.entity.ResourceInProject;
import WrokStream360.project.modal.*;

import WrokStream360.project.publisher.RabbitMQJasonProducer;
import WrokStream360.project.repository.ProjectRepository;
import WrokStream360.project.repository.ResourcesInProjectRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
public class ProjectServiceImp implements ProjectService{



    @Autowired
    RabbitMQJasonProducer rabbitMQJasonProducer;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ResourcesInProjectRepository resourcesInProjectRepository;

    @Override
    public long addProject(ProjectRequest projectRequest) {
        log.info("Adding project...");

        Project project = Project.builder()
                .projectName(projectRequest.getProjectName())
                .projectType(projectRequest.getProjectType())
                .projectStartDate(projectRequest.getProjectStartDate())
                .projectEndDate(projectRequest.getProjectEndDate())
                .projectManager(projectRequest.getProjectManager())
                .projectEngagementLeader(projectRequest.getProjectEngagementLeader())
                .projectStatus(projectRequest.getProjectStatus())
                .projectHealth(projectRequest.getProjectHealth())
                .projectDescription(projectRequest.getProjectDescription())
                .projectTotalBudget(projectRequest.getProjectTotalBudget())
                .projectBurnedBudget(projectRequest.getProjectBurnedBudget())
                .projectRemainingBudget(projectRequest.getProjectRemainingBudget())
                .projectTotalBurnedHours(projectRequest.getProjectTotalBurnedHours())
                .build();

//        rabbitMqProducer.sendMessage(project);
        projectRepository.save(project);
        log.info("Project Created");
        log.info("Message send to producer");
        rabbitMQJasonProducer.sendJasonMessage(project);
        return project.getProjectId();
    }


    @Override
    public ProjectResponse getProjectById(long projectId) {
        log.info("Getting the project information for product id: {}" , projectId);
        Project project = projectRepository.findById(projectId).orElseThrow();
        ProjectResponse projectResponse = new ProjectResponse();
        copyProperties(project , projectResponse);
        return projectResponse;
    }

    @Override
    public long addResourceToProject(ProjectResourceRequest projectResourceRequest) {
        log.info("Adding Resource to project...");
        Project project = projectRepository.findById(projectResourceRequest.getProjectID())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Project with ID: " + projectResourceRequest.getProjectID()));
        log.info("Got this from client as project: {}", project);

        ResourceInProject resourceInProject = ResourceInProject.builder()
                .resource(projectResourceRequest.getResource())
                .role(projectResourceRequest.getRole())
                .allocatedBudget(projectResourceRequest.getAllocatedBudget())
                .allocatedHours(projectResourceRequest.getAllocatedHours())
                .assignmentStartDate(projectResourceRequest.getAssignmentEndDate())
                .assignmentEndDate(projectResourceRequest.getAssignmentEndDate())
                .burnedHours(projectResourceRequest.getBurnedHours())
                .project(project)
                .build();

        resourcesInProjectRepository.save(resourceInProject);
        log.info("this is new resource added in project: {}", resourceInProject);
        log.info("Resource added");
        return resourceInProject.getAllocationId();
    }



    @Transactional
    @Override
    public void deleteProjectById(long projectId) {
        log.info("Deleting project with ID: {}", projectId);

        // Delete the project
        projectRepository.deleteById(projectId);

        // Delete the associated resources
        resourcesInProjectRepository.deleteByProjectId(projectId);

        log.info("Project and associated resources deleted");
    }

    @Override
    public boolean exists(long projectId) {
        return projectRepository.existsById(projectId);
    }

    @Override
    public long updateProject(long projectId, ProjectRequest projectRequest) {
        log.info("Updating project...");

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Project ID"));
        log.info("got this id: {}", projectId);

        project.setProjectName(projectRequest.getProjectName());
        project.setProjectType(projectRequest.getProjectType());
        project.setProjectStartDate(projectRequest.getProjectStartDate());
        project.setProjectEndDate(projectRequest.getProjectEndDate());
        project.setProjectManager(projectRequest.getProjectManager());
        project.setProjectEngagementLeader(projectRequest.getProjectEngagementLeader());
        project.setProjectStatus(projectRequest.getProjectStatus());
        project.setProjectHealth(projectRequest.getProjectHealth());
        project.setProjectDescription(projectRequest.getProjectDescription());
        project.setProjectTotalBudget(projectRequest.getProjectTotalBudget());
        project.setProjectBurnedBudget(projectRequest.getProjectBurnedBudget());
        project.setProjectRemainingBudget(projectRequest.getProjectRemainingBudget());
        project.setProjectTotalBurnedHours(projectRequest.getProjectTotalBurnedHours());
        projectRepository.save(project);
        log.info("Project updated");
        return project.getProjectId(); // Return the updated project ID
    }

//    @Override
//    public long updateBudgetData(Long projectId, ProjectBudgetChange projectBudgetChange) {
//
//        log.info("Updating project budget data...");
//        Project project = projectRepository.findById(projectId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid Project ID"));
//        log.info("got this id: {}", projectId);
//          project.setProjectTotalBurnedHours(projectBudgetChange.getTotalBurnedHours());
//          project.setProjectBurnedBudget(projectBudgetChange.getProjectBurnedBudget());
//          project.setProjectRemainingBudget(projectBudgetChange.getProjectRemainingBudget());
//          projectRepository.save(project);
//            log.info("Project Budget data updated ");
//            return project.getProjectId();
//    }

    @Override
    public long updateBudgetData(Long projectId, ProjectBudgetChange projectBudgetChange) {
        log.info("Updating project budget data for project ID: {}", projectId);

        // Retrieve the project entity from the database using the projectId
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Project ID: " + projectId));

        // Update the budget data of the project
        project.setProjectTotalBurnedHours(projectBudgetChange.getTotalBurnedHours());
        project.setProjectBurnedBudget(projectBudgetChange.getBurnedBudget());
        project.setProjectRemainingBudget(projectBudgetChange.getProjectRemainingBudget());

        // Save the updated project entity
        projectRepository.save(project);

        log.info("Project budget data updated successfully for project ID: {}", projectId);
        return project.getProjectId();
    }

    @Override
    public List<AllProjectResponse> getAllProjects() {
        log.info("Getting all projects");
        List<Project> projects = projectRepository.findAll();
        List<AllProjectResponse> allProjectResponses = new ArrayList<>();

        for (Project project : projects) {
            AllProjectResponse allProjectResponse = new AllProjectResponse();
            copyProperties(project, allProjectResponse);
            allProjectResponses.add(allProjectResponse);
        }

        return allProjectResponses;
    }

}
