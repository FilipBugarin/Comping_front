import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const resReqInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loaderService = inject(LoaderService);

  loaderService.loadingOn();

  return next(req).pipe(
    catchError((httpErrorResponse) => {
      // TODO: show errors in snackbar
      throw httpErrorResponse;
    }),
    finalize(() => loaderService.loadingOff())
  );
};
