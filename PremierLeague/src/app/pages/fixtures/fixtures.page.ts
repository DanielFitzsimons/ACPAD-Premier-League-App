import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {

  fixtures: any[] = [];
  selectedSeason: string = '2020';
  constructor(private footballService: FootballService, private navctrl: NavController,) {}

  ngOnInit(): void {
    // Assuming you want to fetch fixtures for the 2020 season initially
    this.fetchFixturesForSeason(this.selectedSeason);
  }
  

  fetchFixturesForSeason(season: string): void {
    const leagueId = '39'; // Premier League ID
  
    this.footballService.getFixtures(leagueId, season).subscribe(
      (fixtures) => {
        console.log('Fixtures Data:', fixtures);
        this.fixtures = fixtures;
      },
      (error) => {
        console.error('Error fetching fixtures:', error);
      }
    );
  }
  
  onSeasonChange(newSeason: string): void {
    this.selectedSeason = newSeason;
    this.fetchFixturesForSeason(this.selectedSeason);
  }

  goHome(){
    this.navctrl.navigateForward('/home');
  }


}
