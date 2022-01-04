import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterBy } from 'src/app/models/filter-by.model';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterBy: FilterBy
  @Output() onSetFilter = new EventEmitter<FilterBy>()

  constructor() { }

  ngOnInit(): void {
  }
}
