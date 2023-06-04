package WrokStream360.project.modal;

import lombok.Data;

@Data
public class ProjectResourceRequest {

    private Long projectID;
    private String role;
    private String  resource ;
    private String  allocatedBudget;
    private String  allocatedHours;
    private String   burnedHours;
    private String   assignmentStartDate;
    private String assignmentEndDate;
}
