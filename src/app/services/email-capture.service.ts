import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WaitlistSubmission {
  name?: string;
  email: string;
  role?: string;
  notes?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailCaptureService {
  private apiUrl = '/api/submit-email';

  constructor(private http: HttpClient) {}

  submitEmail(submission: WaitlistSubmission): Observable<WaitlistResponse> {
    return this.http.post<WaitlistResponse>(this.apiUrl, submission);
  }
}
