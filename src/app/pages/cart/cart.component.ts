import { Component,Input,Output ,EventEmitter, OnInit} from '@angular/core';
import { shoppingCart } from '../../interfaces/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() cartItems?: shoppingCart[] = [];
  @Input() totalItems: number = 0;
  @Output() selectCategory = new EventEmitter<number>();
  @Input() subtotal: number = 0;
  @Input() discount: number = 0;
  @Input() tax: number = 0;
  @Input() total: number = 0;
  
  ngOnInit(): void {
  }
  onCartClick(id:number){
        this.cartItems?.forEach((e,i)=>{
      if(e.id==id){
        var quantity= e.quantity-1;
        if(quantity>0){
          e.quantity=quantity;
        }else{
          this.cartItems?.splice(i,1);
        }
      }
    });
  }

}
