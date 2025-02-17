import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DecimalPipe,NgIf } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { shoppingCart, IProduct, ProductCategory, ProductTax, ProductModel } from '../../interfaces/models';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { CartComponent } from "../cart/cart.component";
import { ChargeCustomerComponent } from '../charge-customer/charge-customer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponent, ProductComponent, CartComponent,ChargeCustomerComponent,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit ,AfterViewInit{

  public currencySpecialChar: string | null = '$';
  public categories: ProductCategory[] = [];
  public products: IProduct[] = [];
  public carts: shoppingCart[] = [];

  public totalItems: number = 0;
  public subtotal: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  public total: number = 0;
  public isChargeDialogVisible = false;

  constructor(private api: ApiService, private _decimalPipe: DecimalPipe) { 
  }

  ngOnInit(): void {
    this.currencySpecialChar = localStorage.getItem('currency') ?? '$';
    this.loadProductCategories();
    this.updateProduct(0);
  }
  public ngAfterViewInit(): void
  {
    
  }
  onProductCategoryClick(id: number) {
    this.updateProduct(id);
  }

  onProductClick(item: IProduct) {
    ++this.totalItems;
    var totalPrice = item.minimumUnitPrice * item.minimumUnitToSale;
    var taxes: number = 0;

    if (item.productTaxes != undefined) {
      item.productTaxes.forEach((e, i) => {
        if (e.taxPercentage != undefined) {
          taxes += e.taxPercentage;
        }
      });
    }
    var product=new ProductModel(item);
    var discount = product.getOrderDiscount();
    var newItem = new shoppingCart(0, item.id, item.productName, item.productUnit, item.minimumUnitToSale, item.minimumUnitPrice, totalPrice, taxes,discount);

    const foundProduct = this.carts.find((it) => it.productId == item.id);
    if (!foundProduct) {
      this.carts.push(newItem);
    } else {

      this.carts.forEach((element, index) => {
        if (element.productId === item.id) {
          this.carts[index].quantity++;
          this.carts[index].totalPrice = this.carts[index].quantity * this.carts[index].price;
        }
      });
    }
    this.calculateTotal();
  }

  onClearButtonClick() {
    while (this.carts.length > 0) {
      this.carts.pop();
    }
    this.totalItems = 0;
    this.calculateTotal();
  }

  onChargeCustomerButtonClick() {
    this.isChargeDialogVisible = true;
    console.log('dash ChargeCustomerComponent ' + this.total);
  }
  hideChargeCustomer() {
    this.isChargeDialogVisible = false;
  }

  private calculateTotal() {
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.carts.forEach((element, index) => {
      this.subtotal += (element.quantity * element.price);

      if (element.tax > 0) {
        this.tax = (this.subtotal) * (element.tax / 100);
      }
      this.total = this.subtotal + this.tax;
    });
    
    this.total = this.transformDecimal(this.total);
    this.tax = this.transformDecimal(this.tax);
  }
  private loadProductCategories() {
    this.api.getAllCategories$().subscribe((res) => {
      this.categories = res;
    });
  }
  private updateProduct(id: number) {
    this.api.getProducts$(id).subscribe((res) => {
      this.products = res;
    });
  }

  transformDecimal(num: number) {
    return Number(this._decimalPipe.transform(num, '1.2-2'));
  }
}
