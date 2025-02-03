package senderservice.senderservice.emailSender;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderImpl implements EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailToOfferOwner(Map<String, Object> senderData) {
        SimpleMailMessage message = new SimpleMailMessage();

        System.out.println("Preparing email to offer owner with senderData: " + senderData);

        message.setTo((String) senderData.get("requestingUserEmail"));
        message.setSubject("ServiceMarket - " + senderData.get("taskTitle"));
        message.setText("Dear " + senderData.get("nameOfTheQuestioner") +
                ",\n\nWe have included the data you asked for below:\n" +
                "Offer owner name: " + senderData.get("offerOwner") + "\n\n" +
                "Contact this person via email: " + senderData.get("offerOwnerEmail") + "\n\n" +
                "Or telephone number: " + senderData.get("offerOwnerNumber").toString() + "\n\n" +
                " Thank you for trust!");

        System.out.println("Sending email to: " + senderData.get("requestingUserEmail"));

        javaMailSender.send(message);
        System.out.println("Email sent to offer owner.");
    }

    public void sendEmailToRequestingUser(Map<String, Object> senderData) {
        SimpleMailMessage message = new SimpleMailMessage();

        System.out.println("Preparing email to requesting user with senderData: " + senderData);

        message.setTo((String) senderData.get("offerOwnerEmail"));
        message.setSubject("ServiceMarket - someone asked for your details!");
        message.setText("Dear " + senderData.get("offerOwner")
                + "Someone asked for your details, expect contact soon\r\n" +
                senderData.get("taskTitle") +
                " Thank you for trust!");

        System.out.println("Sending email to: " + senderData.get("offerOwnerEmail"));

        javaMailSender.send(message);
        System.out.println("Email sent to requesting user.");
    }

}
