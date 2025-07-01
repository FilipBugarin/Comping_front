import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../models/menu-item.interface';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div
      class="sidebar scrollbar-thin scrollbar-thumb-black/5 hover:scrollbar-thumb-primary/10"
      *transloco="let t; read: 'sidebar'">
      @for (item of menuItems; track item) {
        <div
          class="mb-1 flex w-20 cursor-pointer flex-col items-center rounded px-1 py-2 text-center text-xs duration-100 hover:bg-primary/5"
          [routerLinkActive]="['bg-primary/10', 'text-primary', 'font-medium']"
          [routerLink]="item.id"
          matRipple>
          <span class="material-symbols-outlined mb-1">
            {{ item.icon }}
          </span>
          {{ t(item.id) }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .sidebar {
        @apply h-full overflow-x-hidden overflow-y-hidden border-r border-black/10 bg-black/[0.05] p-1 text-black hover:overflow-y-auto;
      }
    `,
  ],
  imports: [RouterLink, RouterLinkActive, MatRippleModule, TranslocoModule],
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      icon: 'dashboard',
    },
    {
      id: 'pokemon',
      icon: 'stadium',
    },
  ];
}
