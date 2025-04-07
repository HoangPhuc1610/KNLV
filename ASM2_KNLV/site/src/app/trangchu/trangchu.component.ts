import { Component } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ListcardComponent } from '../listcard/listcard.component';
@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule,ListcardComponent],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent {
  getMienBac: ProductInterface[] = [];
  getMienTrung: ProductInterface[] = [];
  getMienNam: ProductInterface[] = [];
  getAllPro: ProductInterface[] = [];
  constructor(private productService: ProductService) {}
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
  }
  );
}
}

