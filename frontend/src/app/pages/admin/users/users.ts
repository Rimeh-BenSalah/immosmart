// Importe les outils Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importe Axios pour les requêtes HTTP
import axios from 'axios';

@Component({
  selector: 'app-admin-users', // Nom du composant
  standalone: true, // Composant autonome
  imports: [CommonModule], // Modules utilisés
  templateUrl: './users.html', // Fichier HTML
  styleUrl: './users.css' // Fichier CSS
})
export class Users implements OnInit {

  // Stocke la liste des utilisateurs
  users: any[] = [];

  // Définit les filtres par défaut
  filtreStatut = 'tous';
  filtreRole = 'tous';

  // Adresse du backend
  api = 'http://localhost:8084/admin/users';

  // Se lance au chargement du composant
  async ngOnInit() {
    await this.charger();
  }

  // Récupère la liste des utilisateurs depuis Spring
  async charger() {
    const res = await axios.get(
      `${this.api}/users_liste`,
      { withCredentials: true }
    );

    // Stocke les données reçues
    this.users = res.data;
  }

  // Modifie le filtre de statut
  setFiltreStatut(f: string) {
    this.filtreStatut = f;
  }

  // Modifie le filtre de rôle
  setFiltreRole(r: string) {
    this.filtreRole = r;
  }

  // Retourne les utilisateurs correspondant aux filtres
  get usersFiltres() {
    return this.users.filter(u => {

      // Vérifie le statut
      const matchStatut =
        this.filtreStatut === 'tous' || u.statut === this.filtreStatut;

      // Vérifie le rôle
      const matchRole =
        this.filtreRole === 'tous' || u.role === this.filtreRole;

      // Garde les utilisateurs qui correspondent aux deux filtres
      return matchStatut && matchRole;
    });
  }

  // Accepte un utilisateur en attente
  async accepter(id: number) {
    await axios.post(
      `${this.api}/user_accepter`,
      { id },
      { withCredentials: true }
    );

    await this.charger(); // Actualise la liste
  }

  // Refuse un utilisateur après confirmation
  async refuser(id: number) {
    if (!confirm('Refuser cet utilisateur ?')) return;

    await axios.post(
      `${this.api}/user_refuser`,
      { id },
      { withCredentials: true }
    );

    await this.charger();
  }

  // Suspend un utilisateur actif
  async suspendre(id: number) {
    await axios.post(
      `${this.api}/user_suspendre`,
      { id },
      { withCredentials: true }
    );

    await this.charger();
  }

  // Réactive un utilisateur suspendu
  async activer(id: number) {
    await axios.post(
      `${this.api}/user_activer`,
      { id },
      { withCredentials: true }
    );

    await this.charger();
  }

  // Supprime un utilisateur après confirmation
  async supprimer(id: number) {
    if (!confirm('Confirmer la suppression ?')) return;

    await axios.post(
      `${this.api}/user_supprimer`,
      { id },
      { withCredentials: true }
    );

    await this.charger();
  }
}