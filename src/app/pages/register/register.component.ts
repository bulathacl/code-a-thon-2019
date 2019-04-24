import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.showRegError = false;
    var regModel = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      password: this.password
    }

    this.apiService.post('auth', 'insertuser', regModel).subscribe(data => {
      this.router.navigate(["/login"],{ queryParams: { email: this.email, pwd: this.password } })
    }, err => {
      debugger;
      this.showRegError = false;
      });
  }
}
