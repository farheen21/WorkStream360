import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourcesComponent } from './resources/resources.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { ProjectsComponent } from './projects/projects.component';
import { RisksComponent } from './risks/risks.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'budget-dashboard', component: BudgetsComponent },
  { path: 'time-management', component: TimeManagementComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'risks', component: RisksComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
