import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  teamIds = [33, 34, 35, 36, 39, 40, 42, 44, 45, 47, 48, 49, 50, 51, 52, 55, 62, 65, 66];
  selectedTeamId: number | null = null; // Initially no team is selected
  players: any[] = [];

  constructor(private footballService: FootballService) {}

  ngOnInit() {
    // Optionally preload players for a default team or leave it until user selection
  }

  loadTeamPlayers() {
    if (this.selectedTeamId) {
      this.footballService.getTeamPlayers(this.selectedTeamId).subscribe(
        players => {
          this.players = players; // Assign the players data to the array
        },
        error => {
          console.error('There was an error retrieving the team players:', error);
        }
      );
    }
  }
}
