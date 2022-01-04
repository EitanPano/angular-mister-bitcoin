import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => this.loggedInUser = user);
  }
}
