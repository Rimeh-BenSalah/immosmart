# ImmoSmart

Plateforme web de gestion et de consultation d'annonces immobilières, réalisée dans le cadre du projet de fin de module DevOps à l'ISET.

## 1. Architecture du projet

Le projet repose sur trois composants :

| Composant | Technologie | Port |
|---|---|---|
| Frontend | Angular | 4200 |
| Backend | Spring Boot 3.5, Java 17, Maven | 8081 |
| Base de données | MySQL 8.0 | 3306 (interne Docker) |

### Structure du projet

```text
immosmart/
├── backend/                  # Application Spring Boot
│   ├── Dockerfile
│   └── src/
├── frontend/                 # Application Angular
│   ├── Dockerfile
│   └── src/
├── db/
│   └── init.sql              # Initialisation de MySQL
├── scripts/
│   └── check-project.sh      # Vérification du projet
├── .github/
│   └── workflows/
│       ├── ci.yml            # Pipeline CI
│       └── release.yml       # Publication des images
├── docker-compose.yml        # Environnement local
└── docker-compose.release.yml # Environnement de test
```

## 2. Prérequis

- Git
- Docker
- Docker Compose (plugin Docker Compose v2)
- Java 17
- Maven
- Node.js 22 et npm

## 3. Démarrage avec Docker Compose

### 3.1 Configurer les variables d'environnement

Depuis la racine du projet, définir les variables nécessaires :

```bash
export MYSQL_ROOT_PASSWORD="votre_mot_de_passe_root"
export MYSQL_APP_PASSWORD="votre_mot_de_passe_application"
export APP_SECRET="votre_secret_application"
```

Ne jamais publier ces valeurs dans GitHub ou dans le dépôt.

### 3.2 Construire les images locales

```bash
docker build -t immosmart-backend:1.0.0 ./backend
docker build -t immosmart-frontend:1.0.0 ./frontend
```

### 3.3 Démarrer l'application

```bash
docker compose up -d
```

### 3.4 Vérifier les conteneurs

```bash
docker compose ps
```

### 3.5 Accéder à l'application

- Frontend : http://localhost:4200
- Backend : http://localhost:8081
- Santé du Backend : http://localhost:8081/health

Pour arrêter les services sans supprimer les données :

```bash
docker compose stop
```

## 4. Tests

### Backend

```bash
cd backend
mvn -B test
```

### Frontend

```bash
cd frontend
npm ci
npm test -- --watch=false --browsers=ChromeHeadless
```

### Script de vérification du projet

Depuis la racine :

```bash
bash scripts/check-project.sh
```

Le script retourne :
- `0` si les vérifications réussissent.
- Une valeur non nulle en cas d'erreur.

## 5. Intégration continue (CI)

Le workflow GitHub Actions `ci.yml` est déclenché lors de l'ouverture ou de la mise à jour d'une Pull Request vers `main`.

Il réalise les opérations suivantes :

1. Récupération du code source.
2. Installation de Java 17 et Node.js 22.
3. Exécution des tests Backend.
4. Exécution des tests Frontend.
5. Publication des rapports de tests comme artefacts.
6. Construction des images Docker après la réussite des tests (`needs`).

Les images construites pendant la CI servent à vérifier la construction. Elles ne sont pas publiées sur GHCR par ce workflow.

## 6. Publication des versions Docker

Le workflow `release.yml` est déclenché lorsqu'un tag commençant par `v` est envoyé sur GitHub.

Exemple :

```bash
git tag -a v1.0.2 -m "Release ImmoSmart version 1.0.2"
git push origin v1.0.2
```

Les images sont publiées sur GitHub Container Registry (GHCR) :

- `ghcr.io/rimeh-bensalah/immosmart-backend`
- `ghcr.io/rimeh-bensalah/immosmart-frontend`

Chaque version possède son propre tag. Les images publiées sont réutilisées pour le déploiement, sans reconstruction.

## 7. Déploiement dans l'environnement de test

Configurer les variables d'environnement nécessaires dans le terminal :

```bash
export MYSQL_ROOT_PASSWORD="votre_mot_de_passe_root"
export MYSQL_APP_PASSWORD="votre_mot_de_passe_application"
export APP_SECRET="votre_secret_application"
export APP_VERSION=v1.0.2
```

Récupérer les images publiées :

```bash
docker compose -f docker-compose.release.yml pull
```

Démarrer ou mettre à jour l'environnement de test :

```bash
docker compose -f docker-compose.release.yml up -d
```

Vérifier les services :

```bash
docker compose -f docker-compose.release.yml ps
```

Contrôler la santé du Backend :

```bash
curl -i http://localhost:8081/health
```

Le Backend doit retourner HTTP 200 avec un statut `UP` et une base de données `UP`.

Accès :
- Frontend : http://localhost:4200
- Backend : http://localhost:8081

La base de données utilise un volume Docker persistant et son port n'est pas publié sur l'hôte.

## 8. Rollback vers une version précédente

Pour revenir à une version antérieure, modifier la variable `APP_VERSION`.

Exemple : revenir de `v1.0.2` à `v1.0.1`.

```bash
export APP_VERSION=v1.0.1
docker compose -f docker-compose.release.yml pull
docker compose -f docker-compose.release.yml up -d
```

Vérifier le retour à l'ancienne version :

```bash
docker compose -f docker-compose.release.yml ps
curl -i http://localhost:8081/health
```

Cette opération réutilise les images déjà publiées et conserve le volume de la base de données.

**Attention :** ne pas utiliser `docker compose down -v` pour effectuer un rollback, car cette commande peut supprimer les volumes persistants.

## 9. Sécurité et bonnes pratiques

- Aucun mot de passe ou secret ne doit être versionné.
- Les variables sensibles sont injectées dans les conteneurs via l'environnement.
- Les images Backend et Frontend utilisent des utilisateurs non privilégiés.
- Des HEALTHCHECK sont configurés pour contrôler l'état des services.
- MySQL est accessible uniquement à l'intérieur du réseau Docker.
- Les données MySQL sont conservées dans un volume persistant.
- Le code est organisé avec Git, des branches et des Pull Requests.

## 10. Versions publiées

| Version | Description |
|---|---|
| v1.0.1 | Première version publiée sur GHCR |
| v1.0.2 | Version avec endpoint de santé détaillé et numéro de version |

## Auteur et contexte

Projet ImmoSmart - Projet de fin de module DevOps, ISET.
