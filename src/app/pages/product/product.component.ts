import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../interfaces/models';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() products?: IProduct[] = [];
  @Input() currency?: string | null = '$';
  @Output() selectProduct = new EventEmitter<IProduct>();
  constructor(private api: ApiService) { }

  updateProducts(id: number) {
    this.api.getProducts$(id).subscribe((res) => {
      this.products = res;
    });;
  }

  onClick(item:IProduct){
    console.log('Product: '+JSON.stringify(item));
    this.selectProduct.emit(item);
  }
}
