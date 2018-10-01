import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../css/bootstrap.mincbed.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  repeatPassord = '';
  errorMessage: string = '';
  isShowModalClass: boolean = true;
  pageMode: string = ''; // Page modes can be: signIn and SignUp
  pageTitle: string = '';
  mainButtonText: string = '';

  constructor(private usersService: UsersService, private router: Router) { 
    this.setPageMode('signIn');
  }

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

  getPasswordInputStyle() {
    let myStyles: Object = {};
    if (this.pageMode === 'signIn') {
      myStyles['margin-bottom'] = '';
      myStyles['border-bottom-width'] = '';
    } else {
      myStyles['margin-bottom'] = '0px';
      myStyles['border-bottom-width'] = '0px';      
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

  setPageMode(pageMode: string): void {
    this.errorMessage = '';
    if (pageMode === 'signIn') {
      this.pageMode = 'signIn';
      this.pageTitle = 'Please sign in';
      this.mainButtonText = 'Sign in';
    } else {
      this.pageMode = 'signUp';
      this.pageTitle = 'Sign up';
      this.mainButtonText = 'Sign up';
    }
  }
  onMainButtonClicked(): void {
    if (this.pageMode === 'signIn') {
      this.onSignIn();
    } else {
      this.onSignUp();
    }
  }

  onSignIn(): void {
    this.errorMessage = '';
    let isFormValid: boolean = true;
    if (!this.isEmailNameValid()) {
      this.errorMessage = 'Please enter a valid elbit email';
      isFormValid = false;
    } else if (!this.isPasswordValid()) {
      this.errorMessage = 'Please enter a valid password';
      isFormValid = false;
    }
    if (isFormValid) {
     this.usersService.signIn(this.email, this.password).subscribe(
        (data) => {
          debugger;
          this.hideShowSignInModal(false);
          this.usersService.changeloggedInUser(data['email']);
          this.hideShowSignInModal(false);
          localStorage.setItem("email", data['email']);
          this.router.navigate(['home']);
        },
        (error) => {
          this.errorMessage = 'Authentication failed';
          this.password = '';
          this.email = '';
        }
      )
    }
  }

  onSignUp(): void {
    this.errorMessage = '';
    let isFormValid: boolean = true;
    if (!this.isEmailNameValid()) {
      this.errorMessage = 'Please enter a valid elbit email';
      isFormValid = false;
    } else if (!this.isPasswordValid()) {
      this.errorMessage = 'Please enter a valid password';
      isFormValid = false;
    } else if (this.repeatPassord === '' || this.repeatPassord !== this.password) {
      this.errorMessage = 'Passwords are not match';
      isFormValid = false;        
    }

    if (isFormValid) {
      this.usersService.signUp(this.email, this.password).subscribe(
        (data) => {
           this.hideShowSignInModal(false);
           localStorage.setItem("email", this.email);
           this.usersService.changeloggedInUser(data['email']);  
           swal('Congrats!','You are now a legit elbitube user','success').then( () =>
            this.router.navigate(['home'])
          );         
           
        },
        (error) => {
          this.errorMessage = 'Authentication failed';
          this.password = '';
          this.email = '';
          this.repeatPassord = '';
        }
      )      
    }
  }    
  handleKeyEvent(event, key) {
    if (key === 'Enter') {
      this.onMainButtonClicked();
    }
  }
}

