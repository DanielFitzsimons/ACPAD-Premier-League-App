// premier-league.component.ts
import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.scss']
})
export class PremierLeagueComponent implements OnInit {

  league: any;
  seasons: any[] = []; // Initialize seasons array
  country: any;
  selectedSeason: number = 0;
  standings: any[] = []; // Initialize standings array

  constructor(private footballService: FootballService, private navctrl: NavController) {}

  ngOnInit(): void {
    const desiredLeagueId = '39'; // Replace with the actual league ID
    this.footballService.getLeagueById(desiredLeagueId).subscribe(
      (response) => {
        console.log('League Information:', response);
        this.country = response?.country;
        this.league = response?.league;
        this.seasons = response?.seasons || []; // Ensure seasons is an array, even if empty
        this.selectedSeason = this.seasons.length > 0 ? this.seasons[0].year : 0; // Set the default season if available

        console.log('Country:', this.country);
        console.log('League:', this.league);
        console.log('Seasons:', this.seasons);

        // Fetch standings for the selected season
        this.fetchStandingsForSeason(this.selectedSeason);
      },
      (error) => {
        console.error('Error fetching league information:', error);
      }
    );
  }

  goHome() {
    this.navctrl.navigateForward('/home');
  }

  onSeasonChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedSeason = parseInt(selectedValue, 10);
    // Fetch standings or other data for the selected season
    this.fetchStandingsForSeason(this.selectedSeason);
  }


  private fetchStandingsForSeason(selectedSeason: number) {
    const leagueId = '39'; // Replace with the actual league ID
  
    this.footballService.getStandings(leagueId, selectedSeason.toString()).subscribe(
      (standingsData) => {
        console.log('Standings for Season:', this.selectedSeason, standingsData);
        this.standings = standingsData || [];
      },
      (error) => {
        console.error('Error fetching standings:', error);
      }
    );
  }
  
  


}
