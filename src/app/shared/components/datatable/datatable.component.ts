//---------------------------------------------------------------------
// Imports
//---------------------------------------------------------------------
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { Location } from '@angular/common';
import { DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class TableComponent implements AfterViewChecked {
  //---------------------------------------------------------------------
  // Properties
  //---------------------------------------------------------------------
  @Input() rows: any[];
  @Input() columns: any[];
  @Input() selected: any[] = [];
  @Input() selectionType: SelectionType = SelectionType.checkbox;
  @Input() sortType: SortType = SortType.single;
  @Input() loadingIndicator: boolean;
  @Input() pageSize: number;
  @Input() currentPage: number;
  @Input() totalItems: number;
  @Input() rowHeight: number;
  //---------------------------------------------------------------------
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() rowCliked = new EventEmitter<any>();
  //---------------------------------------------------------------------
  @ViewChild('table') table: DatatableComponent;
  @ViewChild('pageSizeInput') pageSizeInput: ElementRef;
  //---------------------------------------------------------------------
  constructor(
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}
  //---------------------------------------------------------------------
  ngAfterViewChecked(): void {
    this.table.recalculate();
    if (this.rows?.length) {
      this.pageSizeInput.nativeElement.style.width =
        (this.pageSizeInput?.nativeElement?.value?.length + 1) * 8.5 + 'px';
    }
    this.cdr.detectChanges();
  }
  //---------------------------------------------------------------------
  onRowClicked(event) {
    if (event?.type === 'click') {
      this.rowCliked.emit(event?.row);
    }
  }
  //---------------------------------------------------------------------
  goBack() {
    this.location.back();
  }
  //---------------------------------------------------------------------
  onPageSizeChange() {
    const newSize = Number(this.pageSizeInput?.nativeElement?.value);

    if (newSize) {
      if (newSize !== this.pageSize) {
        this.pageSize = newSize;
        this.pageSizeChange.emit(this.pageSize);
      }
    } else {
      this.pageSizeInput.nativeElement.value = this.pageSize;
      this.pageSizeInput.nativeElement.style.width =
        (this.pageSizeInput?.nativeElement?.value?.length + 1) * 8.5 + 'px';
      this.cdr.detectChanges();
    }
  }
  //---------------------------------------------------------------------
  onPageChange(event) {
    this.currentPageChange.emit(event);
  }
  //---------------------------------------------------------------------
  currentRows(): number {
    if (this.rows?.length == this.totalItems) {
      const lastPage = Math.ceil(this.totalItems / this.pageSize);
      const lastPageRows = this.totalItems % this.pageSize;

      if (this.currentPage === lastPage) {
        return lastPageRows || this.pageSize;
      } else {
        return this.pageSize;
      }
    }

    return this.rows?.length;
  }
}
