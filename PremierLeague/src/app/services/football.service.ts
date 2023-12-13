
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = 'https://fantasy-premier-league3.p.rapidapi.com/teams';
  private apiKey = '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9';

  private apiUrlNew = 'https://api-football-v1.p.rapidapi.com/v3/leagues';
   apiKeyNew = '1b64368b0fmsh47b5560a2453b93p1b1fc0jsnb6f1875e34e9';


  constructor(private http: HttpClient) {}


  
getLeagueById(leagueId: string): Observable<any> {
  const options = {
    headers: {
      'X-RapidAPI-Key': this.apiKeyNew,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
    params: {
      id: leagueId,
    },
  };

  return new Observable((observer) => {
    axios
      .get(this.apiUrlNew, options)
      .then((response) => {
        const data = response.data;

        // Assuming the 'seasons' property is present in the API response
        const seasons = data?.response?.[0]?.seasons || [];

        observer.next({
          country: data?.country,
          league: data?.league,
          seasons: seasons,
        });
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}

getStandings(leagueId: string, season: string): Observable<any> {
  const options = {
    headers: {
      'X-RapidAPI-Key': this.apiKeyNew,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
    params: {
      league: leagueId,
      season: season,
    },
  };

  return new Observable((observer) => {
    axios
      .get('https://api-football-v1.p.rapidapi.com/v3/standings', options)
      .then((response) => {
        console.log('API Response:', response.data);
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
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
