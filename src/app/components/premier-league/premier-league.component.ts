// premier-league.component.ts
import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.scss']
})
export class PremierLeagueComponent implements OnInit {
  tables: any; // Define the structure of the tables data
  leagues: any[] = []; // Variable to store the leagues
  standings: any[] = []; // Variable to store the standings
  selectedLeague: string = '39'; // Default value for selected league
  selectedYear: string = '2022'; // Default value for selected year

  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.footballService.getLeagues().subscribe(
      (data) => {
        this.leagues = data.response;
        console.log('Leagues:', this.leagues);

        // Fetch standings for the default league and year
        this.fetchStandings();
      },
      (error) => {
        console.error('Error fetching leagues:', error);
      }
    );
  }

  private fetchStandings(): void {
    // Call the getStandings method here with the selectedLeague and selectedYear
    this.footballService.getStandings(this.selectedLeague, this.selectedYear).subscribe(
      (standings) => {
        this.standings = standings;
        console.log('Standings:', this.standings);
      },
      (error) => {
        console.error('Error fetching standings:', error);
      }
    );
  }

  onLeagueChange(selectedLeague: string): void {
    // Update the selected league and fetch standings
    this.selectedLeague = selectedLeague;
    this.fetchStandings();
  }

  onYearChange(selectedYear: string): void {
    // Update the selected year and fetch standings
    this.selectedYear = selectedYear;
    this.fetchStandings();
  }
}
