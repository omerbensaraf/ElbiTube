import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../css/bootstrap.mincbed.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  isEmailNameValid(): boolean {
    const isValid: boolean = false;
    if (this.email.length > 0) {
      return true;
    }
  }

  isPasswordValid(): boolean {
    const isValid: boolean = false;
    if (this.password.length > 0) {
      return true;
    }
  }

  onSignIn() {
    this.errorMessage = '';
    let isFormValid: boolean = true;
    if (!this.isEmailNameValid()) {
      this.errorMessage = 'Please enter a valid email';
      isFormValid = false;
    } else if (!this.isPasswordValid()) {
      this.errorMessage = 'Please enter a valid password';
      isFormValid = false;
    }
    if(isFormValid) {
      //Perfrom rest call to login
    }
  }
}
