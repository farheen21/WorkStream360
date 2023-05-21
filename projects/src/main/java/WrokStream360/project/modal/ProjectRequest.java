package WrokStream360.project.modal;

import WrokStream360.project.entity.ProjectHealth;
import WrokStream360.project.entity.ProjectStatus;
import WrokStream360.project.entity.ProjectType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;


@Data
public class ProjectRequest {
    private String projectName;
    private ProjectType projectType;
    private String projectDescription;
    private String projectStartDate;
    private String  projectEndDate;
    private ProjectStatus projectStatus;
    private ProjectHealth projectHealth;
    private Long projectTotalBudget;

//    private Long projectBurnedBudget;
//    private Long projectRemainingBudget;
//    private Integer projectTotalBurnedHours;
}
