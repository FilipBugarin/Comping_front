import { Route } from '@angular/router';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { PokemonPage } from './pokemon.page';
import { PokemonWrapperPage } from './pages/pokemon-wrapper.page';

export const POKEMON_ROUTES: Route[] = [
  {
    path: '',
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'pokemon' }],
    component: PokemonPage,
    children: [
      {
        path: '',
        component: PokemonWrapperPage,
      },
    ],
  },
];
