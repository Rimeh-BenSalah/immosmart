// Importer les outils nécessaires d'Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Définir le composant de connexion
@Component({
  selector: 'app-login', // Nom de la balise HTML du composant
  standalone: true, // Composant autonome
  imports: [FormsModule, RouterLink, CommonModule], // Modules utilisés dans le composant
  templateUrl: './login.html', // Fichier HTML associé
  styleUrl: './login.css' // Fichier CSS associé
})
export class Login {

  // Variables liées au formulaire de connexion
  email = '';
  mot_de_passe = '';
  erreur = '';

  // Injecter le service d'authentification et le routeur
  constructor(private auth: AuthService, private router: Router) {}

  // Fonction appelée lorsque l'utilisateur veut se connecter
  async seConnecter() {
    try {
      // Envoyer l'email et le mot de passe au backend
      const res = await this.auth.login(this.email, this.mot_de_passe);

      // Récupérer le rôle de l'utilisateur connecté
      const role = res.user.role;

      // Rediriger selon le rôle de l'utilisateur
      if (role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (role === 'annonceur') {
        this.router.navigate(['/annonceur/mes-annonces']);
      } else {
        // Si c'est un client, aller vers la page d'accueil
        this.router.navigate(['/accueil']);
      }

    } catch (e: any) {
      // Afficher le message d'erreur renvoyé par le backend
      // ou un message général si aucun détail n'est disponible
      this.erreur = e.response?.data?.error || 'Erreur de connexion';
    }
  }
}