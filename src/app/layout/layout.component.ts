/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Component, OnInit } from '@angular/core';
/**************************************************************************************
 * Core Services Imports
 *************************************************************************************/
import { EventService } from '../core/services/event.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

/**
 * Layout Component
 */
export class LayoutComponent implements OnInit {

  /************************************************************************************
   * Properties
   ***********************************************************************************/
  public layoutType: string = "vertical";

  constructor(private eventService: EventService) { }

  ngOnInit (): void {

    document.body.setAttribute('layout', this.layoutType);

    /**********************************************************************************
     * Note: Listen to event and change the layout, theme, etc
     *********************************************************************************/
    this.eventService.subscribe('changeLayout', (layout) => this.layoutType = layout);

  }
}
