import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss', '../css/bootstrap.mincbed.css', '../css/style.mincbed.css', '../css/font-awesome.mincbed.css']
})
export class AppHeaderComponent implements OnInit {

  email: string = '';
  
  constructor(private usersService: UsersService,  private router: Router) { 
    this.usersService.loggedInUser.subscribe(email => this.email = email);
  }

  ngOnInit() {
     this.email = this.usersService.getUserEmail();
     //this.usersService.loggedInUser.subscribe(email => this.email = email);          
  }

  logout(): void {
    localStorage.removeItem('email');
    this.usersService.logout().subscribe(
      (data) => {
        this.usersService.changeloggedInUser('');
        this.router.navigate(['']);
      },
      (error) => {
      }
    )   
  }

}


