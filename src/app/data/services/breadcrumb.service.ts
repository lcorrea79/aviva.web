import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IBreadcrumb } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbSubject = new BehaviorSubject<IBreadcrumb[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  constructor() { }

  public updateBreadcrumbs(crumb: IBreadcrumb[]) {
    this.breadcrumbSubject.next(crumb);
  }
}

