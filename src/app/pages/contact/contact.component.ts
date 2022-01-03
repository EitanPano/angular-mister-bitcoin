import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contacts$: Observable<Contact[]>;
  subscription: Subscription;

  @Output() navigate = new EventEmitter<string>()

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.loadContacts();
    this.contacts$ = this.contactService.contacts$;
    
    // this.subscription = this.contactService.contacts$.subscribe((contacts) => {
    //   this.contacts = contacts;
    // });
  }

  ngOnDestroy(): void {}

  removeContact(contactId) {
    console.log(contactId);
    this.contactService.remove(contactId)
    
  }
}
