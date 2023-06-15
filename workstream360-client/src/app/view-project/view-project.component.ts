import { Component } from '@angular/core';
import { ProjectUpdateFields } from '../Modal/update_project_budget';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { ResourceService } from '../service/resource.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Project } from '../Modal/project_dto';
import { ActivatedRoute } from '@angular/router';
import { ProjectResponse } from '../Modal/project_response_dto';
import { AddResourcetoProject } from '../Modal/resources_in_project_dto';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent {

  isStatus : boolean =  true;
  createProjectForm !: FormGroup;
  projectName: string = '';
  projectManagerResults: string[] = [];
  engagementLeaderResults: string[] = [];
  disabled : boolean = true;

  totalBudget: number = 0;
  burnedBudget: number = 0;
  remainingBudget: number = 0;
  burnedHours: number = 0;
  allocatedResources: any[] = [];
  isProjectSaved: boolean = false;
  isProjectPublished : boolean = false;
  isResourceAdd : boolean = false;
  showToast: boolean = false;
  projectId!: number;
  project!: ProjectResponse;
  resourceInProject! : AddResourcetoProject[] 

  projectType : string = "";
  projectStartDate! : Date;
  projectEndDate! : Date;
  projectManager : string = "";
  projectEngagementLeader : string = "";
  projectStatus : string = "";
  projectHealth : string = "";
  projectDescription : string = "";
  projectTotalBudget! : number;

  constructor(private formBuilder: FormBuilder, 
    private projectService : ProjectService, 
    private resourceService: ResourceService,
    private route: ActivatedRoute,) { }
  

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
     this.disabled = true;
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; // Assuming the parameter name is 'projectId'
      this.getProjectDetails();
      this.getResourcesByProjectId();
    });
  }
  
  // Working fine
  
  
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
  updateRemainingBudget() {
    const projectTotalBudget = this.createProjectForm.get('projectTotalBudget')?.value;
      if (isNaN(projectTotalBudget) || isNaN(this.burnedBudget)) {
        this.remainingBudget = 0; // Set remaining budget to null if any value is NaN
      } else {
        this.remainingBudget = projectTotalBudget - this.burnedBudget;
      }
      console.log("Remaining Budget ----->", this.remainingBudget)
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

    
  onAddResourceClicked() {
      const updatedFields: ProjectUpdateFields = {
        // Add the properties you want to update
        // For example:
        burnedBudget: this.burnedBudget,
        totalBurnedHours: this.burnedHours
      };
      console.log("data from resources clicked",updatedFields);
      this.isProjectSaved = false;
      this.isProjectPublished = false
      this.isResourceAdd = true;
      this.showToast = true; // Set showToast to true
      setTimeout(() => {
        this.showToast = false; // Hide the toast after a certain time
      }, 5000);

  
      this.updateBudgetData(updatedFields);
  } 

  getProjectDetails() {
    this.projectService.getProjectById(this.projectId).subscribe(
      (response: ProjectResponse) => {
        this.project = response;
        this.projectName = this.project.projectName,
        this.projectType= this.project.projectType
        this.projectStartDate= this.project.projectStartDate
        this.projectEndDate= this.project.projectEndDate,
        this.projectManager= this.project.projectManager,
        this.projectEngagementLeader= this.project.projectEngagementLeader,
        this.projectStatus= this.project.projectStatus,
        this.projectHealth= this.project.projectHealth,
        this.projectDescription= this.project.projectDescription,
        this.projectTotalBudget= this.project.projectTotalBudget,
        console.log('Project:', this.project);
        // Handle the received project details

        this.createProjectForm.patchValue({
          projectType: this.projectType,
          projectHealth : this.projectHealth , 
          projectStatus : this.projectStatus
        });
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle errors if any
      }
    );
  }
  onEdit(){

  }
  navigateBackToProject(){

  }
  // getResourcesByProjectId(){
  //   this.projectService.getResourcesByProjectId(this.projectId)
  //   .subscribe(
  //     (resources: AddResourcetoProject[]) => {
  //       // Handle the received resources
  //       console.log('Resources:', resources);
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //       // Handle errors if any
  //     }
  //   );
  // }

  getResourcesByProjectId() {
    this.projectService.getResourcesByProjectId(this.projectId)
      .subscribe(
        (resources: AddResourcetoProject[]) => {
          this.resourceInProject = resources; // Assign the received resources to the property
          console.log('Resources:', this.resourceInProject);
        },
        (error: any) => {
          console.error('Error:', error);
          // Handle errors if any
        }
      );
  }
  
  
}

