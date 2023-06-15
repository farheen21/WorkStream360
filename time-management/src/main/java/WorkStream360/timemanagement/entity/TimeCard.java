package WorkStream360.timemanagement.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TimeCard")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TimeCard {

    @Id
    @GeneratedValue( strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "Forecast")
    private Integer forecast;

    @Column(name = "Mon_Forecast")
    private Integer monForecast;

    @Column(name = "Tue_Forecast")
    private Integer tueForecast;

    @Column(name = "Wed_Forecast")
    private Integer wedForecast;

    @Column(name = "Thu_Forecast")
    private Integer thuForecast;

    @Column(name = "Fri_Forecast")
    private Integer friForecast;

    @Column(name = "Sat_Forecast")
    private Integer satForecast;

    @Column(name = "Sun_Forecast")
    private Integer sunForecast;

    @Column(name = "Resource_Id")
    private Long resourceId;

    @Column(name = "Resource_Name")
    private String resourceName;

    @Column(name = "Project_Id")
    private Long projectId;

    @Column(name = "Project_Name")
    private String projectName;

    @Column(name = "Resource_Role")
    private String resourceRole;

    @Column(name = "Budget")
    private Long budget;

    @Column(name = "Variance")
    private Integer variance;

    @Column(name = "Status")
    private String status;


}
