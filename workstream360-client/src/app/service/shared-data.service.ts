import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private projectIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public projectId$ = this.projectIdSubject.asObservable();

  setProjectId(projectId: number) {
    this.projectIdSubject.next(projectId);
    console.log("Got this project id from add resource cmp", projectId);
  }
}
