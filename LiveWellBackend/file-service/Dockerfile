FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/file-service-1.0.0.jar app.jar
EXPOSE 8088
ENV SPRING_PROFILES_ACTIVE=docker
ENTRYPOINT ["java", "-jar", "app.jar"]
