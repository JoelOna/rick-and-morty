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
  public getCharacter(id:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`character/${id}`, { observe: 'response' });
  }

  public getCharactersPage(page:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`character/?page=${page}`, { observe: 'response' });
  }

  public getCharactersFilter(name:string, status:string, species:string, gender: string, page:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`character/?name=${name}&status=${status}&species=${species}&gender=${gender}&page=${page}`, { observe: 'response' });
  }
  public getCharacteresFilQuery(query:string): Observable<HttpResponse<any>>{
    return this._http.get(query, { observe: 'response' });
  }
}