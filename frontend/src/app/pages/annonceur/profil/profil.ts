// Importer les outils nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';

// Définir le composant Profil
@Component({
  selector: 'app-profil', // Nom de la balise HTML
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule, RouterLink], // Modules utilisés
  templateUrl: './profil.html', // Fichier HTML associé
  styleUrl: './profil.css' // Fichier CSS associé
})
export class Profil implements OnInit {

  // Objet qui contient les informations du profil
  profil: any = {
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  };

  mot_de_passe = ''; // Nouveau mot de passe
  message = ''; // Message à afficher
  api = 'http://localhost:8081'; // Adresse du backend

  // Injecter le Router pour permettre la navigation
  constructor(private router: Router) {}

  // Fonction exécutée automatiquement au chargement du composant
  async ngOnInit() {
    await this.chargerProfil();
  }

  // Récupérer les informations de l'utilisateur connecté
  async chargerProfil() {
    try {
      // Envoyer une requête GET au fichier Spring
      // withCredentials permet d'envoyer le cookie de session Spring
      const res = await axios.get(
        `${this.api}/auth/me`,
        { withCredentials: true }
      );

      // Stocker les données reçues dans l'objet profil
      this.profil = res.data;

    } catch (error) {
      // Afficher l'erreur dans la console
      console.error('Erreur chargement profil', error);
    }
  }

  // Fonction appelée pour enregistrer les modifications du profil
  async enregistrer() {
    try {
      // Envoyer les nouvelles informations au backend
      await axios.post(
        `http://localhost:8083/annonceur/profil_modifier`,
        {
          //Il permet de copier toutes les propriétés de l'objet this.profil
          ...this.profil, 
          mot_de_passe: this.mot_de_passe
        },
        { withCredentials: true }
      );

      // Récupérer les informations de l'utilisateur depuis localStorage
      const userLocal = JSON.parse(localStorage.getItem('user') || '{}');

      // Mettre à jour le nom et le prénom enregistrés localement
      // pour actualiser leur affichage dans la navbar
      userLocal.nom = this.profil.nom;
      userLocal.prenom = this.profil.prenom;

      // Enregistrer les nouvelles informations dans localStorage
      localStorage.setItem('user', JSON.stringify(userLocal));

      // Rediriger vers la page "Mes annonces"
      this.router.navigate(['/annonceur/mes-annonces']);

    } catch (error) {
      // Afficher l'erreur dans la console et un message à l'écran
      console.error('Erreur modification profil', error);
      alert('Erreur lors de la modification du profil.');
    }
  }
}