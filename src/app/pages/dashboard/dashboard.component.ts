import { Component, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { shoppingCart, Product, ProductCategory, ProductTax } from '../../interfaces/models';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponent, ProductComponent, CartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public currencySpecialChar: string | null = '$';
  public categories: ProductCategory[] = [];
  public products: Product[] = [];
  public carts: shoppingCart[] = [];

  public totalItems: number = 0;
  public subtotal: number = 0;
  public discount: number = 0;
  public tax: number = 0;
  public total: number = 0;

  constructor(private api: ApiService,private _decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.currencySpecialChar = localStorage.getItem('currency') ?? '$';
    this.loadProductCategories();
    this.updateProduct(0);
  }

  onProductCategoryClick(id: number) {
    this.updateProduct(id);
  }

  onProductClick(item: Product) {
    ++this.totalItems;
    var totalPrice = item.minimumUnitPrice * item.minimumUnitToSale;
    var taxes: number = 0;

    if (item.productTaxes != undefined) {
      item.productTaxes.forEach((e, i) => {
        if (e.taxPercentage != undefined) {
          taxes += e.taxPercentage;
        }
        console.log('Tax: ' + taxes);
      });
    }
    var newItem = new shoppingCart(0, item.id, item.productName, item.productUnit, item.minimumUnitToSale, item.minimumUnitPrice, totalPrice, taxes);

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
  private calculateTotal() {
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
    this.carts.forEach((element, index) => {
      this.subtotal += (element.quantity * element.price);

      if (element.tax > 0) {
        this.tax = (this.subtotal) * (element.tax / 100);
      }
      this.total= this.subtotal+this.tax;
    });
    
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

  transformDecimal(num:number){
    return this._decimalPipe.transform(num,'1.2-2');
  }
}
