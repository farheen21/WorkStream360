package WorkStream360.timemanagement.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Time Card")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TimeCard {

    @Id
    private Long id;

    @Column (name = "Forecast")
    private Integer forecast;

    @Column (name="Daily Forecast Hours")
    private Integer[] dailyForecastHours;

    @Column (name="Notes")
    private String notes;

    private Long resourceId;

    private Long projectId;

}
