// Importer les outils nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';

// Définir le composant Photos
@Component({
  selector: 'app-photos', // Nom de la balise HTML
  standalone: true, // Composant autonome
  imports: [CommonModule, RouterLink], // Modules utilisés
  templateUrl: './photos.html', // Fichier HTML associé
  styleUrl: './photos.css' // Fichier CSS associé
})
export class Photos implements OnInit {

  // Variables utilisées dans la page
  annonceId: number = 0; // Identifiant de l'annonce
  photos: any[] = []; // Tableau contenant les photos
  api = 'http://localhost:8083/annonceur/photos'; // Adresse du backend

  // Injecter ActivatedRoute pour lire les paramètres de l'URL
  constructor(private route: ActivatedRoute) {}

  // Fonction exécutée automatiquement au chargement de la page
  async ngOnInit() {

    // Récupérer l'ID de l'annonce depuis l'URL
    // Le signe + transforme la valeur en nombre
    this.annonceId = +this.route.snapshot.params['id'];

    // Charger les photos de cette annonce
    await this.charger();
  }

  // Fonction pour récupérer les photos
  async charger() {
    try {
      // Envoyer une requête GET au backend avec l'ID de l'annonce
      const res = await axios.get(
        `${this.api}/photos_liste?id=${this.annonceId}`,
        { withCredentials: true }
      );

      // Stocker les photos reçues dans le tableau
      this.photos = res.data;

    } catch (error) {
      // Afficher l'erreur dans la console
      console.error('Erreur chargement photos', error);
    }
  }

  // Fonction pour ajouter une photo
  async onFileSelected(event: any) {

    // Récupérer le fichier choisi par l'utilisateur
    const file = event.target.files[0];

    // Arrêter si aucun fichier n'a été sélectionné
    if (!file) return;

    // Créer un objet FormData pour envoyer un fichier
    const formData = new FormData();

    // Ajouter l'image et l'identifiant de l'annonce
    formData.append('photo', file);
    formData.append('annonce_id', this.annonceId.toString());

    try {
      // Envoyer le fichier au backend
      await axios.post(
        `${this.api}/photo_ajouter`,
        formData,
        { withCredentials: true }
      );

      // Actualiser la galerie pour afficher la nouvelle photo
      await this.charger();

    } catch (error) {
      // Afficher un message si l'ajout échoue
      alert("Erreur lors de l'ajout de la photo. Vérifiez que le dossier uploads existe.");
      console.error(error);
    }
  }

  // Fonction pour supprimer une photo
  async supprimer(id: number) {

    // Demander une confirmation avant la suppression
    if (!confirm('Supprimer cette photo ?')) return;

    try {
      //Ton code fonctionne avec POST parce que le fichier Spring reçoit l'identifiant et effectue la suppression
      // Envoyer l'identifiant de la photo au backend
      await axios.post(
        `${this.api}/photo_supprimer`,
        { id },
        { withCredentials: true }
      );

      // Actualiser la galerie après la suppression
      await this.charger();

    } catch (error) {
      // Afficher l'erreur dans la console
      console.error('Erreur suppression photo', error);
    }
  }
}