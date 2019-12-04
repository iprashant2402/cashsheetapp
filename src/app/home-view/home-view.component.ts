import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DbServiceService } from '../db-service.service';
import { FormBuilder, Form } from '@angular/forms';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  sheets;
  newSheetForm;
  displayedColumns = ["date","active","opening","closing","summation","difference","deposited","verified"];


  constructor(private auth: AuthenticationService, private db: DbServiceService, private fb: FormBuilder) { 
    this.newSheetForm = this.fb.group({
      date : '',
      openingBal : 0
    });
  }

  ngOnInit() {
    this.refreshView();
  }

  refreshView(){
    this.db.getSheets().subscribe((data)=>{
      if(data.error){
        console.log(data.message);
      }
      if(data.sheets){
        this.sheets = data.sheets;
        this.sheets.forEach(element => {
          element.date = this.parseDate(element.date);
        });
      }
    });
  }

  logout(){
    this.auth.logout();
  }

  parseDate(date){
    
    date = date.toString().split('');
    var digits = date.map(Number);
    var year = digits[0]*1000 + digits[1]*100 + digits[2]*10 + digits[3];
    var month = digits[4]*10 + digits[5];
    var day = digits[6]*10 + digits[7];

    return(day+"-"+month+"-"+year);
    
  }

  onSubmit(dateInfo){
    if(dateInfo.date!==''){
    var sheetDate = new Date();
    var date = dateInfo.date.split('-');
    var year = Number(date[0]);
    var month = Number(date[1]);
    var day = Number(date[2]);
    sheetDate.setDate(day);
    sheetDate.setMonth(month-1);
    sheetDate.setFullYear(year);
    console.log(sheetDate);
    this.db.createSheet(sheetDate,dateInfo.openingBal).subscribe((data)=>{
      if(data.message){
        alert(data.message);
        this.refreshView();
      }
    },err => console.log(err));
  }
  }

}
