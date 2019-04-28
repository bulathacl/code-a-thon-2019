import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string = "";
  email: string = "";
  mobile: string = "";
  password: string = "";
  confirmpwd: string = "";
  showRegError: boolean = false;

  constructor(private userService: UserService, 
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  register() {
    this.showRegError = false;
    var user: User = {
      Name: this.name,
      Email: this.email,
      Mobile: this.mobile,
    }

    this.userService.register(user, this.password).subscribe(data => {
      this.router.navigate(["/login"],{ queryParams: { email: this.email, pwd: this.password } })
    }, err => {
      this.showRegError = false;
      });
  }
}
