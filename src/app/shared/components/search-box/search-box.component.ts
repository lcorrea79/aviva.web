//---------------------------------------------------------------------
// Imports
//---------------------------------------------------------------------
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  //---------------------------------------------------------------------
  // Properties
  //---------------------------------------------------------------------
  @Input()
  placeholder = 'Search...';
  //---------------------------------------------------------------------
  @Output()
  searchChange = new EventEmitter<string>();
  //---------------------------------------------------------------------
  @ViewChild('searchInput')
  searchInput: ElementRef;
  //---------------------------------------------------------------------
  private searchSubject = new Subject<string>();
  //---------------------------------------------------------------------
  constructor() {
    this.searchSubject.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((searchTextValue) => {
      this.searchChange.emit(searchTextValue);
    });
  }
  //---------------------------------------------------------------------
  onValueChange(value: string) {
    this.searchSubject.next(value);
  }
  //---------------------------------------------------------------------
  @HostListener('keydown.escape')
  clear() {
    this.searchInput.nativeElement.value = '';
    this.onValueChange(this.searchInput.nativeElement.value);
  }
}
