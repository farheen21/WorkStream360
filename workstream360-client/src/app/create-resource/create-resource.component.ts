import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl , FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { Project } from '../Modal/project_dto';
import { Resource} from '../Modal/resource_dto';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss']
})
export class CreateResourceComponent {
  createResourceForm !: FormGroup;
  constructor(private formBuilder: FormBuilder , private resourceService : ResourceService) { }

  ngOnInit() {
    this.createResourceForm = this.formBuilder.group({
      resourceFirstname: ['', Validators.required],
      resourceLastName: ['', Validators.required],
      resourcePhoneNumber: ['', Validators.required],
      resourceEmail: ['', Validators.required],
      resourceDateOfBirth: ['', Validators.required],
      resourceLocation: ['', Validators.required],
      resourceRole: ['', Validators.required],
      resourceJoiningDate: ['', Validators.required],
      resourceReportingManager: ['', Validators.required],
      resourceExperience: ['', Validators.required],

    });
  }
  
  // onSubmit() {
  //   if (this.createResourceForm.invalid) {
  //     return;
  //   }
  // }

  saveForm() {
    const formData = this.createResourceForm.value;
    console.log("I am clicked before if for saving form", formData);
    // if (this.createResourceForm.valid) {
    //   const formData = this.createResourceForm.value;
    //   console.log("I am clicked for saving form", formData);
    //   // You can perform further actions here, such as sending the form data to the server
    // }
  }

  handleSubmit(){
    console.log(this.createResourceForm.value);
    const formData: Resource = { ...this.createResourceForm.value };
    this.resourceService.addResource(formData).subscribe(
    resourceId => {
      console.log('Resource added successfully. ID:', resourceId);
      // Do further operations or show success message
    },
    error => {
      console.error('Failed to add project:', error);
      // Handle error and show error message
    }
  );
  }

}



