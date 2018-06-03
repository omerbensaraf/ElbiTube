import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../css/bootstrap.mincbed.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isShowModalClass: boolean = true;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  getModalStyles() {
    let myStyles: Object = {};
    if (this.isShowModalClass) {
      myStyles['display'] = 'block';
    } else {
      myStyles['display'] = '';
    }
    return myStyles;
  }

  getModalBGStyle() {
    let myStyles: Object = {};
    if (this.isShowModalClass) {
      myStyles['display'] = '';
    } else {
      myStyles['display'] = 'none';
    }
    return myStyles;
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

  hideShowSignInModal(isShow: boolean): void {
    if (isShow) {
      this.isShowModalClass = true;
    } else {
      this.isShowModalClass = false;
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
    if (isFormValid) {
      this.usersService.login(this.email, this.password).subscribe(
        (data) => { this.hideShowSignInModal(false); },
        (error) => {console.log(error)}        
      )      
    }
  }
}
