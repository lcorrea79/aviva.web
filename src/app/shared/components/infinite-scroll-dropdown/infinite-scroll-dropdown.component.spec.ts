import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollDropdownComponent } from './infinite-scroll-dropdown.component';

describe('InfiniteScrollDropdownComponent', () => {
  let component: InfiniteScrollDropdownComponent;
  let fixture: ComponentFixture<InfiniteScrollDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollDropdownComponent]
    });
    fixture = TestBed.createComponent(InfiniteScrollDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
