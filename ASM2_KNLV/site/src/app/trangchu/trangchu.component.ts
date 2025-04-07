import { Component } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ListcardComponent } from '../listcard/listcard.component';
@Component({
  selector: 'app-trangchu',
  imports: [CommonModule,ListcardComponent],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent {
  getHotPro: ProductInterface[] = [];
  getsinhnhat: ProductInterface[] = [];
  getkemlanh: ProductInterface[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(){
  this.productService.getHotPro().subscribe((data) => {
    this.getHotPro = data;
    console.log( "hot:",this.getHotPro);
  }); 
  this.productService.getsinhnhat().subscribe((data) => {
    this.getsinhnhat = data;
    console.log("trong nước:", this.getHotPro);
  }); 
  this.productService.getkemlanh().subscribe((data) => {
    this.getkemlanh = data;
    console.log( "quốc tế:", this.getHotPro);
  }); 
}
}

