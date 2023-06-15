
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project } from '../Modal/project_dto';
import { ResourceByName } from '../Modal/resource_by_name_dto';
import { AddResourcetoProject } from '../Modal/resources_in_project_dto';
import { ProjectResponse } from '../Modal/project_response_dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/project'; // Base API URL
  private apiUrlSearchResource = 'http://localhost:8081/resource/search'; // Resource search API URL
  private apiUrlAddResourceToProject = 'http://localhost:8080/project/add-resource-to-project'; // Add resource to project API URL

  constructor(private http: HttpClient) {}

  addProject(project: Project): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/create-project`, project);
  }

  searchResource(resource: string): Observable<ResourceByName> {
    const [firstName, lastName] = resource.split(' '); // Split the resource name into first name and last name
    const queryParams = { firstName, lastName }; // Object to hold the query parameters

    return this.http.get<ResourceByName>(this.apiUrlSearchResource, { params: queryParams });
  }

  addResourceToProject(projectResourceRequest: AddResourcetoProject): Observable<number> {
    return this.http.post<number>(this.apiUrlAddResourceToProject, projectResourceRequest);
  }

  
  updateBudgetData(projectId: number, updatedFields: Partial<Project>): Observable<void> {
    const url = `${this.apiUrl}/update-budget-data/${projectId}`;
    return this.http.patch<void>(url, updatedFields);
  }
  
  getProjectById(projectId: number): Observable<ProjectResponse> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.http.get<ProjectResponse>(url);
  }

  getAllProjects(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(this.apiUrl);
  }

  

  getProjectsByResource(resourceName: string): Observable<ProjectResponse[]> {
    const url = `${this.apiUrl}/resource/${resourceName}`;
    console.log("from service---->")
    return this.http.get<ProjectResponse[]>(url);
  }

  getResourcesByProjectId(projectId: number): Observable<AddResourcetoProject[]> {
    const url = `${this.apiUrl}/${projectId}/resources`;
    return this.http.get<AddResourcetoProject[]>(url);
  }
  
}
