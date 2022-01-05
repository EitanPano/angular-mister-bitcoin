import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {

  contact: Contact;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact
    })
  }

  async onSave() {
    await this.contactService.save(this.contact)
    this.router.navigateByUrl('contact')
  }
}
