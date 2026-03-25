FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/support-service-1.0.0.jar app.jar
EXPOSE 8085
ENV SPRING_PROFILES_ACTIVE=docker
ENTRYPOINT ["java", "-jar", "app.jar"]
