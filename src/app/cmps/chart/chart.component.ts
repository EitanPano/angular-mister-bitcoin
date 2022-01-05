import { Component, Input, OnInit } from '@angular/core';
import { GoogleChart } from 'src/app/models/google-chart';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  marketChart = new GoogleChart();
  transactionsChart = new GoogleChart();
  @Input() marketData: any = [];
  @Input() marketTableTitle: string;
  @Input() transactionsData: any = [];
  @Input() transactionsTableTitle: string;

  constructor() { }

  ngOnInit(): void {
    this.marketChart.data = this.marketData;
    this.marketChart.title = this.marketTableTitle;
    this.transactionsChart.data = this.transactionsData;
    this.transactionsChart.title = this.transactionsTableTitle;
  }

  ngOnChanges(): void {
    this.marketChart.data = this.marketData;
    this.marketChart.title = this.marketTableTitle;
    this.transactionsChart.data = this.transactionsData;
    this.transactionsChart.title = this.transactionsTableTitle;
  }

}
