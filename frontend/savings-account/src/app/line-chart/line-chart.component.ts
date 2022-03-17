import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() chartTitle: string = "";

  @Input() chartData: ChartData = { labels: [], datasets: [] };

  chartOptions: ChartOptions = {
    plugins: {
      title: {
        display: true,
        position: 'top',
        text: this.chartTitle,
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: context => {
            return context.label + ": " + context.formattedValue + "€";
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      x: {
        display: true,
        type: "time",
        adapters: {
          date: {
            local: enGB,
          },
        },
        time: {
          displayFormats: {
            quarter: 'MMM YYYY',
          },
          tooltipFormat: 'yyyy-MM-dd',
        },
      },
      y: {
        display: true,
        stacked: true,
      },
    },
    responsive: true,
  };

  chartType: ChartType = "line";

  public chartClicked(e: any): void { console.log(e); }

  public chartHovered(e: any): void { console.log(e); }

  constructor() { }

  ngOnInit(): void { }

}
