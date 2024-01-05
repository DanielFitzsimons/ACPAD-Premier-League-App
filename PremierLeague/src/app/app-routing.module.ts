import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PremierLeagueComponent } from './premier-league/premier-league.component';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'fixtures',
    loadChildren: () => import('./pages/fixtures/fixtures.module').then( m => m.FixturesPageModule)
  },
  {
    path: 'premier-league',
    component: PremierLeagueComponent
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
