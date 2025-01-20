 /**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
  unsavedChanges: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate() ? true : component.unsavedChanges();
  }
}

export { CanDeactivate };
