import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataPoint } from '../models/data-point.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getHourlyAverages(): Observable<{ hour: string; average: number }[]> {
    return this.http
      .get<Record<string, DataPoint[]>>('assets/podaci.json')
      .pipe(
        map((rawData) => {
          const result: { hour: string; average: number }[] = [];

          for (const hour in rawData) {
            const values = rawData[hour].map((d) => d.value);
            const avg =
              values.reduce((sum, val) => sum + val, 0) / values.length;

            result.push({ hour, average: parseFloat(avg.toFixed(2)) });
          }

          return result.sort((a, b) => a.hour.localeCompare(b.hour));
        })
      );
  }
}
