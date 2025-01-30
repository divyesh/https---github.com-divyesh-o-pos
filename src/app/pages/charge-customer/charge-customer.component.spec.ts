import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCustomerComponent } from './charge-customer.component';

describe('ChargeCustomerComponent', () => {
  let component: ChargeCustomerComponent;
  let fixture: ComponentFixture<ChargeCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
