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
        projectRepository.save(project);
        log.info("Project Created");
        return project.getProjectId();
    }


    @Override
    public AllProjectResponse getProjectById(long projectId) {
        log.info("Getting the project information for product id: {}" , projectId);
        Project project = projectRepository.findById(projectId).orElseThrow();
        AllProjectResponse allProjectResponse = new AllProjectResponse();
        copyProperties(project , allProjectResponse);
        return allProjectResponse;
    }

    @Override
    public long addResourceToProject(ProjectResourceRequest projectResourceRequest) {
        log.info("Adding Resource to project...");
        Project project = projectRepository.findById(projectResourceRequest.getProjectID())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Project with ID: " + projectResourceRequest.getProjectID()));
        log.info("Got this from client as project: {}", project);
        String projectName = project.getProjectName();
        ResourceInProject resourceInProject = ResourceInProject.builder()
                .resource(projectResourceRequest.getResource())
                .role(projectResourceRequest.getRole())
                .allocatedBudget(projectResourceRequest.getAllocatedBudget())
                .allocatedHours(projectResourceRequest.getAllocatedHours())
                .assignmentStartDate(projectResourceRequest.getAssignmentEndDate())
                .assignmentEndDate(projectResourceRequest.getAssignmentEndDate())
                .burnedHours(projectResourceRequest.getBurnedHours())
                .resourceId(projectResourceRequest.getResourceId())
                .project(project)
                .build();

        resourcesInProjectRepository.save(resourceInProject);
        log.info("this is new resource added in project: {}", resourceInProject);


        // Create a separate object to send to the RabbitMQ queue
        ResourceByProjectName messageObject = new ResourceByProjectName();
        messageObject.setProjectName(projectName);
        messageObject.setProjectID(projectResourceRequest.getProjectID());
        messageObject.setResourceId(projectResourceRequest.getResourceId());
        messageObject.setResource(projectResourceRequest.getResource());
        messageObject.setRole(projectResourceRequest.getRole());
        messageObject.setAllocatedBudget(projectResourceRequest.getAllocatedBudget());
        messageObject.setAllocatedHours(projectResourceRequest.getAllocatedHours());

        log.info("Message sent to producer");
        rabbitMQJasonProducer.sendJasonMessage(messageObject);


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

    @Override
    public List<ResourceByProjectName> getResourcesByProjectId(long projectId) {
        log.info("Getting resources for project with ID: {}", projectId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Project ID: " + projectId));

        List<ResourceInProject> resources = resourcesInProjectRepository.findByProject(project);

        List<ResourceByProjectName> resourceResponses = new ArrayList<>();
        for (ResourceInProject resource : resources) {
            ResourceByProjectName resourceResponse = new ResourceByProjectName();
            resourceResponse.setProjectID(projectId);
            resourceResponse.setResource(resource.getResource());
            resourceResponse.setRole(resource.getRole());
            resourceResponse.setAllocatedBudget(resource.getAllocatedBudget());
            resourceResponse.setAllocatedHours(resource.getAllocatedHours());
            resourceResponse.setProjectName(project.getProjectName());
            resourceResponses.add(resourceResponse);
        }

        return resourceResponses;
    }




    @Override
    public List<AllProjectResponse> getProjectsByResource(String resourceName) {
        log.info("Getting projects for resource: {}", resourceName);

        List<ResourceInProject> resources = resourcesInProjectRepository.findByResource(resourceName);

        List<AllProjectResponse> allProjectResponses = new ArrayList<>();

        for (ResourceInProject resource : resources) {
            Project project = resource.getProject();
            AllProjectResponse allProjectResponse = new AllProjectResponse();
            copyProperties(project, allProjectResponse);
            allProjectResponses.add(allProjectResponse);
        }

        return allProjectResponses;
    }



}
