package WorkStream360.resources.modal;

import WorkStream360.resources.entity.LocationEnum;

import WorkStream360.resources.entity.ResourceRole;
import lombok.Data;

@Data
public class ResourceResponse {
    private String resourceFirstName;
    private String resourceLastName;
    private Long resourcePhoneNumber;
    private String  resourceEmail;
    private  String resourceDateOfBirth;
    private LocationEnum resourceLocation;
    private String resourceRole;
    private String resourceJoiningDate;
    private String resourceReportingManager;
    private String resourceExperience;
}
