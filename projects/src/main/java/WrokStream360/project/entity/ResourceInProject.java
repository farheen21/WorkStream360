package WrokStream360.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "resources-in-project")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResourceInProject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long allocationId;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    private Long resourceId;
    private String role;
    private String  resource ;
    private String  allocatedBudget;
    private String  allocatedHours;
    private String   burnedHours;
    private String   assignmentStartDate;
    private String assignmentEndDate;
}
