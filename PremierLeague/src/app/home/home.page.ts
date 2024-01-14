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
  playerStats: any[] = []; // Array to store player statistics
  seasons: string[] = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  selectedSeason: string = this.seasons[0]; // Default selected season
  statType: 'scorers' | 'assists' = 'scorers'; // Default statistical type (scorers or assists)

  topScorersCount: number | undefined; // Count of top scorers

  constructor(
    private navCtrl: NavController,
    private auth: AuthenticationService,
    private footballService: FootballService,
    private pickerCtrl: PickerController,
    private popoverController: PopoverController
  ) {}

  // Component lifecycle hook, called after component initialization
  ngOnInit() {
    this.loadPlayerStats(); // Load player statistics when the component is initialized
  }

  // Method to load player statistics based on the selected season and statistical type
  loadPlayerStats() {
    const leagueId = '39'; // ID of the football league
    if (this.statType === 'scorers') {
      // Fetch top scorers data
      this.footballService.getTopScorers(leagueId, this.selectedSeason).subscribe(
        data => this.processPlayerStats(data),
        error => console.error('Error fetching player stats:', error)
      );
    } else {
      // Fetch top assists data
      this.footballService.getTopAssists(leagueId, this.selectedSeason).subscribe(
        data => this.processPlayerStats(data),
        error => console.error('Error fetching player stats:', error)
      );
    }
  }

  // Method to process and transform player statistics data
  processPlayerStats(data: any) {
    this.playerStats = data.map((item: any) => {
      return {
        name: item.player.name,
        count: this.statType === 'scorers' ? item.statistics[0].goals.total : item.statistics[0].goals.assists,
        team: item.statistics[0].team.name,
        photo: item.player.photo,
      };
    });
    this.topScorersCount = this.playerStats.length; // Update the count of top scorers
  }

  // Method to switch to display top scorers
  showScorers() {
    this.statType = 'scorers';
    this.loadPlayerStats();
  }

  // Method to switch to display top assists
  showAssists() {
    this.statType = 'assists';
    this.loadPlayerStats();
  }

  // Method to navigate to the Premier League component
  goToPremierLeague() {
    this.navCtrl.navigateForward('/premier-league');
  }

  // Method to navigate to the Fixtures component
  goFixtures() {
    this.navCtrl.navigateForward('/fixtures');
  }

  // Method to navigate to the Players component
  seePlayers() {
    this.navCtrl.navigateForward('/players');
  }

  // Method to open a season picker dialog
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

  // Method to present a popover for assists information
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AssistsPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  // Method to log out the user
  async logout() {
    await this.auth.logout();
  }
}
