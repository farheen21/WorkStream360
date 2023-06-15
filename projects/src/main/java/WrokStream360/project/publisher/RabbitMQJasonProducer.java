package WrokStream360.project.publisher;

import WrokStream360.project.entity.Project;
import WrokStream360.project.modal.ResourceByProjectName;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import static WrokStream360.project.config.RabbitMQConfig.*;

@Component

@Log4j2
public class RabbitMQJasonProducer {


    private RabbitTemplate rabbitTemplate;


    public RabbitMQJasonProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }



    public void sendJasonMessage(ResourceByProjectName resourceByProjectName){
//        log.info("project sending: {}",resourceByProjectName);
        log.info("project sending: projectName={}, projectId={}, resourceId={}, role={}",
                resourceByProjectName.getProjectName(),
                resourceByProjectName.getProjectID(),
                resourceByProjectName.getResourceId(),
                resourceByProjectName.getRole());
        rabbitTemplate.convertAndSend(EXCHANGE , RoutingKey, resourceByProjectName);
    }




}
