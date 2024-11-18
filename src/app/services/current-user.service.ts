import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  url = environments.EmployeeApp;


  constructor(private httpclient:HttpClient) {
    
   }



  currentuser(){
    return this.httpclient.get(this.url+'/current_user/')
  }
}
