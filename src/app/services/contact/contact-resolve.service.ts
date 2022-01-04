import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';


import { Contact } from '../../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolveService implements Resolve<Promise<Contact>> {

  constructor(private contactService: ContactService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id || null;

    try {
      if (id) return await lastValueFrom(this.contactService.getById(id))
      return  this.contactService.getEmptyContact()
    } 
    catch(e) {
      throw (e);
    }
  }
}
