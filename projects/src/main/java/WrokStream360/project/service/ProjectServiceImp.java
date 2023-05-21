package WrokStream360.project.service;


import WrokStream360.project.entity.Project;
import WrokStream360.project.modal.ProjectRequest;
import WrokStream360.project.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class ProjectServiceImp implements ProjectService{


    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public long addProject(ProjectRequest projectRequest) {
        log.info("Adding project...");

        Project project = Project.builder()
                .projectName(projectRequest.getProjectName())
                .projectStatus(projectRequest.getProjectStatus())
                .projectType(projectRequest.getProjectType())
                .projectHealth(projectRequest.getProjectHealth())
                .projectStartDate(projectRequest.getProjectStartDate())
                .projectEndDate(projectRequest.getProjectEndDate())
                .projectTotalBudget(projectRequest.getProjectTotalBudget())
                .projectDescription(projectRequest.getProjectDescription())
                .build();

        projectRepository.save(project);

        log.info("Project Created");
        return project.getProjectId();
    }
}
