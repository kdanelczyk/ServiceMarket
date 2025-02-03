package servicemarket.servicemarket.rabbitmq;

import java.util.Map;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RabbitMQProducer {

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendRequest(Map<String, Object> senderData) {
        try {
            template.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTING_KEY,
                    objectMapper.writeValueAsString(senderData));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
