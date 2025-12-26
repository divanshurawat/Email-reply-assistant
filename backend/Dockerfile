# 1. Build the App
# We use Maven with JDK 21 to match your <java.version>21</java.version>
FROM maven:3.9.9-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

# 2. Run the App
# We use a lightweight Java 21 Runtime
FROM eclipse-temurin:21-jre-alpine
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]