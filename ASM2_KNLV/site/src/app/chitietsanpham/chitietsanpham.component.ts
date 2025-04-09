import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { ActivatedRoute } from '@angular/router'; // lấy param hoặc query URL
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

  productDetail!: ProductInterface;
  isFavorite: boolean = false; // ✅ trạng thái yêu thích

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
  
    this.productService.getprobyid(id).subscribe((data) => {
      this.productDetail = data;
      console.log("array nè: ", this.productDetail);
  
      const email = localStorage.getItem('email');
      if (email && this.productDetail._id) {
        this.userService.checkFavorite(email, this.productDetail._id).subscribe(
          (res) => {
            this.isFavorite = res.isFavorite;
            console.log("isFavorite: ", this.isFavorite);
          },
          (err) => {
            console.error("Lỗi khi kiểm tra yêu thích: ", err);
          }
        );
      }
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
        this.isFavorite = true; // ✅ cập nhật trạng thái
      },
      (error) => {
        console.error('Lỗi khi thêm vào yêu thích:', error);
        alert('Sản phẩm đã được thêm vào danh sách yêu thích');
      }
    );
  }
}
