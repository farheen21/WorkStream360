import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl , FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Project } from '../Modal/project_dto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isStatus : boolean =  true;
  totalBudget: number = 0;

  
  createProjectForm !: FormGroup;
  constructor(private formBuilder: FormBuilder , private projectService : ProjectService) { }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectManager: ['', Validators.required],
      engagementLeader: ['', Validators.required],
      status: ['', Validators.required],
      health: ['', Validators.required],
      description: ['', Validators.required],

      totalBudget: ['', Validators.required],
      burnedBudget: { value: 0, disabled: true },
      remainingBudget: { value: 0, disabled: true },
      totalBurnedHours: { value: 0, disabled: true }
    });
  }
  
  onSubmit() {
    if (this.createProjectForm.invalid) {
      return;
    }
  }

  handleSubmit(){
    console.log(this.createProjectForm.value);
    const formData: Project = { ...this.createProjectForm.value };
    this.projectService.addProject(formData).subscribe(
    projectId => {
      console.log('Project added successfully. ID:', projectId);
      // Do further operations or show success message
    },
    error => {
      console.error('Failed to add project:', error);
      // Handle error and show error message
    }
  );
  }

}
