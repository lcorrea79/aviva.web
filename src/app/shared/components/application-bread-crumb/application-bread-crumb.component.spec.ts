import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationBreadCrumbComponent } from './application-bread-crumb.component';

describe('ApplicationBreadCrumbComponent', () => {
  let component: ApplicationBreadCrumbComponent;
  let fixture: ComponentFixture<ApplicationBreadCrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationBreadCrumbComponent]
    });
    fixture = TestBed.createComponent(ApplicationBreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
