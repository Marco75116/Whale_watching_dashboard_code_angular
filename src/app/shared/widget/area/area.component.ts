import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {HttpClient,HttpHeaders} from '@angular/common/http'

export interface AreaTypeData{
    timestamp : string,
    valueModified :number,
  }
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})


export class AreaComponent implements OnInit {

  chartOptions: {}={};
  @Input() data: any = [];

  Highcharts = Highcharts;
  timestampTab : string[]= [];
  benefTab  : number[]= [];
  constructor(private httpclient: HttpClient) { }

  private urlArea = "http://localhost:8000/historicalTx"
  ngOnInit() {

    this.httpclient.get<AreaTypeData[]>(this.urlArea).subscribe(data => {
        data.forEach(tx => {
            this.timestampTab.push(tx.timestamp);
            this.benefTab.push(tx.valueModified);
        });
        console.log(this.timestampTab);
        console.log(this.benefTab);
        this.Area()
      })


    this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Historic value of matic tokens in the Wallet'
        },
        subtitle: {
            text: 'Source: Mon taff'
        },
        xAxis: {
            categories: [],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Asia',
            data: []
        },]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  Area(){
    this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Historic value of matic tokens in the Wallet'
        },
        subtitle: {
            text: 'Source: Mon taff'
        },
        xAxis: {
            categories: this.timestampTab,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' dollars'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: '0xeC504bfcC11021045598bb24C9DAd5818033bbD4',
            data: this.benefTab
        },]
    };

    HC_exporting(Highcharts);
  }

}