import { Component,Input,Output ,EventEmitter} from '@angular/core';
import { shoppingCart } from '../../interfaces/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() cartItems?: shoppingCart[] = [];
  @Output() selectCategory = new EventEmitter<number>();

  onCartClick(id:number){

  }
}
