package WorkStream360.timemanagement.modal;

import lombok.Builder;
import lombok.Data;

@Data
public class ProjectResourceData {
    private Long projectID;
    private String role;
    private String  resource ;
    private Long resourceId;
    private Long  allocatedBudget;
    private Integer  allocatedHours;
    private String   burnedHours;
    private String   assignmentStartDate;
    private String assignmentEndDate;
    private String projectName;
}
