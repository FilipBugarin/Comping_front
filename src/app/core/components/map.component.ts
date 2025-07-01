import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../services/map.service';
@Component({
  standalone: true,
  selector: 'app-map-component',
  template: `
    <div class="map-container">
      <div id="map"></div>
    </div>
  `,
  styles: [
    `
      .map-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 500px;
      }

      #map {
        height: 100%;
      }
    `,
  ],
})
export class MapComponent implements AfterViewInit {
  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initMap('map');
  }
}
