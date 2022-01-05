import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../../models/user.model';
import { AsyncStorageService } from '../async-storage/async-storage.service';
import { Move } from 'src/app/models/move.model';
import { UtilsService } from '../utils/utils.service';

const USERS = [
  {
    name: 'Admin',
    coins: 100,
    moves: [],
    isAdmin: true,
  },
  {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
  {
    name: 'Rachel Lowe',
    coins: 100,
    moves: [],
  },
  {
    name: 'Dominique Soto',
    coins: 100,
    moves: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private STORAGE_KEY = 'users';
  private SESSION_KEY = 'loggedInUser';
  //mock the server
  private _usersDB: User[] = USERS;

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _loggedInUser$ = new BehaviorSubject<User>(null);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: AsyncStorageService,
    private utilsService: UtilsService
  ) {}

  public getLoggedInUser() {
    const loggedInUser =
      JSON.parse(sessionStorage.getItem(this.SESSION_KEY)) || null;
    this._loggedInUser$.next(loggedInUser);
    return of({ ...this.loggedInUser$ });
  }

  public loadUsers(filterBy = null) {
    let users: User[] = this._usersDB;
    if (filterBy && filterBy.term) {
      users = this._filter(users, filterBy.term);
    }
    this._users$.next(this._sort(users));
  }

  public getById(id: string): Observable<User> {
    //mock the server work
    const user = this._usersDB.find((user) => user._id === id);

    //return an observable
    return user
      ? of(user)
      : // : of(this.getEmptyUser())
        Observable.caller(`User id ${id} not found!`);
  }

  public async transferFund(contact, amount) {
    const user = this._loggedInUser$.value;
    if (user.coins - amount < 0) return null;

    user.coins -= amount;
    console.log(amount);
    
    const newMove = new Move(contact._id, contact.name, Date.now(), amount)
    user.moves.unshift( newMove )
    const updatedUser = await this.storageService.put(this.STORAGE_KEY, user);

    this.utilsService.sessionStore(this.SESSION_KEY, updatedUser)
    this._loggedInUser$.next(updatedUser);

  }

  public remove(id: string) {
    //mock the server work
    this._usersDB = this._usersDB.filter((user) => user._id !== id);

    // change the observable data in the service - let all the subscribers know
    this._users$.next(this._usersDB);
  }

  public save(user: User) {
    return user._id ? this._update(user) : this._add(user);
  }

  private _update(user: User) {
    //mock the server work
    this._usersDB = this._usersDB.map((c) => (user._id === c._id ? user : c));
    // change the observable data in the service - let all the subscribers know
    this._users$.next(this._sort(this._usersDB));
    return user;
  }

  private async _add(user: User) {
    //mock the server work
    user = await this.storageService.post(this.STORAGE_KEY, user);

    //declare interface newUser
    const newUser = new User(
      user.name,
      (user.coins = 100),
      (user.moves = []),
      user._id
    );

    this._usersDB.push(newUser);
    this._users$.next(this._sort(this._usersDB));
    return newUser;
  }

  private _sort(users: User[]): User[] {
    return users.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  private _filter(users: User[], term: string) {
    term = term.toLocaleLowerCase();
    return users.filter((user) => {
      return user.name.toLocaleLowerCase().includes(term);
    });
  }
}
