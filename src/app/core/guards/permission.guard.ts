import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { AlertService } from '../services/alert.service';



@Injectable({
  providedIn: 'root',
})
export class PermissionGuard {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private alertService: AlertService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredPermissions = route.data.permissions as string[];


    return true;
  }

}
