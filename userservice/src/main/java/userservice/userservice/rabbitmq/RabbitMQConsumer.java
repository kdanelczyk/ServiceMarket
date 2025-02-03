package userservice.userservice.rabbitmq;

import java.util.Map;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import userservice.userservice.service.UserServiceImpl;

@Service
public class RabbitMQConsumer {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @Autowired
    private UserServiceImpl userService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void receiveMessage(String message) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> senderData = objectMapper.readValue(message, Map.class);

            rabbitMQProducer.sendRequest(userService.getUsersData(senderData));
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

}
