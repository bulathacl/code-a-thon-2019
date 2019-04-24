import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit, OnDestroy {

  @ViewChild("container", { read: ViewContainerRef }) container;
  componentRef: any;
  header: string;
  confirmation: boolean;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  openModal(component, data) {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;    
    this.header = data.header;
    this.confirmation = data.confirmation;
    document.getElementById('modalButton').click();
  }

  done() {
    this.componentRef.instance.done("done clicked");
  }

}
