import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 


  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

  // constructor() {}

  ngAfterViewInit() {
    console.log(this.sidebarComponent); // Verify if the sidebar component is accessible
  }



  constructor(private renderer: Renderer2, private elementRef: ElementRef ) {}
  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  // toggleSidebar() {
  //   console.log("in togglefunc>>>>>>>");
  //   const sidebarWrapper = document.querySelector(".s-layout__content");
  //   if (sidebarWrapper) {
  //     sidebarWrapper.classList.toggle('openSidebar');
  //   }
  //   this.renderer.addClass(this.elementRef.nativeElement.querySelector('.sidebar'), 'close');
  // }

  toggleSidebar() {
    console.log("in togglefunc>>>>>>>");
    const sidebarWrapper = document.querySelector(".s-layout__content");
    if (sidebarWrapper) {
      sidebarWrapper.classList.toggle('openSidebar');
    }
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    if (sidebar) {
      const isClosed = sidebar.classList.contains('close');
      if (isClosed) {
        this.renderer.removeClass(sidebar, 'close');
      } else {
        this.renderer.addClass(sidebar, 'close');
      }
    }
  }
}
