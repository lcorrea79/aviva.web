/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
/**************************************************************************************
 * Modules Imports
 *************************************************************************************/
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../shared/shared.module';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { OrderListComponent } from './containers/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { NewOrderFormComponent } from './components/new-order-form/new-order-form.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderFormComponent,
    NewOrderFormComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OrderRoutingModule,
    NgbToastModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbModule,
    CKEditorModule,
    FlatpickrModule,
    FlatpickrModule.forRoot(),
    SharedModule,
    ArchwizardModule,
    DropzoneModule,
  ],
})
export class OrderModule {}
