import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the onboarding model based on the fields
export interface Onboarding {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  language: string;
  contract_type?: string;
  file?: File;
  username?: string;
  poste?: string;
  societe?: string;
  about?: string;
  account_activated: string;
  remote_work: boolean;
  on_site_work: boolean;
  work_hours: string;
  document_submission: string;
  id_card_application: boolean;
  motorized_parking: boolean;
  emergency_contact: string;
  onboarding_rating: number;
  positive_feedback?: string;
  improvements_feedback?: string;
  advice_feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private baseUrl = 'http://127.0.0.1:8000/onboarding/'; // Adjust the URL based on your Django API

  constructor(private http: HttpClient) {}

  // Get all onboarding records
  getOnboardingList(): Observable<Onboarding[]> {
    return this.http.get<Onboarding[]>(this.baseUrl);
  }

  // Get a single onboarding record by ID
  getOnboardingById(id: number): Observable<Onboarding> {
    return this.http.get<Onboarding>(`${this.baseUrl}${id}/`);
  }

  // Create a new onboarding record
  createOnboarding(onboarding: Onboarding): Observable<Onboarding> {
    return this.http.post<Onboarding>(this.baseUrl, onboarding);
  }

  // Update an existing onboarding record
  updateOnboarding(id: number, onboarding: Onboarding): Observable<Onboarding> {
    return this.http.put<Onboarding>(`${this.baseUrl}${id}/`, onboarding);
  }

  // Delete an onboarding record
  deleteOnboarding(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }

  // Upload file as part of the onboarding process
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().delete('Content-Type'); // Let Angular set the Content-Type
    return this.http.post(`${this.baseUrl}`, formData, { headers });
  }
}
