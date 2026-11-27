import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-annonceur-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './annonceur-layout.html',
  styleUrl: './annonceur-layout.css'
})
export class AnnonceurLayout implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // On récupère l'utilisateur stocké lors de la connexion
    this.user = this.auth.getUser();
  }

  async deconnexion() {
    await this.auth.logout();
    this.router.navigate(['/accueil']);
  }
}