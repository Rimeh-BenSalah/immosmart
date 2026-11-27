// Importer les outils Angular nécessaires.
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {

  // Données des annonces, régions et catégories.
  annonces: any[] = [];
  regions: any[] = [];
  categories: any[] = [];
  api = 'http://localhost:8081';

  // Informations concernant la connexion et le menu utilisateur.
  isLoggedIn = false;
  isMenuOpen = false;
  userPrenom = '';
  userInitial = 'U';

  // Critères de recherche.
  // "Tout" est sélectionné par défaut.
  type_recherche = 'tous'; 
  type_transaction = ''; 
  search = ''; categorie_id = ''; region = ''; prix_max = ''; surface_min = ''; pieces_min = '';

  constructor(private router: Router) {}

  // Fonction exécutée au chargement de la page.
  async ngOnInit() {

    // Vérifier si un utilisateur est connecté.
    this.isLoggedIn = !!localStorage.getItem('user');

    if (this.isLoggedIn) {
      // Récupérer le prénom et sa première lettre.
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userPrenom = user.prenom || 'Utilisateur';
      this.userInitial = user.prenom ? user.prenom.charAt(0).toUpperCase() : 'U';
    }

    // Charger les régions et catégories en parallèle.
    const [r, c] = await Promise.all([
      axios.get(`${this.api}/public/regions`),
      axios.get(`${this.api}/public/categories`)
    ]);
    this.regions = r.data;
    this.categories = c.data;

    // Charger les annonces.
    await this.rechercher();
  }

  // Ouvrir ou fermer le menu utilisateur.
  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }

  // Détecter les clics effectués en dehors du menu.
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) this.isMenuOpen = false;
  }

  // Choisir le type de recherche : tous, vente ou location.
  setTypeRecherche(type: string) {
    this.type_recherche = type;

    if (type === 'vente') {
      this.type_transaction = '2'; 
    } else if (type === 'location') {
      this.type_transaction = '1';
    } else {
      // Réinitialiser les filtres si "Tout" est sélectionné.
      this.type_transaction = '';
      this.search = '';
      this.categorie_id = '';
      this.region = '';
      this.prix_max = '';
      this.surface_min = '';
      this.pieces_min = '';
    }

    // Actualiser les résultats.
    this.rechercher();
  }

  // Rechercher les annonces selon les filtres sélectionnés.
  async rechercher() {
    const url = `${this.api}/public/annonces_publiques?search=${this.search}&type_transaction=${this.type_transaction}&categorie_id=${this.categorie_id}&region=${this.region}&prix_max=${this.prix_max}&surface_min=${this.surface_min}&pieces_min=${this.pieces_min}`;
    try {
      const res = await axios.get(url);
      this.annonces = res.data;
    } catch (error) {
      console.error('Erreur', error);
    }
  }

  // Aller vers la page des annonces avec les filtres sélectionnés.
  explorerBiens() {
    this.router.navigate(['/annonces'], {
      queryParams: {
        search: this.search || null,
        type_transaction: this.type_transaction || null,
        categorie_id: this.categorie_id || null,
        region: this.region || null,
        prix_max: this.prix_max || null,
        surface_min: this.surface_min || null,
        pieces_min: this.pieces_min || null
      }
    });
  }

  // Déconnecter l'utilisateur et revenir à l'accueil.
  deconnexion() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/accueil']);
  }
}