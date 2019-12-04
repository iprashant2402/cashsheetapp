import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DbServiceService } from '../db-service.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-sheet-details-view',
  templateUrl: './sheet-details-view.component.html',
  styleUrls: ['./sheet-details-view.component.css']
})
export class SheetDetailsViewComponent implements OnInit {
  cid;
  sheet;
  transactions;
  addTranForm;
  closeSheetForm;
  constructor(private activeRoute: ActivatedRoute, private auth: AuthenticationService, private db: DbServiceService, private fb: FormBuilder ) { 
    this.addTranForm = this.fb.group({
      description : '',
      amount : 0,
      type: '',
      mode: true
    });
    this.closeSheetForm = this.fb.group({
      fifty : 0,
      hundred: 0,
      fiveHundred: 0,
      twoThousand: 0
    });
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.cid = params.get('cid');
      this.refreshSheet();
    });
  }

  refreshSheet(){
    this.db.getSheetDetails(this.cid).subscribe(data => {
      this.sheet = data.sheet[0];
      console.log(this.sheet);
    },err => console.log(err));
    this.db.getTransactions(this.cid).subscribe(data => {
      this.transactions = data.transactions;
      console.log(this.transactions);
    },err=>{console.log(err)});
  }

  deleteTransaction(refNo){
    this.db.deleteTransaction(refNo).subscribe(data => {
      if(data){
        if(data.deletedCount){
          alert("Transaction successfully deleted.");
          this.refreshSheet();
        }
      }
    });
  }

  verifyTransaction(refNo){
    this.db.verifyTransaction(refNo).subscribe(data => {
      if(data){
        if(data.id){
          alert("Transaction with reference no. "+data.id+" is verified.");
          this.refreshSheet();
        }
      }
    });
  }

  addTransaction(transaction){
    transaction.cid = this.cid;
    this.db.addTransaction(transaction).subscribe(data => {
      if(data){
        alert("Transaction added successfully");
        this.refreshSheet();
      }
    });
  }

  closeSheet(info){
    info.cid = this.cid;
    this.db.closeSheet(info).subscribe((data)=>{
      if(data){
        alert(data.message);
        this.sheet = data.sheet;
      }
    });
  }

  parseDate(date){
    
    date = date.toString().split('');
    var digits = date.map(Number);
    var year = digits[0]*1000 + digits[1]*100 + digits[2]*10 + digits[3];
    var month = digits[4]*10 + digits[5];
    var day = digits[6]*10 + digits[7];

    return(day+"-"+month+"-"+year);
    
  }

}
