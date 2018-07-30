import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss', '../css/bootstrap.mincbed.css', '../css/style.mincbed.css', '../css/font-awesome.mincbed.css']
})
export class LoginHeaderComponent implements OnInit {

  email: string = '';
  
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.loggedInUser.subscribe(email => this.email = email);
  }

  logout(): void {
    this.usersService.logout().subscribe(
      (data) => {
        this.usersService.changeloggedInUser('');
      },
      (error) => {
      }
    )   
  }
}

