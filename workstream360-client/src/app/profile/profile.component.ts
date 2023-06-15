import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { ActivatedRoute } from '@angular/router';
import { Resource } from '../Modal/resource_dto';
import { ResourceService } from '../service/resource.service';
import { ProjectResponse } from '../Modal/project_response_dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  EditResourceForm !: FormGroup;
  projects!: ProjectResponse[];
  resourceId!: number;
  resource!: Resource;
  showPersonalDetail : boolean = true;
  showSkill : boolean = false;
  showCertificate : boolean = false ;
  showProject : boolean = false;
  showResume : boolean = false;



  constructor(private formBuilder: FormBuilder , private projectService: ProjectService , private route: ActivatedRoute , private resourceService : ResourceService) { 
    this.EditResourceForm = this.formBuilder.group({
      resourceDateOfBirth: [''],
      resourceReportingManager: [''],
      resourceExperience: [''],
      resourcecredentialID: ['387483756']
    });
  }
  
  
  ngOnInit() {
    // this.resourceId = 1; // Example: Set the resourceId to 1
    this.getResourceDetails();
  }
  
  saveForm() {
    const formData = this.EditResourceForm.value;
    console.log("I am clicked before if for saving form", formData);
  }

  

  fetchProjectsByResource(resourceName: string): void {
    console.log(resourceName);
    this.projectService.getProjectsByResource(resourceName).subscribe(
      projects => {
        this.projects = projects;
        console.log("from profile cmp---->",projects)
        // Handle the received projects
      },
      error => {
        // Handle errors if any
        console.error(error);
      }
    );
  }

  // getResourceDetails(): void {
  //   this.route.params.subscribe(params => {
  //     const resourceId = params['resourceId'];
  //     console.log("resourceId--->",resourceId);
  //     this.resourceService.getResourceById(resourceId)
  //       .subscribe(
  //         (response: Resource) => {
  //           this.resource = response;
  //           console.log('Resource:', this.resource);
  //           this.EditResourceForm.patchValue({
  //             resourceDateOfBirth: this.resource.resourceDateOfBirth,
  //             resourceReportingManager: this.resource.resourceReportingManager,
  //             resourceExperience: this.resource.resourceExperience,
  //           })
  //         },
  //         (error: any) => {
  //           console.error('Error:', error);
  //         }
  //       );
  //   });
  // }


  getResourceDetails(): void {
    this.route.params.subscribe(params => {
      const resourceId = params['resourceId'];
      console.log("resourceId--->", resourceId);
      this.resourceService.getResourceById(resourceId).subscribe(
        (response: Resource) => {
          this.resource = response;
          console.log('Resource:', this.resource);
          this.EditResourceForm.patchValue({
            resourceDateOfBirth: this.resource.resourceDateOfBirth,
            resourceReportingManager: this.resource.resourceReportingManager,
            resourceExperience: this.resource.resourceExperience,
          });
          
          const resourceName = `${this.resource.resourceFirstName} ${this.resource.resourceLastName}`;
          this.fetchProjectsByResource(resourceName);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    });
  }
  
  
  handlePersonalDetail(){
    this.showPersonalDetail = true;
    this.showSkill = false;
    this.showCertificate =  false;
    this.showProject = false;
    this.showResume = false;
  }
  handleSkill(){
    this.showSkill = true;
    this.showPersonalDetail = false;
    this.showCertificate =  false;
    this.showProject = false;
    this.showResume = false;
  }

  handleCertificate(){
    this.showCertificate = true;
    this.showSkill = false;
    this.showPersonalDetail = false;
    this.showProject = false;
    this.showResume = false;
  }

  handleProject(){
    this.showProject =true;
    this.showSkill = false;
    this.showPersonalDetail = false;
    this.showCertificate =  false;
    this.showResume = false;
  }
  handleResume(){
    this.showResume =true;
    this.showSkill = false;
    this.showPersonalDetail = false;
    this.showCertificate =  false;
    this.showProject = false;
  }

  navigateBacktoResource(){

  }

}
