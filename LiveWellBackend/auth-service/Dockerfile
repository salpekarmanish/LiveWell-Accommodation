FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/auth-service-1.0.0.jar auth-service.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "auth-service.jar"]
