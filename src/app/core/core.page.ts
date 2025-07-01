import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-core',
  standalone: true,
  template: `
    <div class="h-full bg-white">
      <app-header />
      <div class="flex lg:h-[calc(100vh-56px)]">
        <app-sidebar
          class="lg:block"
          [hidden]="!showSidebar" />
        <div class="h-full w-full overflow-y-auto">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  imports: [RouterModule, SidebarComponent, HeaderComponent],
})
export class CorePage {
  showSidebar = true;

  //adjusts left of bottom button container according to left menu width
  adjustPosition(containerId: string) {
    if (document.getElementsByTagName('html')[0]?.classList.contains('large')) {
      if (document.getElementById(containerId) != undefined) {
        (document.getElementById(containerId) as HTMLDivElement).style.left =
          '112px';
      }
    } else {
      if (document.getElementById(containerId) != undefined) {
        (document.getElementById(containerId) as HTMLDivElement).style.left =
          '89px';
      }
    }
  }
}
