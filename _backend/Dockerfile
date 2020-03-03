FROM alpine AS build
RUN apk update && apk add openjdk8 gradle
WORKDIR /home/gradle/project
COPY . .
RUN gradle build

FROM @JDK@
COPY --from=build /home/gradle/project/build/libs/backend-0.0.1-SNAPSHOT.jar /opt/app/backend-0.0.1-SNAPSHOT.jar
COPY mongo_settings.docker-compose.prop /opt/app/mongo_settings.prop
WORKDIR /opt/app
EXPOSE 8080
CMD ["java", "-jar", "/opt/app/backend-0.0.1-SNAPSHOT.jar"]
