import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-data-chart',
  standalone: true,
  template: `
    <div class="h-[400px] w-full rounded-2xl bg-white p-4 shadow">
      <h2 class="mb-4 text-lg font-semibold">Grafički prikaz</h2>
      <canvas
        id="dataChart"
        class="h-full w-full"></canvas>
    </div>
  `,
  styles: [],
})
export class DataChartComponent implements OnInit {
  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataService.getHourlyAverages().subscribe((data) => {
      const ctx = document.getElementById('dataChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((d) => d.hour.slice(11, 16)), // prikaz samo HH:mm
          datasets: [
            {
              label: 'Prosjek po satu',
              data: data.map((d) => d.average),
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    });
  }
}
