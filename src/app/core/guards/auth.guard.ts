import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthGuard {
  // TODO: guard has to be completed after we got auth routes

  constructor(
    // public authService: AuthService,
    public router: Router
  ) {}

  canActivate(): boolean | Observable<boolean> {
    return of(true);
  }
}
