//-------------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------------
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//-------------------------------------------------------------------------------------
// Interface
//-------------------------------------------------------------------------------------
export interface BreadcrumbsItems {
  label?: string;
  active?: boolean;
  link?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  //-------------------------------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------------------------------
  @Input() public title: string | null = null;
  @Input() public breadcrumbItems!: BreadcrumbsItems[];
  //-------------------------------------------------------------------------------------
  constructor(private router: Router) {}
  //-------------------------------------------------------------------------------------
  ngOnInit(): void {}
  //-------------------------------------------------------------------------------------
  navigate(item: BreadcrumbsItems) {
    if (item.link && !item.active) {
      this.router.navigate([item.link]);
    }
  }
}
