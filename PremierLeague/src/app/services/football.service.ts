// Service for interacting with a football-related API
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  // API base URL
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';
  // API key for authentication
  private apiKey = '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9';

  // Constructor with injected HttpClient dependency
  constructor(private http: HttpClient) {}

  // Get league details by ID
  getLeagueById(leagueId: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };
    const params = { id: leagueId };

    // Make an HTTP GET request to the API to get league details
    return this.http.get(`${this.apiUrl}/leagues`, { headers, params });
  }

  // Get standings for a specific league and season
  getStandings(leagueId: string, season: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };
    const params = { league: leagueId, season: season };

    // Make an HTTP GET request to the API to get standings
    return this.http.get(`${this.apiUrl}/standings`, { headers, params });
  }

  // Get fixtures for a specific league and season
  getFixtures(leagueId: string, season: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };
    const params = new HttpParams().set('league', leagueId).set('season', season);

    // Make an HTTP GET request to the API to get fixtures
    return this.http.get(`${this.apiUrl}/fixtures`, { headers, params })
      .pipe(
        map((response: any) => response?.response ?? [])
      );
  }

  // Private method to get common HTTP headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    });
  }

  // Get players for a specific team
  getTeamPlayers(teamId: number): Observable<any> {
    const url = `${this.apiUrl}/players/squads`;
    const params = new HttpParams().set('team', teamId.toString());
    const headers = this.getHeaders();

    // Make an HTTP GET request to the API to get team players
    return this.http.get(url, { headers, params }).pipe(
      map((response: any) => {
        console.log(response);
        if (response && response.response && Array.isArray(response.response) && response.response.length > 0) {
          const teamData = response.response[0].team;
          const playersData = response.response[0].players;
          return { team: teamData, players: playersData };
        } else {
          console.error('Unexpected response format:', response);
          return { team: null, players: [] };
        }
      })
    );
  }

  // Get top scorers for a specific league and season
  getTopScorers(leagueId: string, season: string): Observable<any> {
    const headers = this.getHeaders(); // Using the existing getHeaders method
    const params = new HttpParams().set('league', leagueId).set('season', season);

    // Make an HTTP GET request to the API to get top scorers
    return this.http.get(`${this.apiUrl}/players/topscorers`, { headers, params }).pipe(
      map((response: any) => response?.response ?? []), // transforms observables emitted value based on value
      catchError(error => {
        console.error('Error fetching top scorers:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Get top assists for a specific league and season
  getTopAssists(leagueId: string, season: string): Observable<any> {
    const headers = this.getHeaders(); // Using the existing getHeaders method
    const params = new HttpParams().set('league', leagueId).set('season', season);

    // Make an HTTP GET request to the API to get top assists
    return this.http.get(`${this.apiUrl}/players/topassists`, { headers, params }).pipe(
      map((response: any) => response?.response ?? []), // map through response header as per api
      catchError(error => {
        console.error('Error fetching top assists:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
}
