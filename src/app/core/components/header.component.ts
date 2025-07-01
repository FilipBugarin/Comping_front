import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatRippleModule,
    MatMenuModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],

  template: `
    <div
      class="flex items-center justify-between bg-primary px-6 py-2 text-white">
      <div class="flex items-center gap-4">
        <div class="text-xl font-semibold">Comping front project</div>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="btn-header flex aspect-square bg-white/10"
          [matMenuTriggerFor]="accessibilityMenu"
          matRipple>
          <span class="material-symbols-outlined"> accessibility </span>
        </button>
        <button
          type="button"
          class="btn-header bg-white/10"
          [matMenuTriggerFor]="profileMenu"
          matRipple>
          <span class="material-symbols-outlined"> account_circle </span>
          <div
            class="max-w-[128px] truncate text-left text-sm md:max-w-none md:text-clip">
            {{ username }}
          </div>
          <span class="material-symbols-outlined"> expand_more </span>
        </button>
        <mat-menu #profileMenu="matMenu">
          <button
            mat-menu-item
            class="w-40"
            (click)="logout()">
            Odjavi se
          </button>
        </mat-menu>
        <mat-menu #accessibilityMenu="matMenu">
          <form
            class="px-4"
            (click)="$event.stopPropagation()"
            [formGroup]="form">
            <div
              class="flex h-12 items-center justify-between border-b border-black/10">
              <div class="w-40 text-black">Veći font</div>
              <mat-slide-toggle formControlName="largeFont" />
            </div>
            <div
              class="flex h-12 items-center justify-between border-b border-black/10">
              <div class="w-40 text-black">Disleksija</div>
              <mat-slide-toggle formControlName="dyslexia" />
            </div>
            <div class="flex h-12 items-center justify-between">
              <div class="w-40 text-black">Kontrast</div>
              <mat-slide-toggle formControlName="dark" />
            </div>
          </form>
        </mat-menu>
      </div>
    </div>
  `,
  styles: [
    `
      .btn-header {
        @apply flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 p-2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  cookieService = inject(CookieService);
  router = inject(Router);
  fb = inject(FormBuilder);

  username: string = 'Ime Prezime';
  form: FormGroup = this.fb.group({
    dyslexia: [false],
    largeFont: [false],
    dark: [false],
  });

  ngOnInit(): void {
    if (this.cookieService.check('dark')) {
      this.themeChange('dark');
    }

    if (this.cookieService.check('largeFont')) {
      this.form.patchValue({ largeFont: true });
    } else if (this.cookieService.check('dark')) {
      this.form.patchValue({ dark: true });
    } else if (this.cookieService.check('dyslexia')) {
      this.form.patchValue({ dyslexia: true });
    }

    this.form.valueChanges.pipe(startWith('')).subscribe(() => {
      if (this.form.value.largeFont) {
        this.cookieService.set('largeFont', 'true');
        this.fontChange('large');
      } else if (!this.form.value.largeFont) {
        this.cookieService.delete('largeFont');
        this.fontChange('default');
      }

      if (this.form.value.dark) {
        this.cookieService.set('dark', 'true');
        this.themeChange('dark');
      } else if (!this.form.value.dark) {
        this.cookieService.delete('dark');
        this.themeChange('light');
      }

      if (this.form.value.dyslexia) {
        this.cookieService.set('dyslexia', 'true');
        this.applyDyslexia(true);
      } else if (!this.form.value.dyslexia) {
        this.cookieService.delete('dyslexia');
        this.applyDyslexia(false);
      }
    });
  }

  themeChange(theme: 'light' | 'dark') {
    switch (theme) {
      case 'dark':
        document.body.classList.add('dark');
        break;
      default:
        document.body.classList.remove('dark');
        break;
    }
  }

  applyDyslexia(dyslexia: boolean) {
    if (dyslexia) {
      document.getElementsByTagName('html')[0]?.classList.add('dyslexia');
    } else {
      document.getElementsByTagName('html')[0]?.classList.remove('dyslexia');
    }
  }

  fontChange(size: 'small' | 'default' | 'large') {
    switch (size) {
      case 'small':
        document.getElementsByTagName('html')[0]?.classList.remove('large');
        document.getElementsByTagName('html')[0]?.classList.add('small');
        break;
      case 'large':
        document.getElementsByTagName('html')[0]?.classList.add('large');
        document.getElementsByTagName('html')[0]?.classList.remove('small');
        break;
      default:
        document.getElementsByTagName('html')[0]?.classList.remove('large');
        document.getElementsByTagName('html')[0]?.classList.remove('small');
        break;
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}
