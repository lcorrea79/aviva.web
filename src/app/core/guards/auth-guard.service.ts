/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
/**************************************************************************************
 * Core Services Imports
 *************************************************************************************/
import { Observable, tap } from 'rxjs';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store'; 


@Injectable()
export class AuthGuard {

  /**
   *
   */
  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (state.url.includes("new-token")) return true;
    
    if (next.url[0] && next.url[0].path.includes("client-portal")) {
      let token = next.queryParams?.token;
      return true
      }

    return  true
  }
}
