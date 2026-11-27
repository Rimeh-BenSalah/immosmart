// Importation du décorateur Injectable d'Angular
import { Injectable } from '@angular/core';

// Importation d'Axios pour communiquer avec le backend
import axios from 'axios';

// Permet d'utiliser ce service dans toute l'application
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // URL de base du backend
  api = 'http://localhost:8081';

  // Fonction de connexion de l'utilisateur
  async login(email: string, mot_de_passe: string) {

    // Envoie une requête POST au backend pour vérifier les informations de connexion,await : attend la réponse du serveur
    const res = await axios.post(
      // Adresse du fichier Spring responsable de la connexion
      `${this.api}/auth/login`,
      // Données envoyées au backend : email et mot de passe
      { email, mot_de_passe },
      // Autorise l'envoi et la réception des cookies avec la requête
      { withCredentials: true }
    );

    // Vérifie que les données de l'utilisateur existent
    if (res.data && res.data.user) {
      // Convertit l'utilisateur en JSON et le sauvegarde dans le navigateur
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    // Retourne la réponse du backend
    return res.data;
  }

  // Fonction d'inscription d'un nouvel utilisateur
  async register(data: any) {

    // Envoie les données d'inscription au backend
    const res = await axios.post(
      `${this.api}/auth/register`,
      data,
      { withCredentials: true }
    );

    // Sauvegarde l'utilisateur si l'inscription entraîne une connexion
    if (res.data && res.data.user) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    return res.data;
  }

  // Fonction de déconnexion de l'utilisateur
  async logout() {
    try {

      // Demande au backend de déconnecter l'utilisateur
      await axios.post(`${this.api}/auth/logout`, {}, { withCredentials: true });

    } catch (e) {

      // Affiche un avertissement si la déconnexion backend échoue
      console.warn('Déconnexion backend échouée, on nettoie le local');

    } finally {

      // Supprime les informations de l'utilisateur du localStorage
      localStorage.removeItem('user');
    }
  }

  // Récupère les informations de l'utilisateur connecté
  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Vérifie si un utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // Récupère le rôle de l'utilisateur (admin, utilisateur, etc.)
  getRole(): string {
    return this.getUser()?.role || '';
  }

  // Récupère l'identifiant de l'utilisateur
  getUserId(): number {
    return this.getUser()?.id || 0;
  }
}