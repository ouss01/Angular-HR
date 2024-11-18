import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  url = environments.EmployeeApp;

  constructor(private httpClient: HttpClient) { }

  // Create a new Poste
  createPoste(posteData: any): Observable<any> {
    return this.httpClient.post(this.url + '/postes/', posteData);
  }

  // Get all Postes
  getPostes(): Observable<any> {
    return this.httpClient.get(this.url + '/postes/');
  }

  // Get a single Poste by ID
  getPosteById(posteId: number): Observable<any> {
    return this.httpClient.get(this.url + `/postes/${posteId}/`);
  }

  // Update an existing Poste
  updatePoste(posteId: number, postData: any): Observable<any> {
    return this.httpClient.put(this.url + `/postes/${posteId}/`, postData);
  }

  // Delete a Poste by ID
  deletePoste(posteId: number): Observable<any> {
    return this.httpClient.delete(this.url + `/postes/${posteId}/`);
  }
}
