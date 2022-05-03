import { Component, OnInit,Input  } from '@angular/core';
import HC_exporting from 'highcharts/modules/exporting';
import * as Highcharts from 'highcharts';

import {HttpClient,HttpHeaders} from '@angular/common/http'

export interface pieChartTypeData{
    name : string,
    y :number,
  }

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {


  Highcharts = Highcharts;
  chartOptions = {};
  proportionToken : pieChartTypeData[]=[];
  @Input() data = {};

  constructor(private httpclient: HttpClient) { }

  private urlTokenProportion = "http://localhost:8000/bigchart"
  
  ngOnInit(): void {

    this.httpclient.get<pieChartTypeData[]>(this.urlTokenProportion).subscribe(data => {
        this.proportionToken = data;
        this.piechart()
        
      })


    this.chartOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Proportion of tokens value in the wallet'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
      series: [{
          data:[]
      }]
  }
  }

  piechart(){
    this.chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Proportion of tokens value in the wallet'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            data:this.proportionToken
        }]
    }
    HC_exporting(Highcharts);
  }

}
