import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.Map;
  private marker!: L.Marker;

  initMap(mapId: string, initialLat = 45.805, initialLng = 16.008): void {
    this.map = L.map(mapId).setView([initialLat, initialLng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 3,
    }).addTo(this.map);

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker/marker-icon-2x.png',
      iconUrl: 'assets/marker/marker-icon.png',
      shadowUrl: 'assets/marker/marker-shadow.png',
    });

    this.marker = L.marker([initialLat, initialLng])
      .addTo(this.map)
      .bindPopup('Heinzelova 70')
      .openPopup();
  }

  updateMarker(lat: number, lng: number, label?: string): void {
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
      if (label) {
        this.marker.bindPopup(label).openPopup();
      }
      this.map.setView([lat, lng], 15);
    }
  }

  invalidateSize(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  getMap(): L.Map | undefined {
    return this.map;
  }
}
