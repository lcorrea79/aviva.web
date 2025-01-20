import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
//----------------------------------------------------------------------------
// Imports NRX
//----------------------------------------------------------------------------
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
//import { userActions } from 'src/app/store/actions/index';
import * as selector from 'src/app/store/selectors/index';
//simport { NewAccountService } from 'src/app/data/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Bypass interceptor for token refresh to avoid loop
    if (request.url.endsWith('/refresh-token') ) {
      return next.handle(request);
    }

    return null
  }
}
