// Importer Component pour créer un composant Angular
// OnInit permet d'exécuter du code au démarrage du composant
import { Component, OnInit } from '@angular/core';

// Permet d'utiliser les fonctionnalités Angular comme *ngIf et *ngFor
import { CommonModule } from '@angular/common';

// Permet de récupérer les valeurs des champs avec ngModel
import { FormsModule } from '@angular/forms';

// Router permet de naviguer entre les pages
import { RouterLink, Router } from '@angular/router';

// Importer Axios pour communiquer avec le backend
import axios from 'axios';

// Définir les informations du composant
@Component({
  selector: 'app-profil', // Nom utilisé pour appeler le composant
  standalone: true, // Indique que le composant est autonome
  imports: [CommonModule, FormsModule], // Modules utilisés dans le composant
  templateUrl: './profil.html', // Fichier HTML associé
  styleUrl: './profil.css' // Fichier CSS associé
})

// Créer la classe Profil qui implémente OnInit
export class Profil implements OnInit {

  // Contient les informations de l'utilisateur
  user: any = { nom: '', prenom: '', email: '', telephone: '', mot_de_passe: '' };

  // On ajoute cette variable pour stocker les données d'origine
  // Elle permet de comparer les anciennes valeurs avec les nouvelles
  initialUser: any = {}; 

  // Message affiché lorsque la modification réussit
  successMsg = '';

  // Message affiché lorsqu'une erreur se produit
  errorMsg = '';

  // Indique si le chargement du profil est en cours
  isLoading = true;

  // Adresse principale du backend
  api = 'http://localhost:8082';

  // Injecter Router pour permettre la navigation entre les pages
  constructor(private router: Router) {}

  // Fonction exécutée automatiquement au démarrage du composant
  async ngOnInit() {

    // Récupérer les informations de l'utilisateur depuis localStorage
    // Si aucune donnée n'existe, utiliser un objet vide
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Vérifier si l'utilisateur possède un identifiant
    if (localUser.id) {
      try {

        // Envoyer une requête GET au Spring pour récupérer le profil
        // L'identifiant de l'utilisateur est envoyé dans l'URL
        const res = await axios.get(`${this.api}/user/profil/get_profil?id=${localUser.id}`);

        // Stocker les données reçues du Spring dans user
        this.user = res.data;

        // Vider le champ mot de passe pour ne pas afficher l'ancien mot de passe
        this.user.mot_de_passe = ''; 

        // On sauvegarde une copie des données d'origine
        // JSON.stringify transforme l'objet en texte JSON
        // JSON.parse transforme ce texte en nouvel objet indépendant
        this.initialUser = JSON.parse(JSON.stringify(this.user)); 

        // Indiquer que le chargement est terminé
        this.isLoading = false;

      } catch (e) {

        // Afficher un message si le chargement du profil échoue
        this.errorMsg = "Impossible de charger le profil.";

        // Arrêter l'indicateur de chargement
        this.isLoading = false;
      }

    } else {

      // Si aucun utilisateur n'est trouvé, rediriger vers la connexion
      this.router.navigate(['/login']);
    }
  }

  // Méthode qui vérifie si quelque chose a changé
  hasChanged(): boolean {

    // Retourner true si au moins une information a été modifiée
    // !! transforme le résultat en booléen (true ou false)
    return !!(
      this.user.nom !== this.initialUser.nom ||
      this.user.prenom !== this.initialUser.prenom ||
      this.user.email !== this.initialUser.email ||
      this.user.telephone !== this.initialUser.telephone ||

      // Vérifier si un nouveau mot de passe a été saisi
      (this.user.mot_de_passe && this.user.mot_de_passe.length > 0)
    );
  }

  // Fonction qui enregistre les modifications du profil
  async enregistrer() {

    // Si aucune donnée n'a changé, arrêter la fonction
    if (!this.hasChanged()) return; // Sécurité

    // Effacer les anciens messages
    this.successMsg = '';
    this.errorMsg = '';

    try {

      // Envoyer les nouvelles informations au Spring avec une requête POST
      await axios.post(`${this.api}/user/profil/update_profil`, this.user);

      // Récupérer les informations actuelles depuis localStorage
      const userToUpdate = JSON.parse(localStorage.getItem('user') || '{}');

      // Mettre à jour le nom dans localStorage
      userToUpdate.nom = this.user.nom;

      // Mettre à jour le prénom dans localStorage
      userToUpdate.prenom = this.user.prenom;

      // Mettre à jour l'email dans localStorage
      userToUpdate.email = this.user.email;

      // Enregistrer les nouvelles informations dans localStorage
      // JSON.stringify transforme l'objet en texte pour le stockage
      localStorage.setItem('user', JSON.stringify(userToUpdate));

      // On met à jour les données d'origine après la sauvegarde
      // La nouvelle copie devient la référence pour les prochaines comparaisons
      this.initialUser = JSON.parse(JSON.stringify(this.user));

      // Vider le mot de passe dans la copie d'origine
      this.initialUser.mot_de_passe = ''; 

      // Vider également le champ mot de passe à l'écran
      this.user.mot_de_passe = ''; 

      // Afficher un message de réussite
      this.successMsg = 'Profil mis à jour avec succès !';

      // Effacer le message de réussite après 3 secondes
      setTimeout(() => this.successMsg = '', 3000);

    } catch (e) {

      // Afficher un message si la mise à jour échoue
      this.errorMsg = "Erreur lors de la mise à jour.";
    }
  }

  // Fonction appelée pour annuler et retourner à la page d'accueil
  annuler() {
    this.router.navigate(['/accueil']);
  }
}