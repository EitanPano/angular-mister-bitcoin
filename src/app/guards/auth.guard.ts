import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';

import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    loggedInUser:User;

    constructor(private userService: UserService, private router: Router) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):Promise<boolean> {
            this.userService.loggedInUser$.subscribe(user => this.loggedInUser = user);
            return this.loggedInUser ? true : this.router.navigateByUrl('auth');
        }
  
}
