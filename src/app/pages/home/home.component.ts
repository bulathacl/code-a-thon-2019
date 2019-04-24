import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    
  }

  overviewItemClicked(event: any){
    this.router.navigate(["/itemdetail/" + event + "/false"]);
  }

}
