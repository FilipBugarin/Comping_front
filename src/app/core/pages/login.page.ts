import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div
      class="flex h-screen flex-col justify-center overflow-y-auto md:items-center md:bg-black/[0.05]">
      <div
        class="w-full rounded-md border-black/10 bg-white md:max-w-sm md:border">
        <div
          class="flex items-center rounded-t border-b border-black/10 bg-black/[0.05] px-6 py-4 font-medium text-black">
          <span class="material-symbols-outlined mr-2"> login </span>
          Login
        </div>
        <form
          class="p-6"
          [formGroup]="form"
          (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>Korisničko ime</mat-label>
            <input
              matInput
              formControlName="username" />
            <mat-error> Korisničko ime je <strong>obavezno</strong> </mat-error>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Lozinka</mat-label>
            <input
              matInput
              type="password"
              formControlName="password" />
            <mat-error> Lozinka je <strong>obavezna</strong> </mat-error>
          </mat-form-field>
          <button
            class="btn w-full bg-primary text-white"
            type="submit"
            matRipple>
            Potvrdi
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [``],
  imports: [
    MatRippleModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRippleModule,
  ],
})
export class LoginPage {
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.router.navigateByUrl('/');
  }
}
