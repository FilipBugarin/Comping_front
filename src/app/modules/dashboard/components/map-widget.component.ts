import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapComponent } from '../../../core/components/map.component';
import { MapService } from '../../../core/services/map.service';

@Component({
  standalone: true,
  selector: 'app-map-widget',
  template: `
    <div class="h-[600px] rounded-2xl bg-white p-4 shadow">
      <h2 class="mb-2 text-lg font-semibold">Karta lokacije</h2>
      <div class="relative h-[500px] w-full overflow-hidden rounded-xl border">
        <app-map-component></app-map-component>
      </div>
    </div>
  `,
  styles: [
    `
      #map {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  imports: [MapComponent],
})
export class MapWidgetComponent implements OnChanges {
  @Input() selectedLocation: { lat: number; lng: number } | null = null;

  constructor(private mapService: MapService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedLocation'] && this.selectedLocation) {
      this.mapService.updateMarker(
        this.selectedLocation.lat,
        this.selectedLocation.lng
      );
    }
  }
}
