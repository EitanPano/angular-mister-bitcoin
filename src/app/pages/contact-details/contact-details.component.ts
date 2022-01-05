import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  subscription: Subscription;
  loggedInUser: User;
  contact: Contact;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => this.contact = data.contact);
    this.userService.loggedInUser$.subscribe(user => this.loggedInUser = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onTransfer(amount) {
    try {
      await this.userService.transferFund(this.contact, amount);
    }
    catch(e) {
      console.log(e);
    }

  }

  onEdit() {
    this.router.navigateByUrl('edit' + this.contact._id);
  }

  onBack() {
    this.router.navigateByUrl('contact');
  }
}
