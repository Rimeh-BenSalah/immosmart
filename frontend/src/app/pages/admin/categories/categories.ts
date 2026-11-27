import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngFor et *ngIf
import { FormsModule } from '@angular/forms';   // Pour [(ngModel)] (le champ de saisie)
import axios from 'axios';                      // Pour communiquer avec Spring

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  
  //Le tableau qui va contenir toutes les catégories (Villa, Appartement...)
  categories: any[] = [];
  
  //La variable liée au champ de saisie (pour ajouter une catégorie)
  nouveauNom = '';
  
  //L'URL de base de nos fichiers Spring pour l'admin
  api = 'http://localhost:8084/admin/categories';

  //S'exécute dès l'ouverture de la page
  async ngOnInit() { 
    await this.charger(); 
  }

  //CHARGER LA LISTE 
  async charger() {
    // On demande au Spring de nous envoyer toutes les catégories
    const res = await axios.get(`${this.api}/categories_liste`, { withCredentials: true });
    this.categories = res.data;
  }

  // AJOUTER UNE CATÉGORIE 
  async ajouter() {
    // Si le champ est vide, on ne fait rien (sécurité)
    if (!this.nouveauNom) return;
    
    // On envoie le nom au Spring pour l'insérer dans la base
    await axios.post(`${this.api}/categorie_ajouter`, { nom: this.nouveauNom }, { withCredentials: true });
    
    // On vide le champ de saisie
    this.nouveauNom = '';
    
    // On recharge la liste pour voir la nouvelle catégorie
    await this.charger();
  }

  //  MODIFIER UNE CATÉGORIE 
  async modifier(c: any) {
    // On utilise la petite pop-up native du navigateur pour demander le nouveau nom
    // 'c.nom' est la valeur par défaut affichée
    const nom = prompt('Nouveau nom :', c.nom);
    
    // Si l'admin clique sur "Annuler" ou laisse vide, on s'arrête
    if (!nom) return;
    
    // On envoie l'ID et le nouveau nom au Spring
    await axios.post(`${this.api}/categorie_modifier`, { id: c.id, nom }, { withCredentials: true });
    
    // On recharge la liste
    await this.charger();
  }

  //  SUPPRIMER UNE CATÉGORIE 
  async supprimer(id: number) {
    // On demande une confirmation (pour éviter les erreurs)
    if (!confirm('Confirmer ?')) return;
    
    // On envoie l'ID au Spring pour qu'il supprime la ligne
    await axios.post(`${this.api}/categorie_supprimer`, { id }, { withCredentials: true });
    
    // On recharge la liste
    await this.charger();
  }
}