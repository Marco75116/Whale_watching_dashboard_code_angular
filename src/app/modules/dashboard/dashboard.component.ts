import { Component, OnInit,ViewChild,AfterViewInit  } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {MatPaginator} from '@angular/material/paginator'; 

import {MatTableDataSource} from '@angular/material/table';
import {HttpClient,HttpHeaders} from '@angular/common/http'


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface TokenBalance{
  token_address: string,
  name: string,
  symbol: string,
  logo: null,
  thumbnail: null,
  decimals: string,
  balance: string
}
export interface TokenProportion{
  token_address:string,
  symbol:string,
  balance:string,
  priceToken:number,
  valueBalance: number,
  pourcentage:number,
}
export interface pieChartTypeData{
  name : string,
  y :number,
}

 let ELEMENT_DATA: TokenBalance[] = [
 
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements AfterViewInit,OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<TokenBalance>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  bigChart = {};
  cards = {};
  pieChart = {};
  
  retour:number = 5 ;
  balanceToken :  TokenBalance[] =[];
  proportionToken : pieChartTypeData[]=[];
  Ourbool: boolean = false;
  boolPiecharts : boolean = false;


  constructor(private dashboardService: DashboardService,
              private httpclient: HttpClient) { }

  private urlTokenList ="http://localhost:8000/list"
  private urlTokenProportion = "http://localhost:8000/bigchart"

  ngOnInit(): void {
    
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.retour;
    this.pieChart = this.dashboardService.pieChart();

    this.httpclient.get<TokenBalance[]>(this.urlTokenList).subscribe(data => {
      ELEMENT_DATA = data;
      this.dataSource=new MatTableDataSource<TokenBalance>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
    // this.httpclient.get<pieChartTypeData[]>(this.urlTokenProportion).subscribe(data => {
    //   console.log(data);
    //   this.pieChart = data;
      
    //   this.boolPiecharts = true;
    // })
  
  } 

  
}
  