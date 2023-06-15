import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../service/resource.service';
import { Resource } from '../Modal/resource_dto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit{
 
  searchForm: FormGroup;
  filteredResources: Resource[] = [];
  resources!: Resource[];
  // constructor(private router : Router , private resourceService : ResourceService) {}

  constructor(private router : Router , private resourceService: ResourceService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.getAllResources();
  }
  submit(){
    console.log("I AM CALLED IN METHOD")
  }
  
  navigateToCreateResource(){
    this.router.navigate(['/create-resource']);
  }
   
  getAllResources() {
    this.resourceService.getAllResources().subscribe(
      (response: Resource[]) => {
        this.resources = response;
        this.filteredResources = this.resources;
        console.log("Got the list of all resources",response)
      },
      (error) => {
        console.error('Failed to fetch resources:', error);
      }
    );
  }

  
  searchResources() {
    const searchTerm = this.searchForm.value.searchTerm.trim().toLowerCase();
  
    if (searchTerm === '') {
      this.filteredResources = this.resources;
      console.log(this.resources);
    } else {
      this.filteredResources = this.resources.filter(resource =>
        (resource.resourceFirstName && resource.resourceFirstName.toLowerCase().includes(searchTerm)) ||
        (resource.resourceLastName && resource.resourceLastName.toLowerCase().includes(searchTerm))
      );
      console.log(this.filteredResources);
    }
  }

  
  navigateToProfile(resourceId: number) {
    // const url = `profile/${resourceName}`;
    // this.router.navigate([url]);

    this.router.navigate(['resource', resourceId]);
  }
  
}
