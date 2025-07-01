import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MobileMenuComponent } from '../../core/components/mobile-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <ng-container *transloco="let t; read: 'dashboard'">
      <div class="h-full lg:flex">
        <app-mobile-menu [title]="t('title')" />
        <div class="relative w-full overflow-auto text-black">
          <router-outlet />
        </div>
      </div>
    </ng-container>
  `,
  styles: [``],
  imports: [TranslocoModule, MobileMenuComponent, RouterOutlet],
})
export class DashboardPage {}
