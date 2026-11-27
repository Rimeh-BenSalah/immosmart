import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';// L'outil pour faire des requêtes HTTP

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  //On crée un objet vide qui va recevoir toutes les statistiques (users, annonces, etc.)
  stats: any = {};
  //On crée une variable pour afficher la date du jour
  today = '';

  // // S'exécute automatiquement au chargement du composant
  async ngOnInit() {
    //On génère la date d'aujourd'hui en français
    this.today = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    try {
      //On appelle le backend (dashboard) pour récupérer toutes les statistiques
      const res = await axios.get(
        'http://localhost:8084/admin/dashboard',
        { withCredentials: true }// On envoie le cookie pour prouver qu'on est Admin
      );
      //// Récupère les données reçues du backend
      this.stats = res.data;
    } catch (e) {
      //// Affiche l'erreur si la requête échoue
      console.error(e);
    }
  }
}