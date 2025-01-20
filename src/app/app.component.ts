/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Component, HostListener } from '@angular/core';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'EzPraxis';

  constructor(private store: Store<AppState>) { }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.onUserActivity();
  }

  //---------------------------------------------------------------------------------
  onUserActivity() {
   // this.store.dispatch(userActions.idleTimeout());
  }
}
