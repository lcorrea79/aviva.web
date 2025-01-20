/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
/**************************************************************************************
 * Core Services and Guards Imports
 *************************************************************************************/
import { AuthGuard } from './core/guards/auth-guard.service';
import { Utilities } from './core/services/utilities';
import { LayoutComponent } from './layout/layout.component';
import { ProductListComponent } from './modules/product/containers/product-list/product-list.component';
/**************************************************************************************
 * Compoents and Modules Imports
 *************************************************************************************/

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'Products' },
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./modules/order/order.module').then((m) => m.OrderModule)
      }      
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule {}
