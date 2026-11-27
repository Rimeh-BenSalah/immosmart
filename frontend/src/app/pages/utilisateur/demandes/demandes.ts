// Importer Component pour créer un composant Angular.
// OnInit permet d'exécuter une fonction au démarrage du composant.
import { Component, OnInit } from '@angular/core';

// Importer CommonModule pour utiliser *ngIf, *ngFor et d'autres fonctionnalités Angular.
import { CommonModule } from '@angular/common';

// Importer FormsModule pour utiliser [(ngModel)] dans le HTML.
import { FormsModule } from '@angular/forms';

// Importer RouterLink pour créer des liens de navigation.
import { RouterLink } from '@angular/router';

// Importer Axios pour communiquer avec le backend.
import axios from 'axios';

// Définir les informations du composant.
@Component({
  selector: 'app-demandes', // Nom de la balise HTML du composant.
  standalone: true, // Indique que le composant est autonome.
  imports: [CommonModule, FormsModule, RouterLink], // Modules utilisés dans le HTML.
  templateUrl: './demandes.html', // Fichier HTML du composant.
  styleUrl: './demandes.css' // Fichier CSS du composant.
})

// Créer la classe Demandes qui implémente OnInit.
export class Demandes implements OnInit {

  // Tableau qui contient les demandes récupérées depuis la base de données.
  demandes: any[] = [];

  // Stocke l'ID de la demande actuellement ouverte.
  // null signifie qu'aucune demande n'est ouverte.
  demandeOuverteId: number | null = null; // Gère l'ouverture

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

        // Envoyer une requête GET au backend pour récupérer les demandes correspondant à l'utilisateur.
        const res = await axios.get(`${this.api}/user/demandes/list?user_id=${user.id}`);

        // Stocker les demandes reçues dans le tableau demandes.
        this.demandes = res.data;

      } catch (e) {

        // Afficher une erreur dans la console si le chargement échoue.
        console.error("Erreur chargement demandes", e);
      }
    }
  }

  // Ouvre / Ferme la carte
  // Cette fonction reçoit l'ID de la demande sur laquelle on clique.
  toggleDemande(id: number) {

    // Vérifier si la demande cliquée est déjà ouverte.
    if (this.demandeOuverteId === id) {

      // Si elle est déjà ouverte, la fermer en remettant l'ID à null.
      this.demandeOuverteId = null;

    } else {

      // Sinon, enregistrer son ID pour ouvrir cette demande.
      this.demandeOuverteId = id;
    }
  }

  // Fonction permettant d'envoyer une réponse à une demande.
  // Elle reçoit l'objet d contenant les informations de la demande.
  async repondre(d: any) {

    // Vérifier si le champ réponse est vide ou contient seulement des espaces.
    if (!d.reponse || !d.reponse.trim()) {

      // Afficher un message si aucun texte n'a été saisi.
      alert('Veuillez écrire un message.');

      // Arrêter la fonction sans envoyer la requête.
      return;
    }

    try {

      // Envoyer une requête POST au backend avec l'ID de la demande
      // et le texte de la réponse.
      await axios.post(`${this.api}/user/demandes/repondre`, {
        id: d.id,
        reponse: d.reponse
      });

      // Afficher un message confirmant l'envoi de la réponse.
      alert('Votre réponse a été envoyée !');

      // Ajouter la réponse au message affiché dans la page,
      // avec des retours à la ligne et un titre.
      d.message += `\n\n--- Votre réponse ---\n${d.reponse}`;

      // Vider le champ de réponse après l'envoi.
      d.reponse = '';

    } catch (e) {

      // Afficher un message si l'envoi de la réponse échoue.
      alert("Erreur lors de l'envoi.");
    }
  }
}