package WrokStream360.project.service;

import WrokStream360.project.modal.*;

import java.util.List;

public interface ProjectService {
    long addProject(ProjectRequest projectRequest);


    AllProjectResponse getProjectById(long projectId);

    long addResourceToProject(ProjectResourceRequest projectResourceRequest);

    void deleteProjectById(long projectId);

    boolean exists(long projectId);

    long updateProject(long projectId, ProjectRequest projectRequest);

    long updateBudgetData(Long projectId, ProjectBudgetChange projectBudgetChange);

    List<AllProjectResponse> getAllProjects();

    List<ResourceByProjectName> getResourcesByProjectId(long projectId);

    List<AllProjectResponse> getProjectsByResource(String resourceName);
}
