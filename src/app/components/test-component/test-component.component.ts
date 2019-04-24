import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  done(data: any) {
    console.log(data);
    
  }

}
