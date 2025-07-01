import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private api = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 10): Observable<any[]> {
    return this.http
      .get<any>(`${this.api}?offset=${offset}&limit=${limit}`)
      .pipe(
        switchMap((res: { results: { url: string }[] }) => {
          const requests = res.results.map((p) => this.http.get<any>(p.url));
          return forkJoin<any[]>(requests);
        }),
        map((details: any[]) =>
          details.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.sprites.front_default,
            types: pokemon.types.map((t: any) => t.type.name).join(', '),
          }))
        )
      );
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }
}
