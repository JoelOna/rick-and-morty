import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacteresDataService {

  constructor(private _http: HttpClient) { }
  
  public getCharacters(): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+'character', { observe: 'response' });
  }

  public getCharactersPage(page:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`character/?page=${page}`, { observe: 'response' });
  }

  public getCharactersFilter(name:string, status:string, species:string, type:string, gender: string): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`, { observe: 'response' });
  }
}