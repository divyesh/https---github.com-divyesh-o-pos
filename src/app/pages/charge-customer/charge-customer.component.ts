import { Component, Input ,ViewChild,Output,EventEmitter, OnInit } from '@angular/core';
import { shoppingCart, Product, ProductCategory, ProductTax, PaymentModel } from '../../interfaces/models';
import { ApiService } from '../../services/api/api.service';
import { DecimalPipe,NgIf } from '@angular/common';
@Component({
  selector: 'app-charge-customer',
  standalone: true,
  imports: [],
  templateUrl: './charge-customer.component.html',
  styleUrl: './charge-customer.component.css'
})
export class ChargeCustomerComponent implements OnInit {

  @Input() totalItems: number = 0;
  @Input() subtotal: number = 0;
  @Input() discount: number = 0;
  @Input() tax: number = 0;
  @Input() total: number = 0;
  @Input() carts: shoppingCart[] = [];
  public paymentTypes: PaymentModel[] = [];

  @Output() close = new EventEmitter<void>();

  constructor(private api: ApiService, private _decimalPipe: DecimalPipe) { 
  }
  ngOnInit(): void {
    this.loadPaymentTypes();
  }

  closeModal(): void {
	  this.close.emit();
  }
  transformDecimal(num: number) {
    return this._decimalPipe.transform(num, '1.2-2');
  }
  private loadPaymentTypes(): void {
    this.api.getPaymentTypes$().subscribe((data) => {
      this.paymentTypes = data;
      console.log(this.paymentTypes);
    });
  }
}
