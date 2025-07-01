import { NgClass } from '@angular/common';
import { Component, EventEmitter, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../models/menu-item.interface';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  template: `
    @for (item of items(); track item; let i = $index) {
      <div
        class="items-cent mb-1 flex w-full cursor-pointer rounded p-2 text-sm duration-100 hover:bg-primary/5 lg:min-w-[268px]"
        [ngClass]="{ 'bg-primary/10 font-medium text-primary': item.active }"
        [routerLinkActive]="['bg-primary/10', 'text-primary', 'font-medium']"
        [routerLink]="useRouter() ? item.id : null"
        (click)="onSelectItem(i)"
        matRipple>
        {{ item.title }}
      </div>
    }
  `,
  styles: [``],
  imports: [RouterLink, NgClass, RouterLinkActive, MatRippleModule],
})
export class MenuItemsComponent {
  items = input<MenuItem[]>([]);
  useRouter = input<boolean>(false);
  specialRight = input<boolean>(false);
  selected = new EventEmitter<MenuItem>();

  onSelectItem(index: number) {
    if (!this.useRouter) {
      this.items().forEach((item) => (item.active = false));
      this.items[index].active = true;
    }
    this.selected.emit(this.items[index]);
  }
}
