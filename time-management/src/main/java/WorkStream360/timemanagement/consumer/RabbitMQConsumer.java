package WorkStream360.timemanagement.consumer;

import WorkStream360.timemanagement.service.TimeCardServiceImpl;
import WorkStream360.timemanagement.modal.ProjectResourceData;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@Log4j2
@AllArgsConstructor
public class RabbitMQConsumer {

    public static final String QUEUE = "PROJECT_QUEUE";

    public static final String EXCHANGE = "PROJECT_EXCHANGE";

    public static final String RoutingKey = "WorkStream360";

    @Autowired
    TimeCardServiceImpl timeCardService;

    @RabbitListener(queues = QUEUE)
    public void ConsumeJasonMessage(ProjectResourceData projectResourceData){
      log.info("Got this jason message---> {}",projectResourceData);
      timeCardService.saveTimeCard(projectResourceData);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
