/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-guard.service';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'form/:id', component: ProductFormComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class ProductRoutingModule {}
