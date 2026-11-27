
# Étape 1 : Construction de l'application
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests package

# Étape 2 : Image finale
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Installer curl pour le HEALTHCHECK
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur non-root
RUN groupadd -r appgroup \
    && useradd -r -g appgroup appuser

# Copier le fichier JAR
COPY --from=build --chown=appuser:appgroup /app/target/*.jar /app/app.jar

# Créer le dossier uploads et donner les permissions
RUN mkdir -p /app/uploads \
    && chown -R appuser:appgroup /app/uploads

# Exécuter l'application avec un utilisateur non-root
USER appuser

EXPOSE 8081

# Vérifier la disponibilité de l'application
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD curl -fsS http://localhost:8081/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

