package WrokStream360.project.service;

import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.modal.ProjectResponse;

public interface ProjectService {
    long addProject(ProjectRequest projectRequest);


    ProjectResponse getProjectById(long projectId);
}
