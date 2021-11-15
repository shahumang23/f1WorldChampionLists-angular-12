import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  public configUrl: string =
    'http://ergast.com/api/f1';
  public championshipListUrl = '/driverStandings/1.json?offset=55';
  public seasonListResultUrl = '/results/1.json';

  constructor(private http: HttpClient) {}

  /**
   * @param: none
   * @return: Observable of ITransaction[]
   * Get the list of recent transaction from Json
   */
  getChampionsListByYear(): Observable<any> {
    return this.http.get(this.configUrl + this.championshipListUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getSeasonList(year: String): Observable<any> {
    return this.http
      .get('http://ergast.com/api/f1/' + year + this.seasonListResultUrl)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
