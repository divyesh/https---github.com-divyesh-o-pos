import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ProductCategory } from '../../interfaces/models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  public categories: ProductCategory[] =[]; 
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllCategories$().subscribe((res)=>{
      this.categories=res;
    });;
  }
}
