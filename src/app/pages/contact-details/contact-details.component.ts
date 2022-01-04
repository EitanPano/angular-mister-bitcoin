import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  subscription: Subscription;
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe((data) => {
      this.contact = data.contact;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTransfer(amount: number) {
    console.log(amount);
  }

  onEdit() {
    this.router.navigateByUrl('edit' + this.contact._id);
  }

  onBack() {
    this.router.navigateByUrl('contact');
  }
}
