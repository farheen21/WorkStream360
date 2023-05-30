package WrokStream360.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "projects")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long projectId;

    @Column(name = "PROJECT_NAME")
    private String projectName;

    @Column(name = "PROJECT_TYPE")
    private ProjectType projectType;

    @Column(name = "PROJECT_START_DATE")
    private String  projectStartDate;

    @Column(name = "PROJECT_END_DATE")
    private String projectEndDate;

    @Column(name = "PROJECT_MANAGER")
    private String projectManager;
    @Column(name = "PROJECT_ENGAGEMENT_LEADER")
    private String projectEngagementLeader ;

    @Column(name = "PROJECT_STATUS")
    private ProjectStatus projectStatus;

    @Column(name = "PROJECT_HEALTH")
    private ProjectHealth projectHealth;

    @Column(name = "PROJECT_DESCRIPTION")
    private String projectDescription;

    @Column(name = "PROJECT_TOTAL_BUDGET")
    private Long projectTotalBudget;

    @Column(name = "PROJECT_BURNED_BUDGET")
    private Long projectBurnedBudget;

    @Column(name = "PROJECT_REMAINING_BUDGET")
    private Long projectRemainingBudget;

    @Column(name = "PROJECT_BURNED_HOURS")
    private Integer projectTotalBurnedHours;
}
