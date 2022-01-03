import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolverService implements Resolve<Promise<Contact>> {
  constructor(private contactService: ContactService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    try {
      const contact = await this.contactService.getById(id).toPromise();
      return contact
    } catch {
      try {
         const contact = await this.contactService.getEmptyContact();
        return contact;
      } catch (e) {
        throw(e);
      }
    }
    // console.log(contact);

    // if (!contact) return this.contactService.getEmptyContact() as Contact
  }
}
