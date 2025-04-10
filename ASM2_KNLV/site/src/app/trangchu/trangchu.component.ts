import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ListcardComponent } from '../listcard/listcard.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule, ListcardComponent, RouterModule, FormsModule],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent implements OnInit {
  getMienBac: ProductInterface[] = [];
  getMienTrung: ProductInterface[] = [];
  getMienNam: ProductInterface[] = [];
  getAllPro: ProductInterface[] = [];
  keyword: string = '';

  constructor(
    private productService: ProductService,
    private router: Router  // Sửa lại cách inject Router
  ) {}

  ngOnInit(){
    this.productService.getMienBac().subscribe((data) => {
      this.getMienBac = data;
      console.log( "hot:",this.getMienBac);
    }); 
    this.productService.getMienTrung().subscribe((data) => {
      this.getMienTrung = data;
      console.log( "hot:",this.getMienTrung);
    }); 
    this.productService.getMienNam().subscribe((data) => {
      this.getMienNam = data;
      console.log( "hot:",this.getMienNam);
    }); 
  
    this.productService.getAllPro().subscribe((data) => {
      this.getAllPro = data;
      console.log( "all:",this.getAllPro);
    });
  }

  onSearch() {
    if (!this.keyword.trim()) {
      return;
    }
    // Điều hướng đến trang tìm kiếm với từ khóa
    this.router.navigate(['/timkiem'], { 
      queryParams: { ten_mon: this.keyword.trim() } 
    });
  }
}

