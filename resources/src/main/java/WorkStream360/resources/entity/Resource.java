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
@Entity
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long resourceId;

    @Column(name = "first_name")
    private String resourceFirstName;

    @Column(name = "last_name")
    private String resourceLastName;

    @Column(name = "phone_number")
    private Long resourcePhoneNumber;

    @Column(name = "email")
    private String  resourceEmail;

    @Column(name = "dob")
    private  String resourceDateOfBirth;

    @Column(name = "location")
    private LocationEnum resourceLocation;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private ResourceRole resource_Role;

//    private ResourceRole resource_Role;
    @Column(name = "joining_date")
    private String resourceJoiningDate;

    @Column(name = "reporting_manger")
    private String resourceReportingManager;

    @Column(name = "experience")
    private String resourceExperience;
}
