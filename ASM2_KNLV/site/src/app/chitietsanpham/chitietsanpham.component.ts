import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router'; // lấy pảram hoặc query URL
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chitietsanpham',
  imports: [CommonModule],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {

  productDetail! : ProductInterface; // ! không đc null;
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private userService: UserService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getprobyid(id!).subscribe((data) =>{
      
      this.productDetail = data;
      console.log("array nè: ", this.productDetail);
    });
  }
  
  addToFavorite(): void {
    const email = localStorage.getItem('email'); 
    if (!email) {
      alert('Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích!');
      return;
    }

    const productId = this.productDetail._id; 
    if (!productId) {
      console.error('Product ID is undefined.');
      alert('Không thể thêm sản phẩm vào danh sách yêu thích.');
      return;
    }
    this.userService.addToFavorite(email, productId).subscribe(
      (response) => {
        console.log('Thêm vào yêu thích thành công:', response);
        alert('Sản phẩm đã được thêm vào danh sách yêu thích!');
      },
      (error) => {
        console.error('Lỗi khi thêm vào yêu thích:', error);
        alert('Có lỗi xảy ra khi thêm vào danh sách yêu thích.');
      }
    );
  }
}
