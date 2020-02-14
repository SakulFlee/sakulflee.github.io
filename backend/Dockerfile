FROM gradle AS build
WORKDIR /home/gradle/project
COPY . .
RUN gradle build

FROM openjdk:11
RUN mkdir /opt/app
WORKDIR /opt/app
COPY --from=build /home/gradle/project/build/libs/backend-0.0.1-SNAPSHOT.jar /opt/app/backend-0.0.1-SNAPSHOT.jar
COPY mongo_settings.docker-compose.prop /opt/app/mongo_settings.prop
EXPOSE 8080
CMD ["java", "-jar", "/opt/app/backend-0.0.1-SNAPSHOT.jar"]
