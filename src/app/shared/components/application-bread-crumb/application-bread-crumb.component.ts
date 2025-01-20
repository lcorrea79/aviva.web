import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../data/services/breadcrumb.service';
import { IBreadcrumb } from 'src/app/data/models/breadcrumb.model';
import { NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-application-bread-crumb',
  templateUrl: './application-bread-crumb.component.html',
  styleUrls: ['./application-bread-crumb.component.scss']
})
export class ApplicationBreadCrumbComponent implements OnInit, OnDestroy, AfterViewChecked {
  private unsubscribe$ = new Subject<void>();
  public breadcrumbs: IBreadcrumb[] = [];
  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    //Validate when route changes, delete breadcrumbs
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.breadcrumbs = null;
      }
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  ngAfterViewChecked() {
    this.breadcrumbService.breadcrumb$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(values => {
        this.breadcrumbs = values;
        this.cdRef.detectChanges();
      })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }

}
