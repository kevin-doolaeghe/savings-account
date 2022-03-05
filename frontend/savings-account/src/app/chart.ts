import { ChartData, ChartOptions } from 'chart.js';

export class Chart {

    constructor(
      public title: String,
      public type: String,
      public data: ChartData,
      public options: ChartOptions) { }
  
}