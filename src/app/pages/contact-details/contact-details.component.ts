import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  subscription: Subscription
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe(data=>{
      this.contact = data.contact
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEdit() {
    this.router.navigateByUrl('edit' + this.contact._id)
  }

  onBack() {
    this.router.navigateByUrl('contact')
  }
}
