import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MapWidgetComponent } from '../components/map-widget.component';
import { LocationListComponent } from '../components/location-list.component';
import { DataTableComponent } from '../components/data-table.component';
import { DataChartComponent } from '../components/data-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  template: `
    <ng-container *transloco="let t; read: 'dashboard'">
      <div class="grid h-[600px] grid-cols-5 gap-4 p-4">
        <div class="col-span-1">
          <app-location-list></app-location-list>
        </div>
        <div class="col-span-4">
          <app-map-widget></app-map-widget>
        </div>
      </div>
      <div class="mx-4 my-10">
        <div class="flex gap-4 border-b">
          <button
            (click)="activeTab = 'table'"
            class="pb-2"
            [class.font-bold]="activeTab === 'table'">
            Tablični prikaz
          </button>
          <button
            (click)="activeTab = 'chart'"
            class="pb-2"
            [class.font-bold]="activeTab === 'chart'">
            Grafički prikaz
          </button>
        </div>

        <ng-container *ngIf="activeTab === 'table'">
          <app-data-table />
        </ng-container>
        <ng-container *ngIf="activeTab === 'chart'">
          <app-data-chart />
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [``],
  imports: [
    TranslocoModule,
    MatPaginatorModule,
    MapWidgetComponent,
    LocationListComponent,
    DataTableComponent,
    DataChartComponent,
    CommonModule,
  ],
})
export class DashboardWrapperPage {
  activeTab: 'table' | 'chart' = 'table';
}
