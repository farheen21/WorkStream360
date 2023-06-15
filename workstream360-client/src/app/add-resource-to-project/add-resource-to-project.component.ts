import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddResourcetoProject } from '../Modal/resources_in_project_dto';
import { ProjectService } from '../service/project.service';
import { ResourceByName } from '../Modal/resource_by_name_dto';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SharedDataService } from '../service/shared-data.service';


@Component({
  selector: 'app-add-resource-to-project',
  templateUrl: './add-resource-to-project.component.html',
  styleUrls: ['./add-resource-to-project.component.scss'],
})
export class AddResourceToProjectComponent {
  @Input() projectName = ' ';
  @Input() projectId!: number;
  
  @Output() addResourceClicked = new EventEmitter<void>();
  @Output() allocatedBudgetChanged = new EventEmitter<number>();
  @Output() burnedHoursChanged = new EventEmitter<number>();@Output() 
 
  AddReosurctoProjectForm!: FormGroup;
  resources: AddResourcetoProject[] = [];
  isModalOpen = false;
  resourceControl = new FormControl();

  selectedRole: string = '';
  resourceId:number = 0;
  
  constructor(private formBuilder: FormBuilder, private projectService: ProjectService , private SharedDataService : SharedDataService) {
    this.resourceControl = this.formBuilder.control('', Validators.required);

    this.AddReosurctoProjectForm = this.formBuilder.group({
      resourceControl: this.resourceControl,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      TotalBudget: ['', Validators.required],
      TotalHours: ['', Validators.required]
    });
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    console.log('seeing project name from add resource to project-->', this.projectName);
    console.log(this.projectName, this.projectId)
  }

  closeModal() {
    this.isModalOpen = false;
    console.log('close came');
  }

  onSubmit() {
    if (this.AddReosurctoProjectForm.invalid) {
      // Mark all form fields as touched to trigger validation errors
      // Log the specific validation errors
      for (const controlName in this.AddReosurctoProjectForm.controls) {
        const control = this.AddReosurctoProjectForm.controls[controlName];
        if (control.invalid) {
          console.log(`Validation error in ${controlName}:`, control.errors);
        }
      }
      this.markAllFieldsAsTouched();
      console.log("Invalid form", this.AddReosurctoProjectForm.invalid);
      return;
    }

    if (this.AddReosurctoProjectForm.valid) {
      const resourceData = this.AddReosurctoProjectForm.value;
      // this.resourceAdded.emit(resourceData);

      // this.AddReosurctoProjectForm.reset();
      // this.allocatedBudgetChanged.emit(resourceData.TotalBudget);
      this.allocatedBudgetChanged.emit(parseFloat(resourceData.TotalBudget));
      console.log("total budget from child to send for parent--->", resourceData.TotalBudget)
      this.burnedHoursChanged.emit(40);

      this.addResourceClicked.emit();

      const resource: AddResourcetoProject = {
        role: this.selectedRole,
        resource: this.AddReosurctoProjectForm.value.resourceControl,
        allocatedBudget: this.AddReosurctoProjectForm.value.TotalBudget,
        allocatedHours: this.AddReosurctoProjectForm.value.TotalHours,
        burnedHours: 40, // Set default burned hours to 40
        assignmentStartDate: this.AddReosurctoProjectForm.value.startDate,
        assignmentEndDate: this.AddReosurctoProjectForm.value.endDate,
        projectID: this.projectId ,
        resourceId : this.resourceId
      };

      this.resources.push(resource);

      this.projectService.addResourceToProject(resource)
        .subscribe(
          allocationId => {
            console.log('Resource added successfully. Allocation ID:', allocationId);
            // Do further operations or show success message
            this.SharedDataService.setProjectId(resource.projectID)
            console.log("Emitting Project id from resource cmp to shared data service--->",resource.projectID)
          },
          error => {
            console.error('Failed to add resource:', error);
            // Handle error and show error message
          }
        );

      // Reset the form and close the modal
      this.AddReosurctoProjectForm.reset();
      this.toggleModal();
    }
  }

  markAllFieldsAsTouched() {
    Object.values(this.AddReosurctoProjectForm.controls).forEach((control) => {
      control.markAsTouched({ onlySelf: true });
    });
  }

  searchResource() {
    console.log("Search is called for resources")
    const resource = this.resourceControl.value;
    console.log("Search is called for resources and getting this value ---->", resource)

    // Check if the resource name is empty or null
    if (!resource) {
      return;
    }

    // Call the searchResource() method of the resourceService
    this.projectService.searchResource(resource)
      .pipe(
        debounceTime(1000), // Adjust the debounce time as per your preference
        distinctUntilChanged()
      )
      .subscribe(
        (response: ResourceByName) => {
          this.selectedRole = response.roleName;
          this.resourceId = response.resourceId;
          console.log("Got the resource role --->", this.selectedRole)
          console.log("Got the resource id --->", this.resourceId)

        },
        (error) => {
          console.error('Error occurred while searching for resource:', error);
          // Handle error if needed
        }
      );
  }
}

