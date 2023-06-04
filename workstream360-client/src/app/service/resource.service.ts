import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../Modal/resource_dto';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private apiUrl = 'http://localhost:8081/resource';

  constructor(private http: HttpClient) { }

  addResource(resource: Resource) {
    const url = `${this.apiUrl}/add-resource`;
    return this.http.post<number>(url, resource);
  }

  searchProjectManagers(query: string) {
    const url = `${this.apiUrl}/projectManagers?query=${query}`;
    return this.http.get<string[]>(url);
  }

  searchEngagementLeaders(query: string) {
    const url = `${this.apiUrl}/engagementLeaders?query=${query}`;
    return this.http.get<string[]>(url);
  }
}

