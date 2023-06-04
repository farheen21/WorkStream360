import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef , private route: ActivatedRoute , private router: Router ) {}

  handleClick(pageName: string) {
    const selected = this.elementRef.nativeElement.querySelectorAll('.selected');

    if (selected.length > 0) {
      selected.forEach((element: HTMLElement) => {
        element.classList.remove('selected');
      });
    }

    const pageLinks = this.elementRef.nativeElement.querySelectorAll(`[data-id="${pageName}"]`);
    if (pageLinks.length > 0) {
      pageLinks.forEach((element: HTMLElement) => {
        element.classList.add('selected');
      });
    }

    // Navigate to the corresponding route based on the pageName
  switch (pageName) {
    case 'dashboard':
      this.router.navigateByUrl('/dashboard');
      console.log(pageName , "dashboard")
      break;
    case 'resources':
      this.router.navigateByUrl('/resources');
      console.log(pageName)
      break;
    case 'budget-dashboard':
      this.router.navigateByUrl('/budget-dashboard');
      console.log(pageName)
      break;
    case 'time-management':
    this.router.navigateByUrl('/time-management');
    console.log(pageName)
    break;
    case 'projects':
      this.router.navigateByUrl('/projects');
      console.log(pageName)
      break;
    case 'risks':
      this.router.navigateByUrl('/risks');
      console.log(pageName)
      break;
    
    default:
      break;
  }
  }
}
