import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  createProjectForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      searchProject: ['', Validators.required],
    });
  }

  handleFilter(){

  }
}
