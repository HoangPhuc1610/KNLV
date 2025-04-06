import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface, CategoryInterface } from './product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllPro(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products');
  }
  getHotPro(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?hot=1&limit=6');
  }
  getsinhnhat(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?idcate=6789d2b79e9cee1fc7851b7b&limit=6');
  }
  getkemlanh(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?idcate=6789d3169e9cee1fc7851b7c&limit=6');
  }
  
  searchProducts(keyword: string):Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`http://localhost:3000/products?name=${keyword}`);
  }
  getprobyid(id: string):Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`http://localhost:3000/products/${id}`);
  }
  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>('http://localhost:3000/categories');
  }
}