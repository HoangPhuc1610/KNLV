import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router'; // lấy pảram hoặc query URL
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-chitietsanpham',
  imports: [CommonModule],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {

  productDetail! : ProductInterface; // ! không đc null;
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getprobyid(id!).subscribe((data) =>{
      
      this.productDetail = data;
      console.log("array nè: ", this.productDetail);
    });
}
// thêm giỏ hàng
addCart(quantity: string):void {
  this.cartService.addCart(this.productDetail, parseInt(quantity,10));
  console.log(this.cartService.getCartLength());
  console.log(this.cartService);
  }
}
