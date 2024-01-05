import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  goToPremierLeague() {
    // Use NavController to navigate to the Premier League component
    this.navCtrl.navigateForward('/premier-league');
  }

  goFixtures(){
    this.navCtrl.navigateForward('/fixtures');
  }

  seePlayers(){
    this.navCtrl.navigateForward('/players')
  }
}
