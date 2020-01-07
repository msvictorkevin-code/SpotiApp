import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBDJ_YD-pxIy2l1DqVEgiK-0_3vNbafnB09mAJNcwPSjR_f7agNC_jfeKCFUYHL_60ssuBO3Tzqz54L9N8'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    /*const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD8FPZBc1ehtoldUk5Xa9CowhTg55IXwmDvYCf4pcRC3sk79vpKY82zg-N3CU0J3PJqBWx805tK2CFdeAU'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
      .pipe(map(data => {
        return data['albums'].items;
      }));*/
      return this.getQuery('browse/new-releases')
                 .pipe(map(data => {
        return data['albums'].items;
      }));
    /*.subscribe(data => {
      console.log(data);
    });*/
  }

  getArtistas(termino: string) {
   /* const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD8FPZBc1ehtoldUk5Xa9CowhTg55IXwmDvYCf4pcRC3sk79vpKY82zg-N3CU0J3PJqBWx805tK2CFdeAU'
    });
    return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist`, { headers })
      .pipe(map(data => {
        return data['artists'].items;
      }));*/
      return    this.getQuery(`search?q=${termino}&type=artist`)
      .pipe(map(data => {
        return data['artists'].items;
      }));
  }

  getArtista(id: string){
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
              .pipe(map( data => data['tracks'] ));
  }
}
