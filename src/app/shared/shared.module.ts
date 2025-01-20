/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
  NgbNavModule,
  NgbTooltipModule,
  NgbAlertModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlatpickrModule } from 'angularx-flatpickr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
/**************************************************************************************
 * Others Imports and Declarations
 *************************************************************************************/
import { ScrollspyDirective } from './directives/scrollspy.directive';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HoverDirective } from './directives/hover.directive';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TableComponent } from './components/datatable/datatable.component';
import { AlphabetOnlyDirective } from './directives/alphabet-only.directive';
import { AlphaNumericOnlyDirective } from './directives/alpha-numeric-only.directive';
import { AppAttachToFormDirective } from './directives/attach-to-parent-form.directive';
import { TwoCharsOrNoneDirective } from './directives/two-chars-or-none.directive';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { Loader } from '@googlemaps/js-api-loader';
import { InfiniteScrollDropdownComponent } from './components/infinite-scroll-dropdown/infinite-scroll-dropdown.component';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { IsSameDayPipe } from './pipes/is-same-day.pipe';
import { ApplicationBreadCrumbComponent } from './components/application-bread-crumb/application-bread-crumb.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    BreadcrumbsComponent,
    ScrollspyDirective,
    FilterPipe,
    HoverDirective,
    TableComponent,
    AlphabetOnlyDirective,
    AlphaNumericOnlyDirective,
    AppAttachToFormDirective,
    TwoCharsOrNoneDirective,
    InfiniteScrollDropdownComponent,
    ToastContainerComponent,
    IsSameDayPipe,
    ApplicationBreadCrumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgbTooltipModule,
    NgxDatatableModule,
    NgxPaginationModule,
    FlatpickrModule.forRoot(),
    RouterModule,
    NgxGpAutocompleteModule,
    NgbToastModule,
    InfiniteScrollModule,
    NgSelectModule,
  ],
  exports: [
    SearchBoxComponent,
    BreadcrumbsComponent,
    ApplicationBreadCrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    ScrollspyDirective,
    FilterPipe,
    HoverDirective,
    NgxMaskDirective,
    NgxMaskPipe,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbNavModule,
    TableComponent,
    AlphabetOnlyDirective,
    AlphaNumericOnlyDirective,
    AppAttachToFormDirective,
    NgbModalModule,
    NgbAlertModule,
    TwoCharsOrNoneDirective,
    NgxGpAutocompleteModule,
    InfiniteScrollModule,
    InfiniteScrollDropdownComponent,
    NgSelectModule,
    ToastContainerComponent,
    IsSameDayPipe,
    FlatpickrModule,
    NgxDatatableModule
  ],
  providers: [
    provideNgxMask(),
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyAQ0zPSy3do-7gmBpxKqXzeAvb5N9cxKTI',
        libraries: ['maps'],
      }),
    },
  ],
})
export class SharedModule { }
