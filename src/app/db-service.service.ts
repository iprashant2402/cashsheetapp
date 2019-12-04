import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http: HttpClient, private router: Router,private auth: AuthenticationService) { }

  public getSheets(): Observable<any>{
    return this.http.get('http://cashsheet.herokuapp.com/retrieve/sheets');
  }

  public createSheet(date,bal) : Observable<any>{
    return this.http.post('http://cashsheet.herokuapp.com/createSheet',{date: date,opening:bal});
  }

  public getSheetDetails(cid): Observable<any>{
    return this.http.get(`http://cashsheet.herokuapp.com/retrieve/sheet?cid=${cid}`);
  }

  public getTransactions(cid): Observable<any>{
    return this.http.get(`http://cashsheet.herokuapp.com/retrieve/transactions?cid=${cid}`);
  }

  public verifyTransaction(refNo): Observable<any>{
    return this.http.get(`http://cashsheet.herokuapp.com/verifyTransaction?refNo=${refNo}`);
  }

  public deleteTransaction(refNo): Observable<any>{
    return this.http.get(`http://cashsheet.herokuapp.com/deleteTransaction?refNo=${refNo}`);
  }

  public addTransaction(transaction): Observable<any>{
    return this.http.post(`http://cashsheet.herokuapp.com/addTransaction`,transaction);
  }

  public closeSheet(data): Observable<any>{
    return this.http.post(`http://cashsheet.herokuapp.com/closeSheet`,data);
  }

}
