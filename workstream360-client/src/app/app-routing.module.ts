import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourcesComponent } from './resources/resources.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { ProjectsComponent } from './projects/projects.component';
import { RisksComponent } from './risks/risks.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProjectComponent } from './view-project/view-project.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'budget-dashboard', component: BudgetsComponent },
  { path: 'timecards', component: TimeManagementComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'risks', component: RisksComponent },
  { path: 'create-project', component: CreateProjectComponent },
  {path: 'create-resource' , component: CreateResourceComponent},
  {path : 'resource/:resourceId', component: ProfileComponent},
  {path : 'project/:projectId', component: ViewProjectComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
