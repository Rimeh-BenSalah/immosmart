// Importer Component pour créer un composant Angular
// OnInit permet d'exécuter une fonction au démarrage du composant
import { Component, OnInit } from '@angular/core';

// Permet d'utiliser les fonctionnalités Angular comme *ngIf et *ngFor
import { CommonModule } from '@angular/common';

// Permet de récupérer les valeurs saisies dans les formulaires avec ngModel
import { FormsModule } from '@angular/forms';

// Importer Axios pour communiquer avec le backend
import axios from 'axios';

// Définir les informations du composant
@Component({
  selector: 'app-annonceur-demandes', // Nom utilisé pour appeler le composant
  standalone: true, // Indique que le composant est autonome
  imports: [CommonModule, FormsModule], // Modules utilisés dans le composant
  templateUrl: './demandes.html', // Fichier HTML associé
  styleUrl: './demandes.css' // Fichier CSS associé
})

// Créer la classe Demandes qui implémente OnInit
export class Demandes implements OnInit {

  // Tableau qui contient toutes les demandes reçues
  demandes: any[] = [];

  // Stocke l'identifiant de la demande actuellement ouverte
  // null signifie qu'aucune demande n'est ouverte
  demandeOuverteId: number | null = null;

  // Adresse du dossier contenant les fichiers Spring des demandes
  api = 'http://localhost:8083/annonceur/demandes';

  // Au démarrage, on charge la liste
  async ngOnInit() {
    // Appeler la fonction qui récupère les demandes depuis Spring
    await this.chargerDemandes();
  }

  // Fonction pour charger ou recharger la liste depuis le Spring
  async chargerDemandes() {
    try {
      // Envoyer une requête GET au fichier Spring pour récupérer les demandes
      // withCredentials permet d'envoyer le cookie de session Spring
      const res = await axios.get(`${this.api}/demandes_recues`, { withCredentials: true });

      // Mettre les données reçues dans le tableau demandes
      this.demandes = res.data;

    } catch (e) {
      // Afficher une erreur dans la console si le chargement échoue
      console.error("Erreur chargement", e);
    }
  }

  // Ouvrir / Fermer la carte
  toggleDemande(id: number) {

    // Vérifier si la demande cliquée est déjà ouverte
    if (this.demandeOuverteId === id) {

      // Si elle est déjà ouverte, la fermer
      this.demandeOuverteId = null;

    } else {

      // Sinon, ouvrir la demande en enregistrant son identifiant
      this.demandeOuverteId = id;
    }
  }

  // Envoyer la réponse
  async repondre(d: any) {

    // Vérifier si le champ réponse est vide ou contient seulement des espaces
    if (!d.reponse || !d.reponse.trim()) {
      alert('Veuillez écrire une réponse.');
      return; // Arrêter la fonction si aucune réponse n'est écrite
    }

    try {
      // 1. On envoie la réponse au Spring
      // On transmet l'identifiant de la demande et le texte de la réponse
      await axios.post(`${this.api}/demande_repondre`, { id: d.id, reponse: d.reponse }, { withCredentials: true });

      // Afficher un message pour confirmer l'envoi
      alert('Réponse envoyée avec succès !');

      // 2. On vide le champ de saisie
      d.reponse = '';

      // 3. On recharge la liste pour récupérer la vraie base de données
      await this.chargerDemandes();

      // 4. On ferme l'accordéon
      this.demandeOuverteId = null;

    } catch (e) {
      // Afficher un message si l'envoi échoue
      alert("Erreur lors de l'envoi.");
    }
  }
}