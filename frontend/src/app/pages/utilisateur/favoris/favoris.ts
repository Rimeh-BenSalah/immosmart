// Importer Component pour créer un composant Angular.
// OnInit permet d'exécuter du code au démarrage du composant.
import { Component, OnInit } from '@angular/core';

// Importer CommonModule pour utiliser des fonctionnalités comme *ngIf et *ngFor.
import { CommonModule } from '@angular/common';

// Importer RouterLink pour créer des liens de navigation entre les pages.
import { RouterLink } from '@angular/router';

// Importer Axios pour communiquer avec le backend.
import axios from 'axios';

// Définir les informations du composant Angular.
@Component({
  selector: 'app-favoris', // Nom de la balise HTML du composant.
  standalone: true, // Indique que le composant est autonome.
  imports: [CommonModule, RouterLink], // Modules utilisés dans le fichier HTML.
  templateUrl: './favoris.html', // Fichier HTML du composant.
  styleUrl: './favoris.css' // Fichier CSS du composant.
})

// Créer la classe Favoris qui implémente OnInit.
export class Favoris implements OnInit {

  // Tableau qui va contenir les annonces ajoutées aux favoris.
  favoris: any[] = [];

  // Adresse principale du backend.
  api = 'http://localhost:8082';

  // Fonction exécutée automatiquement au démarrage du composant.
  async ngOnInit() {

    // Récupérer les informations de l'utilisateur depuis localStorage.
    // Si aucune information n'existe, utiliser un objet vide.
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Vérifier si l'utilisateur possède un ID.
    if (user.id) {
      try {

        // Envoyer une requête GET au backend pour récupérer
        // les favoris de l'utilisateur correspondant à son ID.
        const res = await axios.get(`${this.api}/user/favoris/list?user_id=${user.id}`);

        // Récupérer les données reçues du backend et les stocker dans le tableau favoris.
        this.favoris = res.data;

      } catch (e) {

        // Afficher une erreur dans la console si le chargement échoue.
        console.error("Erreur chargement favoris", e);
      }
    }
  }

  // Fonction permettant de retirer une annonce des favoris.
  // Elle reçoit l'ID de l'annonce à supprimer.
  async retirer(id: number) {

    // Récupérer les informations de l'utilisateur depuis localStorage.
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {

      // Envoyer une requête POST au backend avec l'ID de l'utilisateur
      // et l'ID de l'annonce à retirer des favoris.
      await axios.post(`${this.api}/user/favoris/remove`, { user_id: user.id, annonce_id: id });

      // filter() crée un nouveau tableau en conservant uniquement les annonces dont l'ID est différent de celui à retirer.
      // Cela met à jour la liste sans recharger la page.
      this.favoris = this.favoris.filter(f => f.id !== id);

    } catch (e) {

      // Afficher une erreur dans la console si la suppression échoue.
      console.error("Erreur suppression favori", e);
    }
  }
}