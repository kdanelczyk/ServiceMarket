package senderservice.senderservice.rabbitmq;

import java.util.Map;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import senderservice.senderservice.emailSender.EmailSender;

@Service
public class RabbitMQConsumer {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EmailSender emailSender;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void receiveMessage(String messageJson) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> senderData = objectMapper.readValue(messageJson, Map.class);
            emailSender.sendEmailToOfferOwner(senderData);
            emailSender.sendEmailToRequestingUser(senderData);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

}
