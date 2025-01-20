/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Component, OnInit } from '@angular/core';
/**************************************************************************************
 * Core Services
 *************************************************************************************/
import { EventService } from '../../core/services/event.service';


@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {    
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-topbar', 'light');
    document.documentElement.setAttribute('data-sidebar', 'light');
    document.documentElement.setAttribute('data-layout-style', 'default');
    document.documentElement.setAttribute('data-layout-mode', 'light');
    document.documentElement.setAttribute('data-layout-width', 'fluid');
    document.documentElement.setAttribute('data-layout-position', 'fixed');
    document.documentElement.setAttribute('data-sidebar-image', 'none');
    document.documentElement.setAttribute('data-sidebar-size', 'sm-hover')
    document.documentElement.setAttribute('data-preloader', 'disable');
    document.documentElement.setAttribute('data-sidebar-visibility', 'show');
    
    window.addEventListener('resize', function () {
      if (document.documentElement.clientWidth <= 767) {
        document.documentElement.setAttribute('data-sidebar-size', '');
      }
      else {
        const dataSidebarSize = document.documentElement.getAttribute("data-sidebar-size");
        if (dataSidebarSize == 'sm-hover-active') {
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
        } else {
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        }
      }
    })

  }

  /*
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {     
  document.body.classList.toggle('sidebar-enable');
  const currentSIdebarSize = document.documentElement.getAttribute("data-sidebar-size");
  if (document.documentElement.clientWidth >= 767) {
    if (currentSIdebarSize == null) {
      (document.documentElement.getAttribute('data-sidebar-size') == null || document.documentElement.getAttribute('data-sidebar-size') == "lg") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg')
    } else if (currentSIdebarSize == "md") {
      (document.documentElement.getAttribute('data-sidebar-size') == "md") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'md')
    } else {
      (document.documentElement.getAttribute('data-sidebar-size') == "sm") ? document.documentElement.setAttribute('data-sidebar-size', 'lg') : document.documentElement.setAttribute('data-sidebar-size', 'sm')
    }
  }
  if (document.documentElement.clientWidth <= 767) {
    document.body.classList.toggle('vertical-sidebar-enable');
  }
  }
  
  onResize(event:any) {
    if(document.body.getAttribute('layout') == "twocolumn") {
      if (event.target.innerWidth <= 767) {
        this.eventService.broadcast('changeLayout', 'vertical');     
      }else{
        this.eventService.broadcast('changeLayout', 'twocolumn');  
        document.body.classList.remove('twocolumn-panel'); 
        document.body.classList.remove('vertical-sidebar-enable'); 
      }
    }
  }
}
