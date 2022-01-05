import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => this.loggedInUser = user);
  }
}
