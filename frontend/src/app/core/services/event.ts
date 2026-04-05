import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  sendEvent(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getHealth(): Observable<any> {
  return this.http.get('http://localhost:3000/health');
}
}