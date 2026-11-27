import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AnnonceurLayout } from './layouts/annonceur-layout/annonceur-layout';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Users } from './pages/admin/users/users';
import { Annonces } from './pages/admin/annonces/annonces';
import { Categories } from './pages/admin/categories/categories';
import { Regions } from './pages/admin/regions/regions';
import { MesAnnonces } from './pages/annonceur/mes-annonces/mes-annonces';
import { Demandes } from './pages/annonceur/demandes/demandes';
import { AuthGuard } from './guards/auth-guard';
import { Profil } from './pages/annonceur/profil/profil';
import { Photos } from './pages/annonceur/photos/photos';
import { Accueil } from './pages/accueil/accueil';
import { AnnonceDetail } from './pages/annonce-detail/annonce-detail';
import { AnnoncesListe } from './pages/annonces-liste/annonces-liste';

import { Profil as UtilisateurProfil } from './pages/utilisateur/profil/profil';
import { Favoris as UtilisateurFavoris } from './pages/utilisateur/favoris/favoris';
import { Demandes as UtilisateurDemandes } from './pages/utilisateur/demandes/demandes';

import { Comparer } from './pages/utilisateur/comparer/comparer';

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'accueil', component: Accueil },
  { path: 'annonce/:id', component: AnnonceDetail },
  { path: 'annonces', component: AnnoncesListe },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'annonces', component: Annonces },
      { path: 'categories', component: Categories },
      { path: 'regions', component: Regions }
    ]
  },
  {
    path: 'annonceur',
    component: AnnonceurLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'mes-annonces', component: MesAnnonces },
      { path: 'profil', component: Profil },
      { path: 'photos/:id', component: Photos },
      { path: 'demandes', component: Demandes }
    ]
  },
  {
  path: 'utilisateur',
  canActivate: [AuthGuard],
  children: [
    { path: 'profil', component: UtilisateurProfil },
    { path: 'favoris', component: UtilisateurFavoris },
    { path: 'demandes', component: UtilisateurDemandes },
    { path: 'comparer', component: Comparer },
    { path: '', redirectTo: 'profil', pathMatch: 'full' }
  ]
}
];