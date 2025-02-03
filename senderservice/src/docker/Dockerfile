FROM eclipse-temurin:21-jre
VOLUME /tmp
COPY ../target/senderservice-0.0.1-SNAPSHOT.jar senderservice.jar
ENTRYPOINT ["java", "-jar", "/senderservice.jar"]