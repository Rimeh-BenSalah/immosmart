import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    //On vérifie si l'utilisateur est connecté (via le localStorage)
    if (this.auth.isLoggedIn()) return true;//la page s'affiche
    this.router.navigate(['/login']); //Si on n'est pas connecté, on redirige vers /login
    return false;// la page ne s'affiche pas
  }
}