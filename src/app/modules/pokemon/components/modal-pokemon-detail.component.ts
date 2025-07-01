import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail-modal',
  template: `
    <div class="p-4 text-center">
      <h2 class="text-xl font-bold mb-4">{{ data.name | titlecase }}</h2>
      <img [src]="data.image" class="w-32 h-32 mx-auto mb-4" />
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Visina:</strong> {{ data.height }}</p>
      <p><strong>Težina:</strong> {{ data.weight }}</p>
      <p><strong>Tip:</strong> {{ data.types }}</p>
    </div>
  `,
  imports: [CommonModule, MatDialogModule],
})
export class PokemonDetailModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
