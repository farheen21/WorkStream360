package WorkStream360.timemanagement.service;

import WorkStream360.timemanagement.entity.TimeCard;
import WorkStream360.timemanagement.modal.ProjectResourceData;
import WorkStream360.timemanagement.repository.TimeCardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Log4j2
public class TimeCardServiceImpl implements TimeCardService{

    @Autowired
    private final TimeCardRepository timeCardRepository;

    public TimeCard saveTimeCard(ProjectResourceData projectResourceData) {
        TimeCard timeCard = TimeCard.builder()
                .forecast(projectResourceData.getAllocatedHours())
                .monForecast(0)
                .tueForecast(0)
                .wedForecast(0)
                .thuForecast(0)
                .friForecast(0)
                .satForecast(0)
                .sunForecast(0)
                .resourceId(projectResourceData.getResourceId())
                .resourceName(projectResourceData.getResource())
                .projectId(projectResourceData.getProjectID())
                .resourceRole(projectResourceData.getRole())
                .projectName(projectResourceData.getProjectName())
                .budget(projectResourceData.getAllocatedBudget())
                .variance(0)
                .status("Pending")
                .build();

        timeCardRepository.save(timeCard);
        log.info("time card saved in database: {}",timeCard);
        return timeCard;
    }

//    public List<TimeCard> getTimeCardsByProject(Long projectId) {
//        return timeCardRepository.findByProjectId(projectId);
//    }

    public List<TimeCard> getAllTimeCards() {
        return timeCardRepository.findAll();
    }

}
