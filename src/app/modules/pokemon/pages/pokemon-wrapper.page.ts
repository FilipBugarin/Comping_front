import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { PokemonTableComponent } from '../components/table-pokemon.component';

@Component({
  selector: 'app-pokemon-wrapper',
  standalone: true,
  template: `
    <ng-container *transloco="let t; read: 'pokemon'">
      <div class="p-4">
        <h2 class="mb-4 text-xl font-semibold">{{ t('title') }}</h2>
        <app-pokemon-table></app-pokemon-table>
      </div>
    </ng-container>
  `,
  imports: [TranslocoModule, PokemonTableComponent],
})
export class PokemonWrapperPage {}
