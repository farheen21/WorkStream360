import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Modal/project_dto';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/project/add-project'; 

  addProject(project: Project): Observable<number> {
    return this.http.post<number>(this.apiUrl, project);
  }

}
