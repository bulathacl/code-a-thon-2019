import { Component, OnInit, Input } from '@angular/core';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @Input() data: any;
  counter: number = 0;

  constructor(private rxjsService: RxjsService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  done(data: any) {
    console.log(data);    
  }

  changeData() {
    this.rxjsService.changeHomeData(new Date);
  }

  changeCounter() {
    this.counter++;
    this.localStorageService.setItem('counter', this.counter).subscribe(() => {
      console.log("Counter Updated");
    });
  }
}
