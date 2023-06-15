import { Component, OnInit } from '@angular/core';
import { TimecardService } from '../service/timecard.service';
import { TimeCard } from '../Modal/timecard_dto';
import { ProjectService } from '../service/project.service';
import { SharedDataService } from '../service/shared-data.service';
import { switchMap } from 'rxjs';

interface AccordionItem {
  projectId: number;
  projectName: string;
  expanded: boolean;
}



@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})


export class TimeManagementComponent implements OnInit{

  // projectTimeCards: { timeCards: TimeCard[] }[] = [];
  daysData: number[] = [0, 0, 0, 0, 0, 0, 0]; // Initialize with default values of 0
  employeeTargetHours = 40;
  totalHours = 0;
  Absvariance = 0;
  status : String = "Pending";
  projectName : String = "";
  timeCards!: TimeCard[];
  projectId!: number;
  // response!: { timeCards: TimeCard[]; };
  response: { timeCards: TimeCard[] } = { timeCards: [] };
  timeCardsByProject: { [projectId: number]: TimeCard[] } = {};
  accordionItems: AccordionItem[] = [];

  // accordionItems = [
  //   { heading: 'Item 1', content: 'Content 1', expanded: false },
  //   { heading: 'Item 2', content: 'Content 2', expanded: false },
  //   { heading: 'Item 3', content: 'Content 3', expanded: false }
  // ];

  constructor( private timeCardService : TimecardService , private sharedDataService : SharedDataService){
  
  }
  ngOnInit(): void {
    this.sharedDataService.projectId$.subscribe(projectId => {
      // Use the received projectId to make HTTP requests or perform other operations
      console.log('Received projectId:', projectId);
    });
    console.log("Time Card Innitialize")
    // this.getProjectTimeCards();
    this.getAllTimeCards()
    this.getProjectTimeCards();
  } 



  // toggleAccordion(item: any) {
  //   item.expanded = !item.expanded;
  // }

  toggleAccordion(item: AccordionItem) {
    item.expanded = !item.expanded;
  }

  getDayLabel(index: number): string {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek[index];
  }

  calculateTotal(): number {
    this.totalHours = this.daysData.reduce((sum, value) => sum + value, 0);
    return this.totalHours;
  }

  
  calculateVariance(): number {
    const variance = this.employeeTargetHours - this.totalHours;
    const absoluteVariance = Math.abs(variance);
     this.Absvariance= (absoluteVariance / this.employeeTargetHours) * 100;
     return this.Absvariance;
  }
  
  handleRejected(){
     this.status = "Rejected";
  }
  
  handleApproved(){
    this.status = "Approved";
  }



  // getProjectTimeCards(): void {
  //   this.sharedDataService.projectId$.subscribe((projectId: number) => {
  //     const subscription = this.timeCardService.getProjectTimeCards(projectId).subscribe(
  //       (response: { timeCards: TimeCard[] }) => {
  //         if (response && response.timeCards) {
  //           this.response = response; 
  //           this.timeCards = response.timeCards;
  //           console.log("Time Card component received this response ---->", response);
  //         } else {
  //           console.error('Invalid response or missing timeCards property:', response);
  //           // Handle error and show error message
  //         }
  //       },
  //       (error) => {
  //         console.error('Failed to retrieve project time cards:', error);
  //         // Handle error and show error message
  //       }
  //     );
  
  //     // // Unsubscribe to avoid memory leaks
  //     // subscription.unsubscribe();
  //   });
  // }
  getProjectTimeCards() {
  this.timeCardsByProject = {}; // Initialize the object
  this.timeCards.forEach((card) => {
    if (!this.timeCardsByProject[card.projectId]) {
      this.timeCardsByProject[card.projectId] = []; // Initialize the array for the project ID
    }
    this.timeCardsByProject[card.projectId].push(card); // Add the time card to the project's array
  });
}
  
  getAllTimeCards(): void {
    this.timeCardService.getAllTimeCards().subscribe(
      (timeCards: TimeCard[]) => {
        this.timeCards = timeCards;
        console.log('All Time Cards:', this.timeCards);
        // this.segregateTimeCardsByProject(timeCards);
        this.segregateTimeCardsByProject();
      },
      (error) => {
        console.error('Failed to retrieve time cards:', error);
        // Handle error and show error message
      }
    );
  }
 
  // segregateTimeCardsByProject(timeCards: TimeCard[]): void {
  //   timeCards.forEach((timeCard) => {
  //     const projectId = timeCard.projectId;
  //     if (this.timeCardsByProject[projectId]) {
  //       this.timeCardsByProject[projectId].push(timeCard);
  //     } else {
  //       this.timeCardsByProject[projectId] = [timeCard];
  //     }
  //   });
  
  //   console.log("Time Cards segregated by Project ID:", this.timeCardsByProject);
  // }

  segregateTimeCardsByProject(): void {
    this.timeCards.forEach((timeCard) => {
      const projectId = timeCard.projectId;
      if (this.timeCardsByProject[projectId]) {
        this.timeCardsByProject[projectId].push(timeCard);
      } else {
        this.timeCardsByProject[projectId] = [timeCard];
        this.accordionItems.push({ projectId, projectName: timeCard.projectName, expanded: false });
      }
    });

    console.log("Time Cards segregated by Project ID:", this.timeCardsByProject);
  }

}
