/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TranslateModule } from '@ngx-translate/core';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { LayoutComponent } from './layout.component';
import { VerticalComponent } from './vertical/vertical.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, VerticalComponent, TopbarComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, NgbDropdownModule, NgbNavModule, SimplebarAngularModule, TranslateModule, SharedModule],
  providers: [],
})
export class LayoutsModule {}
