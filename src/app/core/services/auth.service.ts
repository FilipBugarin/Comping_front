import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<{} | null>(null);

  readonly user$: Observable<{} | null> = this._user.asObservable();

  setUser(user: {}) {
    this._user.next(user);
  }

  getUser(): {} | null {
    return this._user.getValue();
  }
}
