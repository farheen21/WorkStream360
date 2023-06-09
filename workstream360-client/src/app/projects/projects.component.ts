import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { ProjectResponse } from '../Modal/project_response_dto';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

 


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  createProjectForm !: FormGroup;
  projects: ProjectResponse[] = [];

  // @ViewChild("chart")
  // chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  
  @ViewChild("chart", {static: false}) chart: ChartComponent | undefined;
  public chartOptions: Partial<any>;
  filteredProjects: ProjectResponse[] = [];
  searchTerm: string = '';
  searchForm: FormGroup;
  totalProjects: number = 0;
  ongoingProject : number = 0;
  criticalProjects : number = 0;
  pipelineProjects : number = 0;

  constructor(private formBuilder: FormBuilder , private router : Router , private _projectService : ProjectService) { 
    this.chartOptions = {
      series: [
        {
          name: "Total Projects",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          color: '#2A76F4'
        },
        {
          name: "Ongoing Projects",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          color: '#22B783'
        },
        {
          name: "Completed Projects",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
          color: '#F08F32'
        }
      ],
      chart: {
        type: "bar",
        // height: 350
        height: 400,
        width: 800
      },
      plotOptions: {
        bar: {
          // horizontal: false,
          // columnWidth: "55%",
          // endingShape: "rounded",
          // borderRadius: 5

          horizontal: false,
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: false
      } as ApexDataLabels,
      stroke: {
        show: true,
        width: 2,
        borderRadius: 50,
        colors: ["transparent"]
        
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "Budget %"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val: string) {
            return "$ " + val + " thousands";
          }
        },
        borderRadius: '50'
      }
    };

    this.searchForm = this.formBuilder.group({
      searchTerm: [''] // initialize with an empty string
    });
  }


  ngOnInit() {
    this.createProjectForm = this.formBuilder.group({
      searchProject: ['', Validators.required],
    });
    this.loadProjects();
  }

  handleFilter(){

  }

  navigateToCreateProject(){
    this.router.navigate(['/create-project']);
  }

  loadProjects(): void {
    this._projectService.getAllProjects()
      .subscribe(
        projects => {
          this.projects = projects;
          this.filteredProjects = projects; 
          console.log("Got projct---->",projects)

          

          this.totalProjects = projects.length;
          this.ongoingProject = projects.filter(project => project.projectStatus === 'Active').length;
          this.pipelineProjects = projects.filter(project => project.projectStatus === 'Upcoming').length;
          this.criticalProjects = projects.filter(project => project.projectHealth === 'Critical').length;


          
          console.log("Total Projects:", this.totalProjects);
          console.log("Active Projects:", this.pipelineProjects);
        },
        error => {
          console.error('Failed to load projects:', error);
          // Handle error and show error message
        }
      );
  }
   
 
  handleSearch() {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    console.log('Search term:', searchTerm);
  
    if (searchTerm !== null && searchTerm !== undefined) {
      const formattedSearchTerm = searchTerm.toLowerCase().trim();
      console.log('Formatted search term:', formattedSearchTerm);
  
      this.filteredProjects = this.projects.filter((project: any) => {
        // Perform your filtering logic here
        const projectName = project.projectName.toLowerCase();
        const projectStatus = project.projectStatus.toLowerCase();
        const projectHealth = project.projectHealth.toLowerCase();
  
        return (
          projectName.includes(formattedSearchTerm) ||
          projectStatus.includes(formattedSearchTerm) ||
          projectHealth.includes(formattedSearchTerm)
        );
      });
    } else {
      // No search term provided, display all projects
      this.filteredProjects = this.projects;
    }
  }
  
}
