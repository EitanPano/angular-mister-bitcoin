import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  appTitle = 'Mister-BTC';
  loggedInUser: User;
  subscription: Subscription
  
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
      this.userService.getLoggedInUser()
      this.subscription = this.userService.loggedInUser$.subscribe(user => {
        this.loggedInUser = user
      })
  }

  onLogout() {
    this.authService.logout()
    this.loggedInUser = null
  }
}
