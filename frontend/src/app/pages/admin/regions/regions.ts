// Importe les outils Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importe Axios pour communiquer avec Spring
import axios from 'axios';

@Component({
  selector: 'app-admin-regions', // Nom du composant
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule], // Modules utilisés
  templateUrl: './regions.html', // Fichier HTML
  styleUrl: './regions.css' // Fichier CSS
})
export class Regions implements OnInit {

  regions: any[] = []; // Liste des régions
  nouveauNom = ''; // Nom de la nouvelle région
  api = 'http://localhost:8084/admin/regions'; // Adresse du backend

  // Charge les régions au démarrage
  async ngOnInit() {
    await this.charger();
  }

  // Récupère toutes les régions depuis Spring
  async charger() {
    const res = await axios.get(
      `${this.api}/regions_liste`,
      { withCredentials: true }
    );

    this.regions = res.data; // Stocke les régions reçues
  }

  // Ajoute une nouvelle région
  async ajouter() {

    // Vérifie que le nom n'est pas vide
    if (!this.nouveauNom) return;

    // Envoie le nom au backend
    await axios.post(
      `${this.api}/region_ajouter`,
      { nom: this.nouveauNom },
      { withCredentials: true }
    );

    this.nouveauNom = ''; // Vide le champ
    await this.charger(); // Actualise la liste
  }

  // Modifie le nom d'une région
  async modifier(r: any) {

    // Demande le nouveau nom
    const nom = prompt('Nouveau nom :', r.nom);

    // Arrête si aucun nom n'est saisi
    if (!nom) return;

    // Envoie les modifications au backend
    await axios.post(
      `${this.api}/region_modifier`,
      { id: r.id, nom },
      { withCredentials: true }
    );

    await this.charger(); // Actualise la liste
  }

  // Supprime une région
  async supprimer(id: number) {

    // Demande confirmation
    if (!confirm('Confirmer ?')) return;

    // Envoie l'identifiant au backend
    await axios.post(
      `${this.api}/region_supprimer`,
      { id },
      { withCredentials: true }
    );

    await this.charger(); // Actualise la liste
  }
}