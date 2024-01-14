import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController, PopoverController  } from '@ionic/angular';
import { TeamsSquadsPopoverComponent } from 'src/app/info/teams-squads-popover/teams-squads-popover.component';
@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  teamIds = [33, 34, 35, 36, 39, 40, 42, 44, 45, 47, 48, 49, 50, 51, 52, 55, 62, 65, 66];
  selectedTeamId: number | null = null; 
  players: any[] = [];
  teamInfo: any;

  constructor(private footballService: FootballService, private navCtrl: NavController, private popoverController: PopoverController) {}

  ngOnInit() {
    this.selectedTeamId = this.teamIds[0];
    this.loadTeamPlayers();
  }

  loadTeamPlayers() {
    if (this.selectedTeamId) {
      this.footballService.getTeamPlayers(this.selectedTeamId).subscribe(
        data => {
          this.players = data.players; // Assign the players data to the array
          this.teamInfo = data.team; // Assign the team data to the teamInfo property
        },
        error => {
          console.error('There was an error retrieving the team players:', error);
        }
      );
    }
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TeamsSquadsPopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  goHome(){
    this.navCtrl.navigateForward('/home');
  }
  
}
