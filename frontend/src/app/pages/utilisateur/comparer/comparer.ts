// Importer Component pour créer un composant Angular.
// OnInit permet d'exécuter du code au démarrage du composant.
import { Component, OnInit } from '@angular/core';

// Importer CommonModule pour utiliser *ngIf, *ngFor et d'autres fonctionnalités Angular.
import { CommonModule } from '@angular/common';

// Importer FormsModule pour utiliser les formulaires et ngModel.
import { FormsModule } from '@angular/forms';

// Importer ActivatedRoute pour récupérer les paramètres de l'URL.
// RouterLink permet de créer des liens de navigation.
import { ActivatedRoute, RouterLink } from '@angular/router';

// Importer Axios pour communiquer avec le backend.
import axios from 'axios';

// Définir les informations du composant.
@Component({
  selector: 'app-comparer', // Nom de la balise HTML du composant.
  standalone: true, // Indique que le composant est autonome.
  imports: [CommonModule, FormsModule, RouterLink], // Modules utilisés dans le HTML.
  templateUrl: './comparer.html', // Fichier HTML du composant.
  styleUrl: './comparer.css' // Fichier CSS du composant.
})

// Créer la classe Comparer qui implémente OnInit.
export class Comparer implements OnInit {

  // Tableau qui contient les annonces à comparer.
  annonces: any[] = [];

  // Adresse principale du backend.
  api = 'http://localhost:8081';

  // Objet qui contient les critères de comparaison.
  // true signifie que le critère est activé.
  // false signifie que le critère est désactivé.
  priorites: any = {
    prix: true, region: true, surface: true, 
    pieces: true, etat: true, categorie: true
  };

  // Définir le mode d'affichage par défaut et complete signifie que tous les critères sont affichés.
  viewMode: string = 'complete';

  // Constructeur qui récupère ActivatedRoute.
  // Il permet de lire les paramètres présents dans l'URL.
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {

    // Écouter les changements des paramètres de l'URL.
    this.route.queryParams.subscribe(async params => {

      // Vérifier si le paramètre ids existe dans l'URL.
      if (params['ids']) {

        // Récupérer les identifiants des annonces à comparer.
        const ids = params['ids']; 

        try {

          // Envoyer une requête GET au backend pour récupérer les annonces correspondant aux identifiants reçus.
          const res = await axios.get(`${this.api}/public/annonces_publiques?ids=${ids}`);

          this.annonces = res.data;

        } catch (e) {

          console.error("Erreur chargement annonces", e);
        }
      }
    });
  }

  // Fonction permettant d'activer ou de désactiver un critère de comparaison.
  togglePriorite(key: string) {

    // Inverser la valeur du critère :
    // true devient false et false devient true.
    this.priorites[key] = !this.priorites[key];
  }

  // Fonction qui vérifie si une caractéristique est identique
  isIdentique(key: string): boolean {

    // S'il y a moins de deux annonces, retourner true.
    if (this.annonces.length < 2) return true;

    // Adapter le nom de la propriété selon le critère demandé :
    // region devient region_nom et categorie devient categorie_nom.
    // Les autres noms restent identiques.
    const dbKey = key === 'region' ? 'region_nom' : (key === 'categorie' ? 'categorie_nom' : key);

    // Récupérer la valeur du critère dans la première annonce.
    const firstValue = this.annonces[0][dbKey];

    // Vérifier que toutes les annonces possèdent la même valeur
    // pour ce critère que la première annonce.
    return this.annonces.every(a => a[dbKey] === firstValue);
  }

  // Fonction qui décide si un critère doit être affiché
  shouldDisplay(key: string): boolean {

    // Mode complet : afficher tous les critères.
    if (this.viewMode === 'complete') return true;

    // Mode différences : afficher uniquement les critères différents.
    if (this.viewMode === 'differences') return !this.isIdentique(key);

    // Mode similitudes : afficher uniquement les critères identiques.
    if (this.viewMode === 'similitudes') return this.isIdentique(key);

    // Si aucun des modes précédents ne correspond, afficher le critère.
    return true;
  }

  // Fonction qui transforme une valeur en texte et ajoute éventuellement une unité à la fin
  formatValue(value: any, suffix: string = ''): string {

    // Si la valeur est null, undefined ou vide,
    // afficher « Non renseigné ».
    if (value === null || value === undefined || value === '') return 'Non renseigné';

    // Sinon, convertir la valeur en texte et ajouter le suffixe.
    return value + suffix;
  }
}