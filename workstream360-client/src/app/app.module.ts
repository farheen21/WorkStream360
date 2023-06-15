import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TestingComponent } from './testing/testing.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HttpClientModule } from '@angular/common/http';
// import { MatInputModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { ViewProjectComponent } from './view-project/view-project.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { AddResourceToProjectComponent } from './add-resource-to-project/add-resource-to-project.component';
import { ViewProjectResourceTableComponent } from './view-project-resource-table/view-project-resource-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProjectsComponent } from './projects/projects.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { TimeManagementComponent } from './time-management/time-management.component';
import { RisksComponent } from './risks/risks.component';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent,
    TestingComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    CreateResourceComponent,
    AddResourceToProjectComponent,
    ViewProjectResourceTableComponent,
    DashboardComponent,
    ResourcesComponent,
    ProjectsComponent,
    BudgetsComponent,
    TimeManagementComponent,
    RisksComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatNativeDateModule ,
    MatInputModule ,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgApexchartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
