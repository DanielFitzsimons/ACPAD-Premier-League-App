import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import axios from 'axios';
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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'fantasy-premier-league3.p.rapidapi.com'
    });
  }

  getTeams(): Observable<any[]> {
    const options = {
      headers: this.getHeaders()
    };

    return this.http.get<any[]>(this.apiUrl, options)
      .pipe(map(teams => teams.sort((a, b) => a.position - b.position)));
  }

 private apiUrl1 = 'https://fantasy-premier-league3.p.rapidapi.com/fixtures';

 getFixtures(): Observable<any> {
   const options = {
     method: 'GET',
     url: this.apiUrl1,
     params: { gw: '11' },
     headers: {
       'X-RapidAPI-Key': '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9',
       'X-RapidAPI-Host': 'fantasy-premier-league3.p.rapidapi.com'
     }
   };

   return new Observable((observer) => {
     axios
       .request(options)
       .then((response) => {
         observer.next(response.data);
         observer.complete();
       })
       .catch((error) => {
         observer.error(error);
       });
   });
 }
}
