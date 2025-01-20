import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
//----------------------------------------------------------------------------
// Imports Section (Observable)
//----------------------------------------------------------------------------
import { Subject, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-infinite-scroll-dropdown',
  templateUrl: './infinite-scroll-dropdown.component.html',
  styleUrls: ['./infinite-scroll-dropdown.component.scss']
})
export class InfiniteScrollDropdownComponent implements OnInit, OnDestroy {
  //------------------------------------------------------------------------
  // @Input Attributes Section
  //------------------------------------------------------------------------
  @Input() items: any[] = [];
  @Input() loading: boolean = false;
  @Input() defaultSelected: any | null = null;
  @Input() placeholder: string = 'Select Item';
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string = 'value';
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() bufferSize: number;
  @Input() disabled: boolean = false;
  @Input() closeOnSelect: boolean = true;
  @Input() emptyMessage: string = 'No items to display';
  //------------------------------------------------------------------------
  // @Output Published Events Section
  //------------------------------------------------------------------------
  @Output() scrolled = new EventEmitter<void>();
  @Output() selectedOption = new EventEmitter<any>();
  @Output() inputSearch = new EventEmitter<string>();
  //------------------------------------------------------------------------
  // Private Fields Section
  //------------------------------------------------------------------------
  private unsubscribe$ = new Subject<void>();
  private scroll$ = new Subject<void>();
  //------------------------------------------------------------------------
  // Public Fields Section
  //------------------------------------------------------------------------
  public input$ = new Subject<string>();
  public selectedControl = new FormControl();
  public isModifier: boolean = false;
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor() {}
  //------------------------------------------------------------------------
  // Public Methods Section
  //------------------------------------------------------------------------
  ngOnInit(): void {
    this.setIsModifier();

    if (!this.bufferSize) {
      this.bufferSize = this.items?.length ?? 0;
    }

    if (this.defaultSelected) {
      this.setDefaultSelected(this.defaultSelected);
    }
    if (this.isRequired) {
      this.selectedControl.setValidators(Validators.required);
    }

    this.input$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.inputSearch.emit(data);
    });

    this.scroll$
      .pipe(
        throttleTime(300), // Emit every 300 milliseconds at most
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.scrolled.emit();
      });
  }
  //------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.scroll$.next();
    this.scroll$.complete();
  }
  //------------------------------------------------------------------------
  setDefaultSelected(defaultSelected: any) {
    this.selectedControl.setValue(defaultSelected);
  }
  //------------------------------------------------------------------------
  onScroll({ end }): void {
    if (
      !this.loading &&
      this.items &&
      end + this.bufferSize / 3 >= this.items?.length &&
      this.items?.length > 0 &&
      this.items?.length >= this.bufferSize
    ) {
      this.scroll$.next();
    }
  }
  //------------------------------------------------------------------------
  onScrollToEnd(): void {
    this.scroll$.next();
  }
  //------------------------------------------------------------------------
  onChange(event: any): void {
    this.setIsModifier();
    this.selectedOption.emit(event);
  }
  //------------------------------------------------------------------------
  select(value: any): void {
    if (value) {
      const item = this.items?.find((i) => this.compareFn(i[this.bindValue], value));
      if (item) {
        this.selectedControl?.setValue(item);
      }
    } else {
      this.selectedControl?.setValue(null);
    }
  }
  //------------------------------------------------------------------------
  compareFn(o1: any, o2: any): boolean {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }
  //------------------------------------------------------------------------
  setIsModifier() {
    if (this.items?.length > 0) {
      const item = this.items[0];
      if (item[this.bindLabel]?.length > 3) {
        if (item[this.bindLabel].substring(3, 4) === '-') {
          this.isModifier = true;
        }
      }
    }
  }
  //------------------------------------------------------------------------
  clear() {
    this.selectedControl.setValue(null);
  }
}
