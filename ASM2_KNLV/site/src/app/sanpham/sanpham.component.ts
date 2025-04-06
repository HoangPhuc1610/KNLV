import { Component } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ListcardComponent } from '../listcard/listcard.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CategoryInterface } from '../product-interface';

@Component({
  selector: 'app-sanpham',
  standalone: true,
  imports: [CommonModule, ListcardComponent, FormsModule, NgxSliderModule],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})  
export class SanphamComponent {
  
  allProduct: ProductInterface[] = [];
  sortedProduct: ProductInterface[] = [];
  categories: CategoryInterface[] = [];
  
  sortOrder: string = '';
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000000;
  
  sliderOptions: Options = {
    floor: 5000,
    ceil: 1000000
  };

  keyword: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllPro().subscribe((data) => {
      this.allProduct = data;
      this.sortedProduct = [...this.allProduct];
    });

    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  sortProducts() {
    if (this.sortOrder === "asc") {
      this.sortedProduct.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === "desc") {
      this.sortedProduct.sort((a, b) => b.price - a.price);
    } else {
      this.sortedProduct = [...this.allProduct];
    }
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.sortedProduct = this.allProduct.filter(p => p.categoryId._id === this.selectedCategory);
    } else {
      this.sortedProduct = [...this.allProduct];
    }
  }

  filterByPrice() {
    this.sortedProduct = this.allProduct.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);
  }

  onSearch() {
    if (!this.keyword.trim()) return;
    this.router.navigate(['/timkiem'], { queryParams: { name: this.keyword } });
  }
  
}
