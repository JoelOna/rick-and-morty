import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesDataServiceService {
  

  constructor(private _http : HttpClient) { }
  
  public getEpisodes(): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+'episode', { observe: 'response' });
  }

  public getEpisode(id:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`episode/${id}`, { observe: 'response' });
  }

  public getEpisodesPage(page:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`episode/?page=${page}`, { observe: 'response' });
  }

  public getEpisodesFiltered(name:string, episode:string,): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`episode/?name=${name}&episode=${episode}`, { observe: 'response' });
  }
}
