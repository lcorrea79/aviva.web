/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-guard.service';
/**************************************************************************************
 * Components Imports
 *************************************************************************************/
import { OrderListComponent } from './containers/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'form/:id', component: OrderFormComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard],
})
export class OrderRoutingModule {}
