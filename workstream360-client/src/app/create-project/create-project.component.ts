import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl , FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Project } from '../Modal/project_dto';
import { ResourceService } from '../service/resource.service';
import { AddResourceToProjectComponent } from '../add-resource-to-project/add-resource-to-project.component';
import { ProjectUpdateFields } from '../Modal/update_project_budget';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  isStatus : boolean =  true;
  createProjectForm !: FormGroup;
  projectName: string = '';
  projectId: any;
  projectManagerResults: string[] = [];
  engagementLeaderResults: string[] = [];

  totalBudget: number = 0;
  burnedBudget: number = 0;
  remainingBudget: number = 0;
  burnedHours: number = 0;
  allocatedResources: any[] = [];


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
      // projectBurnedBudget: { value: 0, disabled: true  },
      // projectRemainingBudget: { value: 0, disabled: true  },
      // projectTotalBurnedHours: { value: 0, disabled: true  },

      projectBurnedBudget: [0],
      projectRemainingBudget: [0],
      projectTotalBurnedHours: [0],

     
    });

    
            // Listen to value changes of relevant form controls
      this.createProjectForm.get('projectTotalBudget')?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((totalBudget: number) => {
        this.updateBudgetData({ totalBudget });
      });

      this.createProjectForm.get('projectBurnedBudget')?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((burnedBudget: number) => {
        this.updateBudgetData({ burnedBudget });
      });

      this.createProjectForm.get('projectTotalBurnedHours')?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((totalBurnedHours: number) => {
        this.updateBudgetData({ totalBurnedHours });
      });

  }
  
  // Working fine
  onSubmit() {
    console.log("calling before invalid --->",this.createProjectForm.value);
    if (this.createProjectForm.invalid) {
      console.log(this.createProjectForm.value);
      console.log("validation of form")
      this.projectName = this.createProjectForm.get('projectName')?.value;
      console.log( "project name from parent ---> " , this.projectName)
    }
  }
  
  // Working Fine
  handleSubmit() {
    console.log(this.createProjectForm.value);
    const formData: Project = { ...this.createProjectForm.value };
    
    this.projectService.addProject(formData).subscribe(
      projectId => {
        console.log('Project added successfully. ID:', projectId);
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

  handleTotalBudgetChange(budget: number) {
    // this.totalBudget += budget;
    this.burnedBudget += budget;
    console.log("let see total budget",this.burnedBudget);
    this.updateRemainingBudget();
  }
  
  handleTotalBurnedHoursChange(hours: number) {
    this.burnedHours += hours;
    console.log("Total Burned hours------>",this.burnedHours);
    this.updateRemainingBudget();
  }

  updateRemainingBudget() {
    const projectTotalBudget = this.createProjectForm.get('projectTotalBudget')?.value;
      if (isNaN(projectTotalBudget) || isNaN(this.burnedBudget)) {
        this.remainingBudget = 0; // Set remaining budget to null if any value is NaN
      } else {
        this.remainingBudget = projectTotalBudget - this.burnedBudget;
      }
      console.log("Remaining Budget ----->", this.remainingBudget)
  }
  
  
  // updateBudgetData(updatedFields: ProjectUpdateFields): void {
  //   const projectId = this.projectId;
  //   console.log("seeing patch call", projectId);
  //   if (!projectId) {
  //     return; // No project ID, skip the update
  //   }
  
  //   // Calculate the remaining budget
  //   // const projectTotalBudget = this.createProjectForm.get('projectTotalBudget')?.value;
  //   // const burnedBudget = updatedFields.burnedBudget || 0; // Use the updated burnedBudget or default to 0
  //   // const remainingBudget = projectTotalBudget - burnedBudget;

  //   // Calculate the remaining budget
  // const projectTotalBudget = this.createProjectForm.get('projectTotalBudget')?.value;
  // const burnedBudget = this.createProjectForm.get('projectBurnedBudget')?.value;
  // const totalBurnedHours = this.createProjectForm.get('projectTotalBurnedHours')?.value;
  // const remainingBudget = projectTotalBudget - (burnedBudget || 0);

  // // Update the updatedFields object with the calculated values
  // updatedFields.projectBurnedBudget = burnedBudget || 0;
  // updatedFields.projectRemainingBudget = remainingBudget;
  // updatedFields.totalBurnedHours = totalBurnedHours;
  
  //   // Add the remainingBudget property to the updatedFields object
  //   updatedFields.projectRemainingBudget = remainingBudget;
  
  //   this.projectService.updateBudgetData(projectId, updatedFields)
  //     .subscribe(
  //       () => {
  //         console.log('Budget data updated successfully.');
  //       },
  //       (error) => {
  //         console.error('Failed to update budget data:', error);
  //         // Handle error and show error message
  //       }
  //     );
  // }
  
  updateBudgetData(updatedFields: ProjectUpdateFields): void {
    const projectId = this.projectId;
    console.log("seeing patch call", projectId);
    if (!projectId) {
      return; // No project ID, skip the update
    }
  
    // Calculate the remaining budget
    const projectTotalBudget = this.createProjectForm.get('projectTotalBudget')?.value;
    console.log("seeing from update feilds const projct total budget",projectTotalBudget);
  
    const burnedBudget = this.createProjectForm.get('projectBurnedBudget')?.value;
    console.log("seeing from update feilds const projct burned budget",burnedBudget);
    const totalBurnedHours = this.createProjectForm.get('projectTotalBurnedHours')?.value;
    console.log("seeing from update feilds const projct total burned hours",totalBurnedHours);
    const remainingBudget = projectTotalBudget - (burnedBudget || 0);
    console.log("seeing from update feilds const projct remainging budget",remainingBudget);

  
    // Update the updatedFields object with the calculated values
     updatedFields.projectBurnedBudget = burnedBudget || 0;
    console.log("seeing from update feilds projct burned budget",updatedFields.projectBurnedBudget)
    updatedFields.projectRemainingBudget = remainingBudget;
    console.log("seeing from update feilds projct remaing budget",updatedFields.projectRemainingBudget)
    updatedFields.totalBurnedHours = totalBurnedHours || 0;
    console.log("seeing from update feilds projct total burned hours ",updatedFields.totalBurnedHours)
    this.projectService.updateBudgetData(projectId, updatedFields)
      .subscribe(
        () => {
          console.log('Budget data updated successfully.');
        },
        (error) => {
          console.error('Failed to update budget data:', error);
          // Handle error and show error message
        }
      );
  }
  
 
    
    onAddResourceClicked() {
      const updatedFields: ProjectUpdateFields = {
        // Add the properties you want to update
        // For example:
        burnedBudget: this.burnedBudget,
        totalBurnedHours: this.burnedHours
      };
      console.log("data from resources clicked",updatedFields);
  
      this.updateBudgetData(updatedFields);
    }
}
