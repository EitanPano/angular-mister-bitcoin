import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  appTitle = 'Mister-BTC';
  loggedInUser: User;
  subscription: Subscription
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.getLoggedInUser()
      this.subscription = this.authService.loggedInUser$.subscribe(user => {
        this.loggedInUser = user
      })
  }

  onLogout() {
    this.authService.logout()
    this.loggedInUser = null
  }
}
