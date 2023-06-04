import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Modal/project_dto';
import { ResourceByName } from '../Modal/resource_by_name_dto';
import { AddResourcetoProject } from '../Modal/resources_in_project_dto';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/project/add-project'; 
  private apiUrlSearchResource = 'http://localhost:8081/resource/search' ;
  private apiUrlAddResourcetoProject = "http://localhost:8080/project/add-resource-to-project";

  addProject(project: Project): Observable<number> {
    return this.http.post<number>(this.apiUrl, project);
  }
 
  // searchResource(resource: string): Observable<ResourceByName> {
  //   return this.http.get<ResourceByName>(`${this.apiUrlSearchResource}?resource=${resource}`);
  // }

  searchResource(resource: string): Observable<ResourceByName> {
    const [firstName, lastName] = resource.split(" "); // Split the resource name into first name and last name
  
    return this.http.get<ResourceByName>(`${this.apiUrlSearchResource}?firstName=${firstName}&lastName=${lastName}`);
  }

  
  addResourceToProject(projectResourceRequest: AddResourcetoProject): Observable<number> {
    return this.http.post<number>(`${this.apiUrlAddResourcetoProject}`, projectResourceRequest);
  }
  
  
}
