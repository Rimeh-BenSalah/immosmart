#!/bin/sh
# Compile puis démarre l'application ImmoSmart (port 8080). Ctrl+C arrête.
cd "$(dirname "$0")" && mvn -q clean package -DskipTests || exit 1
java -jar target/immosmart.jar
