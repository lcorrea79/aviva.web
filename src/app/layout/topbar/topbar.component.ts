//-------------------------------------------------------------------------------------
// Imports
//-------------------------------------------------------------------------------------
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
//-------------------------------------------------------------------------------------
import { EventService } from '../../core/services/event.service';
import { AlertService } from '../../core/services/alert.service';
//-------------------------------------------------------------------------------------
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/store/actions/index';
import * as selector from 'src/app/store/selectors/index';
import { Subject, filter, first, fromEvent, takeUntil, tap } from 'rxjs';
import { cloneDeep } from 'lodash';
//import { Sidebar, SidebarMap, Theme, ThemeMap } from 'src/app/data/models/enums';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy, AfterViewInit {
  //-------------------------------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------------------------------
  public element: any;
  public mode: any;
  // public themeMap = ThemeMap;
  // public sidebarMap = SidebarMap;
  // public theme = Theme;

  public searchTerm: string = '';
  public pageSize: number = 10;
  public currentPage: number = 1;
  public allDataLoaded: boolean = false;
  public isSearching: boolean = false;
  public isDateSearch: boolean = false;
  public isDateSearchValid: boolean = false;
  //-------------------------------------------------------------------------------------
  private unsubscribe$ = new Subject<void>();
  private readonly scrollThreshold = 150;
  //-------------------------------------------------------------------------------------
  @Output() mobileMenuButtonClicked = new EventEmitter();
  //-------------------------------------------------------------------------------------
  @ViewChild('myDropdown') myDropdown: any;
  @ViewChild('mobileDropdown') mobileDropdown: any;
  //-------------------------------------------------------------------------------------
  // Constructor Method Section
  //-------------------------------------------------------------------------------------
  constructor(
    @Inject(DOCUMENT) private document: any,
    private eventService: EventService,
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>,
    private el: ElementRef
  ) {}
  //-------------------------------------------------------------------------------------
  // Methods Section
  //-------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.element = document.documentElement;
   
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    const simpleBarElement = this.el.nativeElement.querySelector('.simplebar-content-wrapper');
    if (simpleBarElement) {
      fromEvent(simpleBarElement, 'scroll').subscribe((event) => this.loadMore(event));
    }
  }

  sliceApps(apps: any[]) {
    const chunkArray = (array: any[], chunkSize: number) => {
      const tempArray: any[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        tempArray.push(array.slice(i, i + chunkSize));
      }
      return tempArray;
    };
    return chunkArray(apps, 3);
  }

  //-------------------------------------------------------------------------------------
  // Toggle the menu bar when having mobile screen
  //-------------------------------------------------------------------------------------
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (!document.fullscreenElement && !this.element.mozFullScreenElement && !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  changeMode() {
    // const updatedPreferences: UserPreferences = {
    //   ...(this.preferences ?? new UserPreferences()),
    //   theme: mode
    // };
    // this.store.dispatch(actions.userActions.updateUserPreferences({ userPreferences: updatedPreferences }));
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }

  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  search(value: string) {
    this.searchTerm = value;

    this.isDateSearch = this.searchTerm.includes('/');
    this.currentPage = 1;
    this.isSearching = true;   
  }

  closeBtn() {
    if (this.myDropdown) {
      this.myDropdown.close();
    }

    if (this.mobileDropdown) {
      this.mobileDropdown.close();
    }

    this.searchTerm = '';
    const searchInput = document.getElementById('search-options') as HTMLInputElement;
    searchInput.value = '';
  }

  loadMore(event: any) {
    if (this.allDataLoaded) return;

    const { scrollTop, clientHeight, scrollHeight } = event?.target || {};
    if (scrollTop + clientHeight >= scrollHeight - this.scrollThreshold) {
      this.currentPage++;
    }
  }

  onInputBlur() {
    // Use a timeout to allow click event on dropdown item to be registered
    setTimeout(() => {
      if (this.myDropdown) {
        this.myDropdown.close();
      }
    }, 100);
  }

  openClientModal() {
    //this.clientService.openAddClientModal();
  }
}
