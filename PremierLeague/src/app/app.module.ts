import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { PremierLeagueComponent } from './premier-league/premier-league.component';
import { FootballService } from './services/football.service';
import { AssistsPopoverComponent } from './info/assists-popover/assists-popover.component';
import { TeamsSquadsPopoverComponent } from './info/teams-squads-popover/teams-squads-popover.component';
@NgModule({
  declarations: [AppComponent, PremierLeagueComponent, AssistsPopoverComponent, TeamsSquadsPopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(),  AppRoutingModule, FormsModule, CommonModule, provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyChHLlEaPrZAEZIf-zYppHzxYucBxU8UMY",
    authDomain: "premierleagueapp-581df.firebaseapp.com",
    projectId: "premierleagueapp-581df",
    storageBucket: "premierleagueapp-581df.appspot.com",
    messagingSenderId: "1071009529689",
    appId: "1:1071009529689:web:86d3b918fbe011918bd648"
  },)), provideAuth(() => getAuth()),  provideFirestore(() => getFirestore()), HttpClientModule ],
  providers: [FootballService ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
