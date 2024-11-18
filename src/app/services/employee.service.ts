import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = environments.EmployeeApp;


  constructor(private httpclient:HttpClient) {
    
   }
  
  getEmployees(){
    return this.httpclient.get(this.url + "/employees/")
  } 

  addEmployee(data:any) {
    return this.httpclient.post(this.url+'/employees/',data)
  }
  currentuser(){
    return this.httpclient.get(this.url+'/current_user/')
  }

}
