import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, private router: Router) { 

    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });

  }

  ngOnInit() {
  }

  onSubmit(userInfo){

    this.credentials = userInfo;
    this.auth.login(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/home');
      console.log("LOGGED IN");
    },err => {
      console.log(err);
    });

  }

}
