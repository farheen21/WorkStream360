package WrokStream360.project.modal;

import lombok.Data;

@Data
public class AllProjectResponse extends ProjectResponse
{
    private String projectManager;

    private String projectEngagementLeader ;

    private Long projectId;
}
