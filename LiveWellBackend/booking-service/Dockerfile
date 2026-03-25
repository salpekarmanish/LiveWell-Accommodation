FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/booking-service-1.0.0.jar app.jar

EXPOSE 8083

ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"]
