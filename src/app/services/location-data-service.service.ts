import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationDataServiceService {

  constructor(private _http : HttpClient) { }

  public getLocations(): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+'location', { observe: 'response' });
  }

  public getLocationsPage(page:any): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`location/?page=${page}`, { observe: 'response' });
  }

  public getLocationsFilter(name:string, type:string, dimension:string): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+`location/?name=${name}&stype=${type}&dimension=${dimension}`, { observe: 'response' });
  }

}
