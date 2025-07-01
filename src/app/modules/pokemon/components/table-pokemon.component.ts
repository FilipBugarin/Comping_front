import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../../core/services/pokemon.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PokemonDetailModalComponent } from './modal-pokemon-detail.component';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  template: `
    <div class="p-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          *ngFor="let p of pokemons"
          (click)="openDetails(p)"
          class="cursor-pointer rounded-xl border shadow p-4 hover:shadow-md transition text-center"
        >
          <img [src]="p.image" class="w-20 h-20 mx-auto mb-2" />
          <div class="font-semibold">{{ p.name | titlecase }}</div>
          <div class="text-sm text-gray-500">{{ p.types }}</div>
        </div>
      </div>

      <mat-paginator
        class="mt-6"
        [length]="100"
        [pageSize]="10"
        [pageSizeOptions]="[10]"
        (page)="onPageChange($event)"
      ></mat-paginator>
    </div>
  `,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
})
export class PokemonTableComponent implements OnInit {
  pokemons: any[] = [];
  offset = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: PokemonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getPokemonList(this.offset, 10).subscribe((res) => {
      this.pokemons = res;
    });
  }

  onPageChange(event: PageEvent) {
    this.offset = event.pageIndex * event.pageSize;
    this.load();
  }

  openDetails(pokemon: any) {
    this.dialog.open(PokemonDetailModalComponent, {
      data: pokemon,
    });
  }
}
