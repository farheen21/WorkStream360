package WrokStream360.project.modal;

import lombok.Data;

@Data
public class ResourceByProjectName extends ProjectResourceRequest{
    private String projectName;

    public ResourceByProjectName() {
        super(); // Call the constructor of the parent class
    }
}
