import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { shoppingCart, Product, ProductCategory } from '../../interfaces/models';
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
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.currencySpecialChar = localStorage.getItem('currency') ?? '$';
    this.loadProductCategories();
    this.updateProduct(0);
  }

  onProductCategoryClick(id: number) {
    this.updateProduct(id);
  }

  onProductClick(item: Product) {
    var totalPrice = item.minimumUnitPrice * item.minimumUnitToSale;
    var newItem = new shoppingCart(0, item.id, item.productName, item.productUnit, item.minimumUnitToSale, item.minimumUnitPrice, totalPrice, 1);
    this.carts.push(newItem);
    console.log(JSON.stringify(this.carts));
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

}
