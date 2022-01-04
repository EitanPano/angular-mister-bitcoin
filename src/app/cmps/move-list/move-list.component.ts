import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  @Input() contact:Contact

  constructor() { }

  ngOnInit(): void {
    console.log(this.contact);
    
  }

}
