package WrokStream360.project.service;


import WrokStream360.project.entity.Project;
import WrokStream360.project.entity.ResourceInProject;
import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.modal.ProjectResourceRequest;
import WrokStream360.project.modal.ProjectResponse;
import WrokStream360.project.repository.ProjectRepository;
import WrokStream360.project.repository.ResourcesInProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
public class ProjectServiceImp implements ProjectService{


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

        projectRepository.save(project);

        log.info("Project Created");
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



    @Override
    public void deleteProjectById(long projectId) {
        log.info("Deleting project with ID: {}", projectId);

        // Delete the project
        projectRepository.deleteById(projectId);

        // Delete the associated resources
        resourcesInProjectRepository.deleteByProjectId(projectId);

        log.info("Project and associated resources deleted");
    }
}
