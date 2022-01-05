import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: User;
  rate: number;

  constructor(private userService: UserService, private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => this.loggedInUser = user);
    this.bitcoinService.getBitCoinRate().subscribe((rate) => this.rate = +(1 / rate).toFixed(2));
  }

}
