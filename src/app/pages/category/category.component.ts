import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { ProductCategory } from '../../interfaces/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnChanges {

  @Input() categories?: ProductCategory[] = [];
  @Output() selectCategory = new EventEmitter<number>();

  selected: number = 0;
  totalCategories: number | undefined = 0;

  ngOnChanges(): void {
    this.totalCategories = this.categories?.length;
  }

  onSelect(id: number) {
    this.selected = id;
    this.selectCategory.emit(id);
  }

  isActive(id: number) {
    return this.selected === id;
  };

}
