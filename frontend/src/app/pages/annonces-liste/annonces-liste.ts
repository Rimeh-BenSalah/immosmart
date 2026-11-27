import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-annonces-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './annonces-liste.html',
  styleUrl: './annonces-liste.css'
})
export class AnnoncesListe implements OnInit {
  annonces: any[] = [];

  // Gestion de l'utilisateur et du menu
  isLoggedIn = false;
  isMenuOpen = false;
  userPrenom = '';
  userInitial = 'U';

  // Annonces sélectionnées pour la comparaison
  selection: any[] = [];

  api = 'http://localhost:8081';

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    // Récupère les informations de l'utilisateur connecté
    this.isLoggedIn = !!localStorage.getItem('user');
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userPrenom = user.prenom || 'Utilisateur';
      this.userInitial = user.prenom ? user.prenom.charAt(0).toUpperCase() : 'U';
    }

    // Récupère les filtres depuis l'URL et charge les annonces
    this.route.queryParams.subscribe(async params => {
      const url = `${this.api}/public/annonces_publiques?search=${params['search'] || ''}&type_transaction=${params['type_transaction'] || ''}&categorie_id=${params['categorie_id'] || ''}&region=${params['region'] || ''}&prix_max=${params['prix_max'] || ''}&surface_min=${params['surface_min'] || ''}&pieces_min=${params['pieces_min'] || ''}`;

      try {
        const res = await axios.get(url);
        this.annonces = res.data;
      } catch (e) {
        console.error(e);
      }
    });
  }

  // Ouvre ou ferme le menu utilisateur
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Ferme le menu si on clique en dehors
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.isMenuOpen = false;
    }
  }

  // Déconnecte l'utilisateur et retourne à l'accueil
  deconnexion() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/accueil']);
  }

  // Gestion de la comparaison
  toggleSelection(annonce: any) {
    const index = this.selection.findIndex(a => a.id === annonce.id);

    if (index > -1) {
      this.selection.splice(index, 1);
    } else {
      if (this.selection.length < 3) {
        this.selection.push(annonce);
      } else {
        alert('Vous ne pouvez comparer que 3 biens maximum.');
      }
    }
  }

  // Vérifie si une annonce est sélectionnée
  isSelected(annonce: any): boolean {
    return this.selection.some(a => a.id === annonce.id);
  }

  // Envoie les IDs des annonces sélectionnées vers la page de comparaison
  comparer() {
    if (this.selection.length < 2) {
      alert('Veuillez sélectionner au moins 2 biens.');
      return;
    }
    const ids = this.selection.map(a => a.id).join(',');
    this.router.navigate(['/utilisateur/comparer'], { queryParams: { ids: ids } });
  }
}