// Importer les outils nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import axios from 'axios';

// Définir le composant MesAnnonces
@Component({
  selector: 'app-mes-annonces', // Nom de la balise HTML
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule, RouterLink], // Modules utilisés
  templateUrl: './mes-annonces.html', // Fichier HTML associé
  styleUrl: './mes-annonces.css' // Fichier CSS associé
})
export class MesAnnonces implements OnInit {

  // Tableau qui contient les annonces de l'annonceur
  annonces: any[] = [];

  // Adresse du backend
  api = 'http://localhost:8083/annonceur/annonces';

  // Contrôle l'affichage du formulaire et son mode
  showForm = false; // Afficher ou cacher le formulaire
  editMode = false; // true = modification, false = ajout

  // Objet qui contient les données du formulaire
  form: any = {
    id: null,
    titre: '',
    description: '',
    prix: '',
    surface: '',
    nombre_pieces: '',
    etat: '',
    type_transaction_id: '',
    categorie_id: '',
    region_id: ''
  };

  // Tableaux qui contiennent les listes utilisées dans les menus déroulants
  typesTransaction: any[] = [];
  categories: any[] = [];
  regions: any[] = [];

  // Fonction exécutée automatiquement au chargement du composant
  async ngOnInit() {
    await this.chargerAnnonces(); // Charger les annonces
    await this.chargerListes(); // Charger les listes des menus
  }

  // Récupérer les annonces de l'annonceur connecté
  async chargerAnnonces() {
    const res = await axios.get(
      `${this.api}/mes_annonces`,
      { withCredentials: true }
    );

    // Stocker les annonces reçues dans le tableau
    this.annonces = res.data;
  }

  // Récupérer les types de transaction, catégories et régions
  async chargerListes() {
    // Exécuter les trois requêtes en même temps
    const [t1, c, r] = await Promise.all([
      axios.get(`http://localhost:8081/public/types_transaction`),
      axios.get(`http://localhost:8081/public/categories`),
      axios.get(`http://localhost:8081/public/regions`)
    ]);

    // Stocker les résultats dans les tableaux correspondants
    this.typesTransaction = t1.data;
    this.categories = c.data;
    this.regions = r.data;
  }

  // Ouvrir le formulaire pour ajouter une nouvelle annonce
  ouvrirAjout() {
    this.editMode = false; // Désactiver le mode modification

    // Vider le formulaire pour une nouvelle annonce
    this.form = {
      id: null,
      titre: '',
      description: '',
      prix: '',
      surface: '',
      nombre_pieces: '',
      etat: '',
      type_transaction_id: '',
      categorie_id: '',
      region_id: ''
    };

    this.showForm = true; // Afficher le formulaire
  }

  // Ouvrir le formulaire avec les données de l'annonce à modifier
  ouvrirModif(a: any) {
    this.editMode = true; // Activer le mode modification
    this.form = { ...a }; // Copier les données de l'annonce
    this.showForm = true; // Afficher le formulaire
  }

  // Fermer le formulaire
  fermerForm() {
    this.showForm = false;
  }

  // Vérifier si les champs obligatoires sont remplis
  isFormValid(): boolean {
    return !!(
      this.form.titre &&
      this.form.prix &&
      this.form.type_transaction_id &&
      this.form.categorie_id &&
      this.form.region_id
    );
  }

  // Ajouter ou modifier une annonce
  async enregistrer() {

    // Vérifier que les champs obligatoires sont remplis
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return; // Arrêter la fonction si le formulaire est invalide
    }

    try {
      // Si on est en mode modification
      if (this.editMode) {
        await axios.post(
          `${this.api}/annonce_modifier`,
          this.form,
          { withCredentials: true }
        );
      } else {
        // Sinon, ajouter une nouvelle annonce
        await axios.post(
          `${this.api}/annonce_ajouter`,
          this.form,
          { withCredentials: true }
        );
      }

      // Fermer le formulaire et actualiser la liste des annonces
      this.fermerForm();
      await this.chargerAnnonces();

      // Afficher un message de confirmation
      alert('Annonce enregistrée avec succès !');

    } catch (e) {
      // Afficher un message si l'enregistrement échoue
      alert("Erreur lors de l'enregistrement.");
    }
  }

  // Supprimer une annonce
  async supprimer(id: number) {

    // Demander une confirmation avant la suppression
    if (!confirm('Confirmer la suppression de cette annonce ?')) return;

    // Envoyer l'identifiant de l'annonce au backend
    await axios.post(
      `${this.api}/annonce_supprimer`,
      { id },
      { withCredentials: true }
    );

    // Actualiser la liste après la suppression
    await this.chargerAnnonces();
  }
}