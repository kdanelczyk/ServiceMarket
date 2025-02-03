package senderservice.senderservice.emailSender;

import java.util.Map;

public interface EmailSender {

    void sendEmailToOfferOwner(Map<String, Object> senderData);

    void sendEmailToRequestingUser(Map<String, Object> senderData);

}
