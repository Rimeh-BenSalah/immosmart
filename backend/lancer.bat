@echo off
cd /d "%~dp0"
call mvn -q clean package -DskipTests || exit /b 1
java -jar target\immosmart.jar
