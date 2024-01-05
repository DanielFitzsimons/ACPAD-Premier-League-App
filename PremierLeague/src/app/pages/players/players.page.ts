import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  players: any[] = [];

  constructor(private footballService: FootballService) {}

  
  ngOnInit() {
    this.footballService.getPlayers('33').subscribe(
      (data) => {
        console.log(data); // Or process data as needed
        this.players = data; // Assign data to your component's property
      },
      (error) => {
        console.error('Error fetching players:', error);
      }
    );
  }

}
