import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslocoModule, MatSortModule],
  template: `
    <div class="rounded-2xl bg-white p-4 shadow">
      <h2
        class="mb-4 text-lg font-semibold"
        *transloco="let t; read: 'dashboard'">
        {{ t('table.title') }}
      </h2>
      <div class="max-h-[400px] overflow-x-auto overflow-y-auto">
        <table
          mat-table
          [dataSource]="dataSource"
          class="w-full min-w-[350px] text-sm sm:text-base"
          *transloco="let t; read: 'dashboard'"
          matSort
          (matSortChange)="onSortChange($event)">
          <ng-container matColumnDef="hour">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="whitespace-nowrap px-4 py-2">
              {{ t('table.hour') }}
            </th>
            <td
              mat-cell
              *matCellDef="let row"
              [attr.label-before]="t('table.hour')">
              {{ row.hour | date: 'dd.MM.yyyy HH:mm' }}
            </td>
          </ng-container>
          <ng-container matColumnDef="average">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="whitespace-nowrap px-4 py-2">
              {{ t('table.average') }}
            </th>
            <td
              mat-cell
              *matCellDef="let row"
              [attr.label-before]="t('table.average')">
              {{ row.average }}
            </td>
          </ng-container>
          <tr *matNoDataRow>
            <td
              [attr.colspan]="displayedColumns.length"
              class="py-4 text-center">
              {{ t('table.noData') }}
            </td>
          </tr>
          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns"></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [``],
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['hour', 'average'];
  dataSource = new MatTableDataSource<{ hour: string; average: number }>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getHourlyAverages().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
    });
  }

  onSortChange(_sort: Sort) {}
}
