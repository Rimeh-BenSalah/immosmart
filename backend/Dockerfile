
# Etape 1 : construction de l'application
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests package

# Etape 2 : image d'exécution
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Installer curl pour le HEALTHCHECK
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur non root
RUN groupadd -r appgroup \
    && useradd -r -g appgroup appuser

# Copier le JAR avec les bonnes permissions
COPY --from=build --chown=appuser:appgroup /app/target/*.jar /app/app.jar

# Exécuter avec un utilisateur non root
USER appuser

EXPOSE 8081

# Vérifier l'état de santé de l'application
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD curl -fsS http://localhost:8081/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

