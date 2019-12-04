import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    userType: false
  };

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {

    this.registerForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      userType: false
    });

   }

  ngOnInit() {
  }

  onSubmit(userInfo){

    this.credentials = userInfo;
    this.auth.register(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/home');
      console.log("LOGGED IN");
    },err => {
      console.log(err);
    });

  }

}
