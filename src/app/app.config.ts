import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { AuthGuard } from './core/guards/auth.guard';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { getHrPaginatorIntl } from './core/utils/hr-paginator-int';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import localeHr from '@angular/common/locales/hr';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { resReqInterceptor } from './core/interceptors/res-req.interceptor';

registerLocaleData(localeHr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, resReqInterceptor])),
    provideTransloco({
      config: {
        availableLangs: ['hr'],
        defaultLang: 'hr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAnimations(),
    AuthGuard,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true,
        width: '100%',
        maxWidth: '500px',
        panelClass: ['bg-white', 'rounded-xl'],
      },
    },
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: MatPaginatorIntl,
      useValue: getHrPaginatorIntl(),
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSizeOptions: [15, 25, 50],
      },
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: { animationDuration: '0ms' },
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd.MM.yyyy.' },
    },
    {
      provide: LOCALE_ID,
      useValue: 'hr-HR',
    },
  ],
};
