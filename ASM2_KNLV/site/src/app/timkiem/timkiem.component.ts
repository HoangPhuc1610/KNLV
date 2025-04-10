import { Component } from '@angular/core';
import { ListcardComponent } from '../listcard/listcard.component';
import { ProductInterface } from '../product-interface';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-timkiem',
  imports: [ListcardComponent],
  templateUrl: './timkiem.component.html',
  styleUrl: './timkiem.component.css'
})
export class TimkiemComponent {
  searchPro: ProductInterface[] = [];
  constructor(
    private productService: ProductService,
    private route:ActivatedRoute
  ) {}  
    ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        this.productService.searchProducts(params['ten_mon']).subscribe((data) => {
          this.searchPro = data;
        });
      });
    }
}
