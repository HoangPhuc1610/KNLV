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
  styleUrls: ['./chitietsanpham.component.css'] // dùng styleUrls đúng cú pháp
})
export class ChitietsanphamComponent {

  productDetail!: ProductInterface; // ! không đc null;
  isFavorite: boolean = false; // trạng thái đã thêm vào yêu thích

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.productService.getprobyid(id!).subscribe((data) => {
      this.productDetail = data;
      console.log("array nè: ", this.productDetail);

      // 🆕 Kiểm tra sản phẩm này đã được yêu thích chưa
      const email = localStorage.getItem('email');
      if (email) {
        this.userService.checkFavorite(email, this.productDetail._id!).subscribe(
          (result: boolean) => {
            this.isFavorite = result;
            console.log("Đã yêu thích?", result);
          },
          (error) => {
            console.error("Lỗi khi kiểm tra yêu thích:", error);
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
        this.isFavorite = true; // cập nhật trạng thái yêu thích
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
