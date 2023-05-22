import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef , private route: ActivatedRoute ) {}
  // handleClick(){
  //   const link = this.elementRef.nativeElement.querySelector('.icon-link');
  //   if(link){
  //     const isSelected = link.classList.contains('selected');
  //     if (isSelected) {
  //       this.renderer.removeClass(link, 'selected');
  //     } else {
  //       this.renderer.addClass(link, 'selected');
  //     }
  //   }
  // }

  // handleClick(pageName: string) {
  //   const selected = this.elementRef.nativeElement.querySelectorAll('.selected');

  //   if (selected.length > 0) {
  //     selected.forEach((element: HTMLElement) => {
  //       element.classList.remove('selected');
  //     });
  //   }

  //   const pageLinks = this.elementRef.nativeElement.querySelectorAll(`[data-id="${pageName}"]`);
  //   if (pageLinks.length > 0) {
  //     pageLinks.forEach((element: HTMLElement) => {
  //       element.classList.add('selected');
  //     });
  //   }
  // }


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
  }
  
    

}
