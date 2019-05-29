import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractActionFormComponent } from './contract-action-form.component';

describe('ContractActionFormComponent', () => {
  let component: ContractActionFormComponent;
  let fixture: ComponentFixture<ContractActionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractActionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractActionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
