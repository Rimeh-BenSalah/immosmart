# ImmoSmart – backend Spring Boot

Application unique, port **8081**, base MySQL `immosmart` (les tables existent déjà, Hibernate n'y touche pas).
Chemin d'une requête : **Controller → Service → Repository → Model → MySQL**

## Organisation du code

    src/main/java/com/immosmart/
      controller/   les URLs REST (reçoivent la requête, appellent le service)
      service/      la logique métier + Auth/Session (cookie de connexion)
      repository/   l'accès à la base (Spring Data JPA)
      model/        les tables (User, Annonce, Photo...) et les JSON reçus (Requetes)
      exception/    ApiException + ErreurHandler (erreurs en JSON)
      config/       CORS, BCrypt, dossier uploads
      ImmoSmartApplication.java   démarrage

Les noms gardent le rôle d'origine : `Visiteur…` (auth, annonces publiques), `Utilisateur…` (demandes, favoris, profil),
`Annonceur…` (annonces, photos, demandes), `Admin…` (tableau de bord, gestion).

## Démarrer
Prérequis : Java 17+, Maven, MySQL avec la base `immosmart`.

    lancer.bat        (Windows)        ou        ./lancer.sh

Angular : toutes les URLs de l'API pointent vers `http://localhost:8081`, puis `ng serve` → http://localhost:4200

## Réglages
`src/main/resources/application.properties`. Chaque valeur peut être remplacée par une variable d'environnement :
`SERVER_PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `APP_SECRET`, `CORS_ORIGIN`, `UPLOADS_DIR`, `PUBLIC_UPLOADS_URL`.
Sans variable : valeurs de développement local (MySQL local, root, sans mot de passe).
