import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';


  
  private apiKey = '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9';
  constructor(private http: HttpClient) {}

  getLeagueById(leagueId: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };

    const params = { id: leagueId };

    return this.http.get(`${this.apiUrl}/leagues`, { headers, params });
  }

  getStandings(leagueId: string, season: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };

    const params = { league: leagueId, season: season };

    return this.http.get(`${this.apiUrl}/standings`, { headers, params });
  }

 




getFixtures(leagueId: string, season: string): Observable<any> {
  const headers = {
    'X-RapidAPI-Key': '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
  };

  const params = new HttpParams()
    .set('league', leagueId)
    .set('season', season);

  return this.http.get(`${this.apiUrl}/fixtures`, { headers, params })
  .pipe(
    map((response: any) => response?.response ?? [])
  );
}


private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'X-RapidAPI-Key': this.apiKey,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  });
}

getTeamPlayers(teamId: number): Observable<any> {
  const url = `${this.apiUrl}/players/squads`;
  const params = new HttpParams().set('team', teamId.toString());
  const headers = this.getHeaders();

  return this.http.get(url, { headers, params }).pipe(
    map((response: any) => {
      console.log(response);
      if (response && response.response && Array.isArray(response.response) && response.response.length > 0) {
        // Assuming the response contains a 'team' object and a 'players' array
        const teamData = response.response[0].team; // Now also extracting the team data
        const playersData = response.response[0].players;
        return { team: teamData, players: playersData }; // Return both team and players
      } else {
        console.error('Unexpected response format:', response);
        return { team: null, players: [] }; // Return an object with null team and empty players array
      }
    })
  );
}

getTopScorers(leagueId: string, season: string): Observable<any> {
  const headers = this.getHeaders(); // Using the existing getHeaders method
  const params = new HttpParams().set('league', leagueId).set('season', season);

  return this.http.get(`${this.apiUrl}/players/topscorers`, { headers, params }).pipe(
    map((response: any) => response?.response ?? []),
    catchError(error => {
      console.error('Error fetching top scorers:', error);
      return of([]); // Return an empty array in case of an error
    })
  );
}


}




