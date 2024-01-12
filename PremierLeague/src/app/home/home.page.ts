import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Dialog } from '@capacitor/dialog';
import { FootballService } from '../services/football.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  topScorers: any[] = [];
  seasons: string[] = ['2010','2019','2020', '2021', '2022'];
  selectedSeason: string = this.seasons[0];
  constructor(private navCtrl: NavController, private auth: AuthenticationService, private footballService: FootballService) {}

  // In your component
ngOnInit() {
  this.loadTopScorers();
}

loadTopScorers() {
  const leagueId = '39'; // The league ID for which you want top scorers
  this.footballService.getTopScorers(leagueId, this.selectedSeason).subscribe(
    topScorersData => {
      this.topScorers = topScorersData.map((scorer: any) => {
        return {
          name: scorer.player.name,
          goals: scorer.statistics[0].goals.total,
          team: scorer.statistics[0].team.name,
          photo: scorer.player.photo,
          // Add any other data you might need
        };
      });
    },
    error => {
      console.error('Error fetching top scorers:', error);
    }
  );
}



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


  async logout() {
    await this.auth.logout();
    // After logout, navigate to the login page or any other page as needed
  }
}
