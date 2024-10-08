import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductCategory } from '../../interfaces/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  @Input() categories?: ProductCategory[] = [];
  @Output() selectCategory = new EventEmitter<number>();

  selected: number = 0;

  ngOnInit(): void {
  }

  onSelect(id: number) {
    this.selectCategory.emit(id);
  }

  isActive(id: number) {
    return this.selected === id;
  };

}
