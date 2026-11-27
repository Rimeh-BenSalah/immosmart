import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-admin-annonces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annonces.html',
  styleUrl: './annonces.css'
})
export class Annonces implements OnInit {
  // On crée un tableau vide qui va accueillir les annonces venant de la base de données
  annonces: any[] = [];
  //L'adresse de base de nos fichiers Spring pour l'Admin
  api = 'http://localhost:8084/admin/annonces';

  // Dès que la page s'ouvre, on charge la liste des annonces
  async ngOnInit() {
    await this.charger();
  }

  // CHARGER LA LISTE 
  async charger() {
    // On demande au Spring de nous envoyer toutes les annonces (avec le nom de l'annonceur)
    const res = await axios.get(
      `${this.api}/annonces_liste`,
      { withCredentials: true }// On envoie le cookie pour prouver qu'on est Admin
    );
     // On remplit notre tableau avec les données reçues
    this.annonces = res.data;
  }

  //VALIDER (en_attente → validee)
  async valider(id: number) {
    await axios.post(
      `${this.api}/annonce_valider`,
      { id },
      { withCredentials: true }
    );
    await this.charger();
  }

  // Refuse une annonce en attente
  async refuser(id: number) {

    // Demande confirmation avant le refus
    if (!confirm('Refuser cette annonce ?')) return;

    // Envoie l'identifiant de l'annonce au backend
    await axios.post(
      `${this.api}/annonce_refuser`,
      { id },
      { withCredentials: true }
    );

    // Recharge la liste des annonces
    await this.charger();
  }

  //  DÉSACTIVER (validee → desactivee) 
  async desactiver(id: number) {
  if (!confirm('Désactiver cette annonce ?')) return;
  
  try {
    const res = await axios.post(
      `${this.api}/annonce_desactiver`,
      { id },
      { withCredentials: true }
    );
    await this.charger(); // Ça a marché, on recharge
  } catch (err: any) {
    // Si le fichier Spring n'existe pas ou plante, on affiche l'erreur
    alert("Erreur lors de la désactivation : " + (err.response?.status || err.message));
  }
}

  // SUPPRIMER 
  async supprimer(id: number) {
    if (!confirm('Supprimer définitivement cette annonce ?')) return;
    await axios.post(
      `${this.api}/annonce_supprimer`,
      { id },
      { withCredentials: true }
    );
    await this.charger();
  }
}