import { ChartData, ChartOptions } from 'chart.js';

export class Chart {

    constructor(
      public title: String,
      public type: String,
      public data: ChartData,
      public options: ChartOptions) { }
  
}

export class Data {

  constructor(
    public time: Array<Date> = [],
    public savings: Array<any> = [],
    public pleasure: Array<any> = [],
    public clothes: Array<any> = [],
    public vehicle: Array<any> = [],
    public total: Array<any> = []) { }

}