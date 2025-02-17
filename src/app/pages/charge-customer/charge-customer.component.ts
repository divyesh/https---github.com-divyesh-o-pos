import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { shoppingCart, IProduct, ProductCategory, ProductTax, PaymentModel, OrderStatusModel } from '../../interfaces/models';
import { ApiService } from '../../services/api/api.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validator, Validators, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-charge-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
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
  @Input() currencySpecialChar: string | null = '$';

  tips: number = 0;
  cash: string = "";
  cashChange: number = 0;

  public paymentTypes: PaymentModel[] = [];
  public orderStatuses: OrderStatusModel[] = [];

  customerOrderForm = new FormGroup({
    orderStatusId: new FormControl('', Validators.required),
    paymentTypeId: new FormControl('', Validators.required),
    subtotal: new FormControl('', Validators.required),
    tax: new FormControl(),
    tips: new FormControl(),
    discount: new FormControl(),
    total: new FormControl('', Validators.required),
  });

  @Output() close = new EventEmitter<void>();

  constructor(private api: ApiService, private _decimalPipe: DecimalPipe) {
  }
  ngOnInit(): void {
    this.loadOrderStatuses();
    this.loadPaymentTypes();
  }

  closeModal(): void {
    this.close.emit();
  }

  transformDecimal(num: number) {
    return this._decimalPipe.transform(num, '1.2-2');
  }

  applyDiscount() {
    this.discount = Number(this.customerOrderForm.get("discount")?.value);
    this.total = this.total - this.discount;
    var calculateChange= Number(this.transformDecimal( Number(this.cash) - this.total));
    this.cashChange = calculateChange>0?calculateChange:0;
  }

  onCashInputChange(amount: any) {
    this.cash=amount;
    var calculateChange= Number(this.transformDecimal(Number(amount) - this.total));
    this.cashChange = calculateChange>0?calculateChange:0;
  }
  
  onTipsInputChange(tips: any) {
    this.tips = Number(tips);
    this.total = this.total + this.tips;
    var calculateChange= Number(this.transformDecimal(Number(this.cash) - this.total));
    this.cashChange = calculateChange>0?calculateChange:0;    
    console.log(tips);
  }

  onSubmitOrder(): void {
    console.log('Order Submitted ' + JSON.stringify(this.customerOrderForm.value));
  }


  private loadPaymentTypes(): void {
    this.api.getPaymentTypes$().subscribe((data) => {
      this.paymentTypes = data;
    });
  }

  private loadOrderStatuses(): void {
    this.api.getOrderStatuses$().subscribe((data) => {
      this.orderStatuses = data;
    });
  }

}
