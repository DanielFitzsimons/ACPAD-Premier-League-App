import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { NavController } from '@ionic/angular';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.page.html',
  styleUrls: ['./fixtures.page.scss'],
})
export class FixturesPage implements OnInit {
  league: any; // Variable to store league information
  fixtures: any[] = []; // Array to store fixture information
  selectedSeason: string = '2023'; // Default selected season

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
          this.league = response?.response?.[0]?.league; // Extract league information from the API response
          console.log('League:', this.league);
        }
      });

    this.fetchFixturesForSeason(this.selectedSeason); // Fetch fixtures for the default selected season
  }

  // Method to fetch fixtures for a specific season
  fetchFixturesForSeason(season: string): void {
    const leagueId = '39'; // Premier League ID
    this.footballService.getFixtures(leagueId, season).subscribe(
      (fixtures) => {
        console.log('Fixtures Data:', fixtures); // log fixtures data to console
        this.fixtures = fixtures; // Update the fixtures array with the fetched data
      },
      (error) => {
        console.error('Error fetching fixtures:', error);
      }
    );
  }

  // Method triggered when the selected season changes
  onSeasonChange(newSeason: string): void {
    this.selectedSeason = newSeason;
    this.fetchFixturesForSeason(this.selectedSeason); // Fetch fixtures for the newly selected season
  }

  // Method to navigate to the Home component
  goHome() {
    this.navctrl.navigateForward('/home');
  }
}
