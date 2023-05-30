import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../Modal/resource_dto';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8081/resource/add-resource'; 
  addResource(resource : Resource){
    return this.http.post<number>(  this.apiUrl, resource)
  }
}

