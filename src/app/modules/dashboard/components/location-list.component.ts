import { Component } from '@angular/core';
import { MapService } from '../../../core/services/map.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-list',
  standalone: true,
  template: `
    <div class="h-full max-h-[600px] rounded-2xl bg-white p-4 shadow">
      <h2 class="mb-4 text-lg font-semibold">Popis lokacija</h2>
      <ul class="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        <li
          *ngFor="let location of locations"
          class="hover:bg-gray-100 cursor-pointer rounded-md border p-2 transition"
          (click)="selectLocation(location)">
          <div class="font-medium">{{ location.name }}</div>
          <div class="text-gray-500 text-sm">
            {{ location.lat }}, {{ location.lng }}
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [],
  imports: [CommonModule],
})
export class LocationListComponent {
  locations = [
    { name: 'Heinzelova 70', lat: 45.805, lng: 16.008 },
    { name: 'Trg bana Jelačića', lat: 45.8131, lng: 15.9776 },
    { name: 'Jarun', lat: 45.783, lng: 15.922 },
    { name: 'Maksimir', lat: 45.829, lng: 16.016 },
    { name: 'Dubrava', lat: 45.838, lng: 16.042 },
    { name: 'Siget', lat: 45.774, lng: 15.963 },
    { name: 'Remetinec', lat: 45.759, lng: 15.946 },
    { name: 'Vrapče', lat: 45.816, lng: 15.895 },
    { name: 'Susedgrad', lat: 45.816, lng: 15.878 },
    { name: 'Sesvete', lat: 45.831, lng: 16.112 },
  ];

  constructor(private mapService: MapService) {}

  selectLocation(location: { lat: number; lng: number; name: string }) {
    this.mapService.updateMarker(location.lat, location.lng, location.name);
  }
}
