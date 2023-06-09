package WrokStream360.project.modal;

import WrokStream360.project.entity.ProjectHealth;
import WrokStream360.project.entity.ProjectStatus;
import WrokStream360.project.entity.ProjectType;

import lombok.Data;



@Data
public class ProjectRequest {
    private String projectName;
    private ProjectType projectType;
    private String projectStartDate;
    private String projectEndDate;

    private String projectManager;

    private String projectEngagementLeader ;

    private ProjectStatus projectStatus;
    private ProjectHealth projectHealth;
    private String projectDescription;

    private Long projectTotalBudget;
    private Long projectBurnedBudget;
    private Long projectRemainingBudget;
    private Integer projectTotalBurnedHours;

//    private Long projectId;
}
