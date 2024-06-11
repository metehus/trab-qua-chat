FROM gradle:jdk17 AS build
WORKDIR /app
COPY . /app
RUN gradle build --no-daemon
RUN ls /app/build/libs


FROM openjdk:17
WORKDIR /app
COPY --from=build /app/build/libs/*-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]