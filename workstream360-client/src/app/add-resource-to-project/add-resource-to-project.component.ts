import { Component, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddResourcetoProject } from '../Modal/resources_in_project_dto';
import { ProjectService } from '../service/project.service';
import { ResourceByName } from '../Modal/resource_by_name_dto';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-resource-to-project',
  templateUrl: './add-resource-to-project.component.html',
  styleUrls: ['./add-resource-to-project.component.scss'],
})
export class AddResourceToProjectComponent {
  @Input() projectName = ' ';
  @Input() projectId! : number;
  AddReosurctoProjectForm!: FormGroup;
  resources: AddResourcetoProject[] = [];
  isModalOpen = false;
  resourceControl = new FormControl();
 
  selectedRole: string = '';
  
  

  // constructor(private formBuilder: FormBuilder , private projectService: ProjectService) {}
  
  constructor(private formBuilder: FormBuilder,private projectService: ProjectService ) {
    this.resourceControl = this.formBuilder.control('', Validators.required);

    this.AddReosurctoProjectForm = this.formBuilder.group({
      // other form controls...
      
      resourceControl: this.resourceControl,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      TotalBudget: ['', Validators.required],
      TotalHours: ['', Validators.required]
      // other form controls...
    });
  }


  // ngOnInit() {
  //   this.AddReosurctoProjectForm = this.formBuilder.group({
  //     resourceControl: ['', Validators.required],
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required],
  //     TotalBudget: ['', Validators.required],
  //     TotalHours: ['', Validators.required]
  //   });
  // }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    console.log('seeing project name', this.projectName);
    console.log(this.projectName , this.projectId)
  }

  closeModal() {
    this.isModalOpen = false;
    console.log('close came');
  }

  onSubmit() {
    // if (this.AddReosurctoProjectForm.invalid) {
    //   // Mark all form fields as touched to trigger validation errors
    //   this.markAllFieldsAsTouched();
    //   console.log("invalid form---->" , this.AddReosurctoProjectForm.invalid)
    //   return;
    // }

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
      console.log("Invalid form");
      
      return;
    }
  

    const resource: AddResourcetoProject = {
      role: this.selectedRole ,
      resource: this.AddReosurctoProjectForm.value.resourceControl,
      allocatedBudget: this.AddReosurctoProjectForm.value.TotalBudget,
      allocatedHours: this.AddReosurctoProjectForm.value.TotalHours,
      burnedHours: 40, // Set default burned hours to 40
      assignmentStartDate: this.AddReosurctoProjectForm.value.startDate,
      assignmentEndDate: this.AddReosurctoProjectForm.value.endDate,
      projectID : this.projectId
    };

    this.resources.push(resource);
   
    this.projectService.addResourceToProject(resource)
    .subscribe(
      allocationId => {
        console.log('Resource added successfully. Allocation ID:', allocationId);
        // Do further operations or show success message
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
          console.log("Got the resource role --->", this.selectedRole)
        },
        (error) => {
          console.error('Error occurred while searching for resource:', error);
          // Handle error if needed
        }
      );
  }
}

