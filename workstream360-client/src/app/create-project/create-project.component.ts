import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl , FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Project } from '../Modal/project_dto';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isStatus : boolean =  true;
  totalBudget: number = 0;
  
  
  createProjectForm !: FormGroup;
  projectName: string = '';
  projectId: any;
  projectManagerResults: string[] = [];
  engagementLeaderResults: string[] = [];
  constructor(private formBuilder: FormBuilder , private projectService : ProjectService , private resourceService: ResourceService) { }

  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      projectManager: ['', Validators.required],
      projectEngagementLeader: ['', Validators.required],
      projectStatus: ['', Validators.required],
      projectHealth: ['', Validators.required],
      projectDescription: ['', Validators.required],

      projectTotalBudget: ['', Validators.required],
      projectBurnedBudget: { value: 0, disabled: true },
      projectRemainingBudget: { value: 0, disabled: true },
      projectTotalBurnedHours: { value: 0, disabled: true }
      
      
      
    });
  }
  
  onSubmit() {
    console.log("calling before invalid --->",this.createProjectForm.value);
    if (this.createProjectForm.invalid) {
      console.log(this.createProjectForm.value);
      console.log("validation of form")
      this.projectName = this.createProjectForm.get('projectName')?.value;
      console.log( "project name from parent ---> " , this.projectName)
    }
  }
  
  handleSubmit(){
    console.log(this.createProjectForm.value);
    const formData: Project = { ...this.createProjectForm.value };
    this.projectService.addProject(formData).subscribe(
    projectId => {
      console.log('Project added successfully. ID:', projectId);
      // Do further operations or show success message
      this.projectId = projectId;
    },
    error => {
      console.error('Failed to add project:', error);
      // Handle error and show error message
    }
  );
  }
  
  searchProjectManagers(event : any) {
    const query = event.target.value;
    this.resourceService.searchProjectManagers(query).subscribe(
      (results: string[]) => {
        this.projectManagerResults = results;
      },
      (error) => {
        console.error('Error searching project managers:', error);
      }
    );
  }

  searchEngagementLeaders( event : any) {
    const query = event.target.value;

    this.resourceService.searchEngagementLeaders(query).subscribe(
      (results: string[]) => {
        this.engagementLeaderResults = results;
      },
      (error) => {
        console.error('Error searching engagement leaders:', error);
      }
    );
  }


  selectProjectManager(manager: string) {
    this.createProjectForm.get('projectManager')?.setValue(manager);
    this.projectManagerResults = [];
  }

  selectEngagementLeader(leader: string) {
    this.createProjectForm.get('projectEngagementLeader')?.setValue(leader);
    this.engagementLeaderResults = [];
  }
}
