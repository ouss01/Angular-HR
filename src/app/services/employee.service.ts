import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';
import { Observable } from 'rxjs';

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
  deleteEmployee(employeeId: string) {
    return this.httpclient.delete(`${this.url}/employees/${employeeId}/`);
  }

  updateEmployee(employeeId: string, employeeData: any) {
    return this.httpclient.put(`${this.url}/employees/${employeeId}/`, employeeData);
  }
  getPromotions(): Observable<any> {
    return this.httpclient.get(`${this.url}/promotions/`);
  }

  addPromotion(data: any): Observable<any> {
    return this.httpclient.post(`${this.url}/promotions/`, data);
  }
  getHandicaps(): Observable<any> {
    return this.httpclient.get(`${this.url}/handicaps/`);
  }

  addHandicaps(data: any): Observable<any> {
    return this.httpclient.post(`${this.url}/handicaps/`, data);
  }
  
  getFinactivity(): Observable<any> {
    return this.httpclient.get(`${this.url}/finactivities/`);
  }

  addFinActivity(data: any): Observable<any> {
    return this.httpclient.post(`${this.url}/finactivities/`, data);
  }

}
