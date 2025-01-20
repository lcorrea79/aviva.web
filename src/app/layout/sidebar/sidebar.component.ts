/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
/**************************************************************************************
 * Data and Models Imports
 *************************************************************************************/
import { MENU } from './menu';
import { MenuItem } from '../../core/models/menu.model';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { cloneDeep } from 'lodash';
import { Sidebar } from 'src/app/data/models/enums';
//import { Sidebar, SidebarMap } from 'src/app/data/models/enums';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  /************************************************************************************
   * Properties
   ***********************************************************************************/
  public menuItems: MenuItem[] = [];
  
  private unsubscribe$ = new Subject<void>();

  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.menuItems = MENU;

    // this.store.dispatch(userActions.loadUserPreferences());
    // this.userPreferences$.pipe(takeUntil(this.unsubscribe$)).subscribe((userPreferences: UserPreferences) => {
    //   if (userPreferences && JSON.stringify(this.preferences) !== JSON.stringify(userPreferences)) {
    //     this.preferences = cloneDeep(userPreferences);
    //     const sidebar = this.preferences?.sideBar ?? Sidebar.Open;
    //     document.documentElement.setAttribute('data-sidebar-size', SidebarMap[sidebar]);
    //   }
    // });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /*
   * Activate droup down set
   */
  ngAfterViewInit() {
    this.initActiveMenu();
    document.documentElement.setAttribute('data-sidebar-size', "sm-hover-active");
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      if (item.classList.contains('menu-link')) {
        if (!item.classList.contains('active')) {
          item.setAttribute('aria-expanded', false);
        }
        item.nextElementSibling ? item.nextElementSibling.classList.remove('show') : null;
      }
      if (item.classList.contains('nav-link')) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
        item.setAttribute('aria-expanded', false);
      }
      item.classList.remove('active');
    });
  }

  toggleSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded', 'false');
    });

    if (event.target && event.target.nextElementSibling) {
      isCurrentMenuId.setAttribute('aria-expanded', 'true');
      event.target.nextElementSibling.classList.toggle('show');
    }
  }

  toggleExtraSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded', 'false');
    });

    if (event.target && event.target.nextElementSibling) {
      isCurrentMenuId.setAttribute('aria-expanded', 'true');
      event.target.nextElementSibling.classList.toggle('show');
    }
  }

  toggleParentItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName('a'));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains('active'));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
      });
    }
    isCurrentMenuId.setAttribute('aria-expanded', 'true');
    if (isCurrentMenuId) {
      this.activateParentDropdown(isCurrentMenuId);
    }
  }

  toggleItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains('show')) {
      isMenu.classList.remove('show');
      isCurrentMenuId.setAttribute('aria-expanded', 'false');
    } else {
      let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });
      isMenu ? isMenu.classList.add('show') : null;
      const ul = document.getElementById('navbar-nav');
      if (ul) {
        const iconItems = Array.from(ul.getElementsByTagName('a'));
        let activeIconItems = iconItems.filter((x: any) => x.classList.contains('active'));
        activeIconItems.forEach((item: any) => {
          item.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
        });
      }
      isCurrentMenuId.setAttribute('aria-expanded', 'true');
      if (isCurrentMenuId) {
        this.activateParentDropdown(isCurrentMenuId);
      }
    }
  }

  // remove active items of two-column-menu
  activateParentDropdown(item: any) {
    item.classList.add('active');
    let parentCollapseDiv = item.closest('.collapse.menu-dropdown');

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add('show');
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      parentCollapseDiv.parentElement.children[0].setAttribute('aria-expanded', 'true');
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        parentCollapseDiv.parentElement.closest('.collapse').classList.add('show');
        if (parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling)
          parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling.classList.add('active');
        if (parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling.closest('.collapse')) {
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .classList.add('show');
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .previousElementSibling.classList.add('active');
        }
      }
      return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link'));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  initActiveMenu() {
    const pathName = window.location.pathname;
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link'));
      let activeItems = items.filter((x: any) => x.classList.contains('active'));
      this.removeActivation(activeItems);

      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }

  toggleMobileMenu(event: any) {
    // Trigger a window's resize event in case the user is in the calendar view. This will force the calendar to resize to the new window size.
    window.dispatchEvent(new Event('resize'));

    var sidebarsize = document.documentElement.getAttribute('data-sidebar-size');
    const sidebar = sidebarsize === 'sm-hover' ? Sidebar.Open : Sidebar.Close;
  
  }
}
