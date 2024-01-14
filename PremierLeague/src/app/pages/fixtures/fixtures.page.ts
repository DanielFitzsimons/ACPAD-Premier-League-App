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
  league: any;
  fixtures: any[] = [];
  selectedSeason: string = '2023';
  constructor(private footballService: FootballService, private navctrl: NavController,) {}

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
      
        this.league = response?.response?.[0]?.league;
        
  
       
        console.log('League:', this.league);
   
  
       
      }
    })
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
