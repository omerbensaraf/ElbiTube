import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss', '../../css/bootstrap.mincbed.css', '../../css/style.mincbed.css', '../../css/font-awesome.mincbed.css']
})
export class LoginHeaderComponent implements OnInit {

  constructor(private usersService: UsersService,private router: Router) { }

  ngOnInit() {
    const storedEmail = this.usersService.getUserEmail();
    if (storedEmail && storedEmail.length > 0) {
      this.usersService.changeloggedInUser(storedEmail);
      this.router.navigate(['home']);
    }
  }
}

