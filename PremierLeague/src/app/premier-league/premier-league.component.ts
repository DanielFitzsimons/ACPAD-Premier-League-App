// premier-league.component.ts
import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController } from '@ionic/angular';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
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
    this.footballService.getLeagueById(desiredLeagueId)
    .pipe(
      catchError(error => {
        console.error('Error fetching league information:', error);
        return of(null); // Handle the error and return an observable with null value
      })
    )
    .subscribe(response => {
      if (response) {
        this.country = response?.response?.[0]?.country;
        this.league = response?.response?.[0]?.league;
        this.seasons = response?.response?.[0]?.seasons || [];
  
        console.log('Country:', this.country);
        console.log('League:', this.league);
        console.log('Seasons:', this.seasons);
  
        if (this.seasons.length > 0) {
          this.selectedSeason = this.seasons[0].year;
          this.fetchStandingsForSeason(this.selectedSeason);
        }
      }
    })
    
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
  (data) => {
    // Make sure to access the nested standings array correctly
    if (data && data.response && data.response.length > 0 && data.response[0].league.standings && data.response[0].league.standings.length > 0) {
      this.standings = data.response[0].league.standings[0];
      console.log('Standings:', this.standings);
    } else {
      // If data is not structured as expected, log the raw data to inspect it
      console.error('Standings data is not available or not in the expected format:', data);
      this.standings = []; // Reset standings to an empty array to avoid template errors
    }
  },
  (error) => {
    console.error('Error fetching standings:', error);
    this.standings = []; // Reset standings to an empty array to handle errors
  }
);



  
}

  
  


}
