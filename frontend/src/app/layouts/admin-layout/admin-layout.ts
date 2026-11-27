// Il permet de déclarer une classe comme étant un composant Angular.
import { Component } from '@angular/core';
// Importation des fonctionnalités de navigation Angular :
// RouterLink : permet de créer des liens de navigation entre les pages.
// RouterLinkActive : permet d'ajouter une classe CSS au lien actif.
// RouterOutlet : permet d'afficher dynamiquement les composants selon la route.
// Router : permet de gérer la navigation par programmation.Contrairement à RouterLink, il permet de déclencher une navigation à partir d'une méthode
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
// Importation du service d'authentification personnalisé.
// Ce service permet de gérer les opérations liées à la connexion et à la déconnexion.
import { AuthService } from '../../services/auth.service';

// Décorateur Angular permettant de configurer le composant AdminLayout
@Component({

  // Nom du sélecteur HTML permettant d'utiliser ce composant
  selector: 'app-admin-layout',

  // Indique que le composant est autonome (Standalone).Il n'a pas besoin d'être déclaré dans un NgModule.
  standalone: true,

  // Liste des directives Angular utilisées dans le fichier HTML.
  // RouterLink : permet de naviguer entre les différentes pages.
  // RouterLinkActive : permet de détecter et styliser le lien actif.
  // RouterOutlet : permet d'afficher dynamiquement les composants selon la route.
  imports: [RouterLink, RouterLinkActive, RouterOutlet],

  // Indique le chemin du fichier HTML contenant la structure et les éléments visuels du composant.
  templateUrl: './admin-layout.html',

  // Indique le chemin du fichier CSS contenant les styles et la mise en forme du composant.
  styleUrl: './admin-layout.css'

})
// Classe qui gère la logique du layout administrateur
export class AdminLayout {

  // Injection du service d'authentification et du service de navigation
  constructor(private auth: AuthService, private router: Router) {}

  // Méthode permettant de déconnecter l'administrateur
  async deconnexion() {

    // Effectue la déconnexion et attend sa fin
    await this.auth.logout();

    // Redirige l'utilisateur vers la page d'accueil
    this.router.navigate(['/accueil']);
  }
}