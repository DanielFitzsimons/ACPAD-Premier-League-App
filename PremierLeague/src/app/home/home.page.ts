import { Component, TemplateRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FootballService } from '../services/football.service';
import { PickerController, PopoverController } from '@ionic/angular';
import { AssistsPopoverComponent } from '../info/assists-popover/assists-popover.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  playerStats: any[] = [];
  seasons: string[] = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015','2014','2013', '2012', '2011', '2010'];
  selectedSeason: string = this.seasons[0];
  statType: 'scorers' | 'assists' = 'scorers';

  topScorersCount: number | undefined;

  constructor(private navCtrl: NavController, private auth: AuthenticationService, private footballService: FootballService, private pickerCtrl: PickerController, private popoverController: PopoverController ) {}

  // In your component
ngOnInit() {
  this.loadPlayerStats();
}

 loadPlayerStats() {
    const leagueId = '39';
    if (this.statType === 'scorers') {
      this.footballService.getTopScorers(leagueId, this.selectedSeason).subscribe(
        data => this.processPlayerStats(data),
        error => console.error('Error fetching player stats:', error)
      );
    } else {
      this.footballService.getTopAssists(leagueId, this.selectedSeason).subscribe(
        data => this.processPlayerStats(data),
        error => console.error('Error fetching player stats:', error)
      );
    }
  }

  processPlayerStats(data: any) {
    this.playerStats = data.map((item: any) => {
      return {
        name: item.player.name,
        count: this.statType === 'scorers' ? item.statistics[0].goals.total : item.statistics[0].goals.assists,
        team: item.statistics[0].team.name,
        photo: item.player.photo,
      };
    });
    this.topScorersCount = this.playerStats.length;
  }

  showScorers() {
    this.statType = 'scorers';
    this.loadPlayerStats();
  }

  showAssists() {
    this.statType = 'assists';
    this.loadPlayerStats();
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

  async openSeasonPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'season',
          options: this.seasons.map(season => ({ text: season, value: season }))
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.selectedSeason = value.season.value;
            this.loadPlayerStats();
          }
        }
      ]
    });
    await picker.present();
  }

  async presentPopover(ev: any, popoverContent: TemplateRef<any>) {
    const popover = await this.popoverController.create({
      component: AssistsPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async logout() {
    await this.auth.logout();
    
  }
}
