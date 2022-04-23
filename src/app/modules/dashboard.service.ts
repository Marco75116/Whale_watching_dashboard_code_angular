import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http'
import { interval,timer } from 'rxjs';

export interface TokenBalance{
  token_address: string,
  name: string,
  symbol: string,
  logo: null,
  thumbnail: null,
  decimals: string,
  balance: string

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  CoinUrl ="http://localhost:8000"
  retour : TokenBalance[] = [];

  constructor(private httpclient: HttpClient
  ) { }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return this.httpclient.get<Array<Number>>(this.CoinUrl);
  }

  pieChart() {
    return [{
      name: 'LinkPool',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Matic Token',
      y: 11.84
    }, {
      name: 'EANTO Token',
      y: 12.05
    }, {
      name: '	MetaMask DAO',
      y: 4.67
    }, {
      name: 'yearn.finance',
      y: 7.42
    },   {
      name: 'Other',
      y: 2.61
    }];
  }
  AllTokensERC20(){
    this.httpclient.get<TokenBalance[]>(this.CoinUrl).subscribe(data => {this.retour = data
    console.log(data)})
    const obs = timer(5000)
    obs.subscribe(d => {console.log(d)
      console.log(this.retour)
    })
    return this.retour;
    

  }
}
  
function data(data: any, arg1: (any: any) => any) {
  throw new Error('Function not implemented.');
}

