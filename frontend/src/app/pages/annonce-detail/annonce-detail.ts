import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import axios from 'axios';

// Structure d'une photo
interface Photo { id?: number; url: string; }

// Structure des informations d'une annonce
interface Annonce {
  id: number; titre: string; description: string; prix: number;
  surface: number; nombre_pieces: number; etat: string;
  region_nom: string; categorie_nom: string; transaction_nom: string;
  type_transaction_id?: number | string;
  user_nom: string; user_prenom: string; user_telephone: string;
  photos?: Photo[];
}

@Component({
  selector: 'app-annonce-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './annonce-detail.html',
  styleUrl: './annonce-detail.css'
})
export class AnnonceDetail implements OnInit {
  annonce: Annonce | null = null;
  isLoggedIn = false;

  // Formulaire de contact
  message = '';
  demandeEnvoyee = false;
  erreurMessage = '';

  // Gestion des favoris
  isFavori = false;
  messageFavori = '';
  typeMessageFavori = '';

  // Image actuellement affichée
  currentImageIndex = 0;

  api = 'http://localhost:8081';
  apiUser = 'http://localhost:8082';

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    // Vérifie la connexion et récupère l'ID de l'annonce depuis l'URL
    this.isLoggedIn = !!localStorage.getItem('user');
    const id = this.route.snapshot.params['id'];

    try {
      // Charge les détails de l'annonce
      const res = await axios.get<Annonce>(`${this.api}/public/annonce_detail?id=${id}`);
      this.annonce = res.data;

      // Vérifie si l'annonce est déjà dans les favoris
      if (this.isLoggedIn && this.annonce) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const resFavoris = await axios.get(`${this.apiUser}/user/favoris/list?user_id=${user.id}`);
        this.isFavori = resFavoris.data.some((f: any) => f.id === this.annonce?.id);
      }

    } catch (e) {
      console.error('Erreur chargement annonce', e);
    }
  }

  // Vérifie si le type de transaction correspond à une vente
  isVente(): boolean {
    if (!this.annonce) return false;

    const nom = (this.annonce.transaction_nom || '').toLowerCase();
    const id = this.annonce.type_transaction_id;

    return nom.includes('vente') || id === 1 || id === '1' || id === 2 || id === '2';
  }

  // Passe à l'image suivante
  nextImage() {
    if (this.annonce && this.annonce.photos) {
      if (this.currentImageIndex < this.annonce.photos.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0; // Revient à la première image
      }
    }
  }

  // Passe à l'image précédente
  prevImage() {
    if (this.annonce && this.annonce.photos) {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.annonce.photos.length - 1; // Revient à la dernière image
      }
    }
  }

  // Envoie une demande de contact au propriétaire
  async envoyerDemande() {
    if (!this.message.trim()) {
      this.erreurMessage = 'Veuillez écrire un message avant d\'envoyer.';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id || !this.annonce) return;

    this.erreurMessage = '';

    try {
      await axios.post(`${this.apiUser}/user/demandes/add`, {
        user_id: user.id,
        annonce_id: this.annonce.id,
        message: this.message
      });

      this.demandeEnvoyee = true;
      this.message = '';
      setTimeout(() => this.demandeEnvoyee = false, 4000);
    } catch (e) {
      this.erreurMessage = "Erreur lors de l'envoi de la demande.";
    }
  }

  // Ajoute ou retire l'annonce des favoris
  async toggleFavori() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.annonce) return;

    try {
      if (this.isFavori) {
        await axios.post(`${this.apiUser}/user/favoris/remove`, { 
          user_id: user.id, 
          annonce_id: this.annonce.id 
        });
        this.isFavori = false;
        this.afficherMessageFavori('Retiré des favoris', 'success');
      } else {
        await axios.post(`${this.apiUser}/user/favoris/add`, { 
          user_id: user.id, 
          annonce_id: this.annonce.id 
        });
        this.isFavori = true;
        this.afficherMessageFavori('Ajouté à vos favoris', 'success');
      }
    } catch (e: any) {
      this.afficherMessageFavori('Erreur lors de l\'opération', 'error');
    }
  }

  // Affiche un message temporaire après une action sur les favoris
  afficherMessageFavori(msg: string, type: string) {
    this.messageFavori = msg;
    this.typeMessageFavori = type;
    setTimeout(() => this.messageFavori = '', 3000);
  }
}