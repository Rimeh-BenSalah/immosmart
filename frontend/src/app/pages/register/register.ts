// Importer les outils nécessaires d'Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Définir le composant d'inscription
@Component({
  selector: 'app-register', // Nom de la balise HTML du composant
  standalone: true, // Composant autonome
  imports: [FormsModule, RouterLink, CommonModule], // Modules utilisés
  templateUrl: './register.html', // Fichier HTML associé
  styleUrl: './register.css' // Fichier CSS associé
})
export class Register {

  // Variables qui contiennent les informations du formulaire
  nom = '';
  prenom = '';
  email = '';
  telephone = '';
  mot_de_passe = '';
  role = 'utilisateur'; // Rôle par défaut
  erreur = ''; // Message d'erreur à afficher

  // Injecter le service d'authentification et le routeur
  constructor(private auth: AuthService, private router: Router) {}

  // Fonction appelée lors de l'inscription
  async sInscrire() {
    try {
      // Envoyer les informations au backend avec AuthService
      await this.auth.register({
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
        mot_de_passe: this.mot_de_passe,
        role: this.role
      });

      // Si l'inscription réussit, rediriger vers la connexion
      this.router.navigate(['/login']);

    } catch (e: any) {
      // Récupérer le message d'erreur envoyé par le backend
      // ou afficher un message par défaut
      this.erreur = e.response?.data?.error || 'Erreur inscription';
    }
  }
}