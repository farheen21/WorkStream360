package WrokStream360.project.modal;

import lombok.Data;

@Data
public class ProjectBudgetChange {
    private Long burnedBudget;
    private Long projectRemainingBudget;
    private Integer totalBurnedHours;
    private Integer totalBudget;
//    private Integer burnedBudget;
}
