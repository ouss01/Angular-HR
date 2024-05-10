// equipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  url = environments.EmployeeApp;

  constructor(private httpclient: HttpClient) { }

  getEquipe(){
    return this.httpclient.get(this.url + "/epuipe-api/")
  }
}
