import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { storageService } from './async-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private STORAGE_KEY = 'user';
  private SESSION_KEY = 'loggedInUser';

  constructor(private userService: UserService) {}

  getLoggedInUser() {
    const loggedInUser = JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
    return loggedInUser;
  }

  async signup(userCred) {
    // const user = await httpService.post(`${AUTH_URL}signup`, userCred);
    
    const user = await this.userService.save(userCred);
    console.log('user here', user);
    // console.log(user);
    return this._saveLocalUser(user);
  }

  async login(userCred) {
    // try {
    // const user = await httpService.post(`${AUTH_URL}login`, userCred);
    // if (user) return _saveLocalUser(user);
    // } catch (err) {
    // console.log(err);
    // }
    // }
  }

  private _saveLocalUser(user) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return user;
  }
}
