import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {

  @Input() appTitle?: string;
  @Input() loggedInUser: User;
  @Output() onLogout = new EventEmitter()

  constructor() {}
}
