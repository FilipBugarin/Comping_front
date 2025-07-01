import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { CorePage } from '../core.page';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [],
  template: `
    <div
      class="text-dark flex h-10 cursor-pointer items-center justify-between border-b border-black/10 px-4 lg:hidden"
      (click)="
        showSubMenu = !showSubMenu;
        toggle.emit(showSubMenu);
        $event.stopPropagation()
      ">
      <div class="flex">
        <span
          class="material-symbols-outlined mr-2"
          (click)="
            corePage.showSidebar = !corePage.showSidebar;
            $event.stopPropagation()
          ">
          menu
        </span>
        {{ title() }}
      </div>
      @if (subMenu()) {
        <span class="material-symbols-outlined">
          {{ !showSubMenu ? 'expand_more' : 'expand_less' }}
        </span>
      }
    </div>
  `,
  styles: [``],
})
export class MobileMenuComponent implements OnInit {
  title = input<string>();
  subMenu = input<boolean>(false);
  @Output() toggle = new EventEmitter<boolean>(false);

  corePage = inject(CorePage);
  router = inject(Router);

  showSubMenu = false;

  ngOnInit(): void {
    this.checkShow(window.innerWidth);
    this.router.events.subscribe(() => {
      this.checkShow(window.innerWidth);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const w = event.target as Window;
    this.checkShow(w.innerWidth);
  }

  checkShow(width: number) {
    if (width > 1024) {
      this.corePage.showSidebar = true;
      this.toggle.emit(true);
    } else {
      this.corePage.showSidebar = false;
      this.toggle.emit(false);
      this.showSubMenu = false;
    }
  }
}
