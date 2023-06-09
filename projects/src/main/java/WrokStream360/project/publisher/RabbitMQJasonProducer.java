package WrokStream360.project.publisher;

import WrokStream360.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static WrokStream360.project.config.RabbitMQConfig.*;

@Component
@AllArgsConstructor
@Log4j2
public class RabbitMQJasonProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendJasonMessage(Project project){
        log.info("project sending: {}",project);
        rabbitTemplate.convertAndSend(EXCHANGE , RoutingKey, project);
    }

}
