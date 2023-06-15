import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeCard } from '../Modal/timecard_dto';


@Injectable({
  providedIn: 'root'
})
export class TimecardService {

  private baseUrl = 'http://localhost:8083/'; 

  constructor(private http: HttpClient) { }

  // getTimeCardsByProject(projectId: number): Observable<TimeCard[]> {
  //   return this.http.get<TimeCard[]>(`${this.baseUrl}/projects/${projectId}/timecards`);
  // }

  // getProjectTimeCards(): Observable<{ projectName: string, timeCards: TimeCard[] }[]> {
  //   return this.http.get<{ projectName: string, timeCards: TimeCard[] }[]>(`${this.baseUrl}/time-cards`);
  // }



  getProjectTimeCards(projectId: number): Observable<{ timeCards: TimeCard[] }> {
    console.log("Got Timecard service cmponents for project id");
    return this.http.get<{ timeCards: TimeCard[] }>(`${this.baseUrl}timecards/project/${projectId}`);
  }

  getAllTimeCards(): Observable<TimeCard[]> {
    return this.http.get<TimeCard[]>(`${this.baseUrl}timecards`);
  }


  saveTimeCard(timeCard: TimeCard): Observable<TimeCard> {
    return this.http.post<TimeCard>(`${this.baseUrl}/time-cards`, timeCard);
  }

  emitProjectId(projectId: number): void {
    // Emit the project ID using a Subject or EventEmitter
    // You can implement it based on your preference and import the necessary dependencies
  }
}
