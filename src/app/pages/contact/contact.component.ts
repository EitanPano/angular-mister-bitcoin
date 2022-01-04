import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { FilterBy } from 'src/app/models/filter-by.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  filterBy: FilterBy = { term: '' }


  @Output() navigate = new EventEmitter<string>()

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.loadContacts();
    this.contacts$ = this.contactService.contacts$;
  }

  onSetFilter(filterBy): void {
    this.filterBy = filterBy
    this.contactService.loadContacts(this.filterBy);
  }

  onRemove(contactId) {
    console.log(contactId);
    this.contactService.remove(contactId)
    this.filterBy.term = ''
  }
}
