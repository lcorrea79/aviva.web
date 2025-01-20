/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule, ErrorHandler, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ToastaModule } from 'ngx-toasta';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgChartsModule } from 'ng2-charts';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
/**************************************************************************************
 * Modules Imports
 *************************************************************************************/
import { LayoutsModule } from './layout/layouts.module';
import { AppRoutingModule } from './app-routing.module';
/**************************************************************************************
 * Core Services and Error Handler Imports
 *************************************************************************************/
import { AppErrorHandler } from './app-error.handler';
import { ConfigurationService } from './core/services/configuration.service';
import { AlertService } from './core/services/alert.service';
import { LocalStoreManager } from './core/services/local-store-manager.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
/**************************************************************************************
 * Data Services Imports
 *************************************************************************************/

/**************************************************************************************
 * Directives Imports
 *************************************************************************************/
import { EqualValidator } from './shared/directives/equal-validator.directive';
import { AutofocusDirective } from './shared/directives/autofocus.directive';
import { BootstrapTabDirective } from './shared/directives/bootstrap-tab.directive';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { AppComponent } from './app.component';
//----------------------------------------------------------------------------
// Imports NgRx
//----------------------------------------------------------------------------
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './store/reducers';
import { metaReducers } from './store/reducers';
import { effects } from './store/effects';
import { SharedModule } from './shared/shared.module';
import { LoadingMessageComponent } from './core/components/loading-message/loading-message.component';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, EqualValidator, AutofocusDirective, BootstrapTabDirective, LoadingMessageComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),

    LayoutsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    AppRoutingModule,
    NgxDatatableModule,
    OAuthModule.forRoot(),
    ToastaModule.forRoot(),
    NgSelectModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgChartsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    SharedModule
  ],
  providers: [
    //{ provide: ErrorHandler, useClass: AppErrorHandler },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    AlertService,
    ConfigurationService,
    LocalStoreManager,
    DatePipe,
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
