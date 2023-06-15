package WorkStream360.timemanagement.controller;

import WorkStream360.timemanagement.entity.TimeCard;
import WorkStream360.timemanagement.modal.ProjectResourceData;
import WorkStream360.timemanagement.service.TimeCardServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/timecards")
public class TimeCardController {

    @Autowired
    private final TimeCardServiceImpl timeCardService;

    @PostMapping
    public ResponseEntity<TimeCard> saveTimeCard(@RequestBody ProjectResourceData projectResourceData) {
        TimeCard savedTimeCard = timeCardService.saveTimeCard(projectResourceData);
        return ResponseEntity.ok(savedTimeCard);

    }

//

    @GetMapping
    public ResponseEntity<List<TimeCard>> getAllTimeCards() {
        List<TimeCard> timeCards = timeCardService.getAllTimeCards();
        if (timeCards.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(timeCards);
    }


}
