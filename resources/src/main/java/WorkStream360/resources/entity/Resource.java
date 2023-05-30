package WorkStream360.resources.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "RESOURCES")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long resourceId;

    @Column(name = "RESOURCE_FIRST_NAME")
    private String resourceFirstName;

    @Column(name = "RESOURCE_LAST_NAME")
    private String resourceLastName;

    @Column(name = "RESOURCE_PHONE_NUMBER")
    private Long resourcePhoneNumber;

    @Column(name = "RESOURCE_EMAIL")
    private String  resourceEmail;

    @Column(name = "RESOURCE_DATE_OF_BIRTH")
    private  String resourceDateOfBirth;

    @Column(name = "RESOURCE_LOCATION")
    private LocationEnum resourceLocation;


    @ManyToOne
    @JoinColumn(name = "resourceRoleId")
    private ResourceRole resource_Role;

    @Column(name = "RESOURCE_JOINING_DATE")
    private String resourceJoiningDate;

    @Column(name = "RESOURCE_REPORTING_MANAGER")
    private String resourceReportingManager;

    @Column(name = "RESOURCE_EXPERIENCE")
    private String resourceExperience;
}
