import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from './core/services/loader.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, MatProgressBarModule, AsyncPipe],
  selector: 'app-root',
  template: `
    <div class="relative">
      @if (isLoading$ | async) {
        <mat-progress-bar
          mode="indeterminate"
          class="absolute top-0 z-10" />
      }
      <div class="absolute top-0 w-full">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
}
