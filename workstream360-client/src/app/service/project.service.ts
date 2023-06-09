// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Project } from '../Modal/project_dto';
// import { ResourceByName } from '../Modal/resource_by_name_dto';
// import { AddResourcetoProject } from '../Modal/resources_in_project_dto';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProjectService {

//   constructor(private http: HttpClient) { }

//   private apiUrl = 'http://localhost:8080/project/add-project'; 
//   private apiUrlSearchResource = 'http://localhost:8081/resource/search' ;
//   private apiUrlAddResourcetoProject = "http://localhost:8080/project/add-resource-to-project";

//   addProject(project: Project): Observable<number> {
//     return this.http.post<number>(this.apiUrl, project);
//   }
 
//   // searchResource(resource: string): Observable<ResourceByName> {
//   //   return this.http.get<ResourceByName>(`${this.apiUrlSearchResource}?resource=${resource}`);
//   // }

//   searchResource(resource: string): Observable<ResourceByName> {
//     const [firstName, lastName] = resource.split(" "); // Split the resource name into first name and last name
  
//     return this.http.get<ResourceByName>(`${this.apiUrlSearchResource}?firstName=${firstName}&lastName=${lastName}`);
//   }

  
//   addResourceToProject(projectResourceRequest: AddResourcetoProject): Observable<number> {
//     return this.http.post<number>(`${this.apiUrlAddResourcetoProject}`, projectResourceRequest);
//   }
  
  
//   updateProject(project: Project): Observable<any> {
//     const url = `${this.apiUrl}/${project.projectId}`;
//     return this.http.put(url, project);
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    const url = `${this.apiUrl}${projectId}`;
    return this.http.get<ProjectResponse>(url);
  }

  getAllProjects(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(this.apiUrl);
  }
}
