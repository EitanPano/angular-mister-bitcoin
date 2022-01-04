import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private STORAGE_KEY = 'user';
  private SESSION_KEY = 'loggedInUser';

  private _loggedInUser$ = new BehaviorSubject<User>(null)
  public loggedInUser$ = this._loggedInUser$.asObservable()

  constructor(private userService: UserService, private router: Router) {}

  public getLoggedInUser() {
    const loggedInUser = JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
    this._loggedInUser$.next(loggedInUser)
    return of({...this.loggedInUser$})
  }

  async signup(userCred) {
    try {
      // const user = await httpService.post(`${AUTH_URL}signup`, userCred);
      const user = await this.userService.save(userCred);
      this.router.navigateByUrl('');
      this._loggedInUser$.next(user)
      return this._saveLocalUser(user);
    } catch (e) {
      throw e;
    }
  }

  async login(userCred) {
    try {
      // const user = await httpService.post(`${AUTH_URL}login`, userCred);
      // if (user) return _saveLocalUser(user);
    } catch (e) {
      throw (e);
    }
  }

  async logout() {
    try {
      // const user = await httpService.post(`${AUTH_URL}logout`, userCred);
      this._loggedInUser$.next(null)
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (e) {
      throw e;
    }
  }

  private _saveLocalUser(user) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return user;
  }
}
