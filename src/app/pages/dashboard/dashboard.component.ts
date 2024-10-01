import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ProductCategory } from '../../interfaces/models';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public categories: ProductCategory[] =[]; 
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllCategories$().subscribe((res)=>{
      this.categories=res;
    });;
  }
}
