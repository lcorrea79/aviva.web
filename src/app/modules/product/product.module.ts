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
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProductRoutingModule,
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
export class ProductModule {}
