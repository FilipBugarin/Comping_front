import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalHelpComponent } from './modal-help.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [MatRippleModule, MatTooltipModule, NgClass],
  template: `
    <div class="head">
      <div
        class="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div class="flex w-auto flex-col truncate">
          <ng-content select="[breadcrumbs]"></ng-content>
          <h1
            class="flex flex-row items-center gap-2 whitespace-normal"
            [ngClass]="[
              size() === 'small' ? 'text-xl' : 'text-xl md:text-4xl'
            ]">
            @if (help()) {
              <button
                matTooltip="Upute"
                class="btn-sm p-0"
                [ngClass]="[size() === 'small' ? 'text-xs' : 'text-sm']"
                type="button"
                (click)="onHelp()">
                <span class="material-symbols-outlined"> info </span>
              </button>
            }
            {{ title() }}
          </h1>
        </div>
        <ng-content select="[actions]"> </ng-content>
      </div>
      @if (hasTabs()) {
        <div class="h-12"></div>
      }
    </div>
  `,
  styles: [
    `
      .head {
        @apply flex flex-col overflow-hidden border-b border-black/10 bg-gradient-to-b from-white to-black/[0.05] px-4 py-6 text-black md:p-8;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadComponent {
  title = input<string>();
  help = input<string>();
  size = input<'small'>();
  hasTabs = input<boolean>();

  dialog = inject(MatDialog);

  onHelp() {
    this.dialog.open(ModalHelpComponent, { data: this.help });
  }
}
