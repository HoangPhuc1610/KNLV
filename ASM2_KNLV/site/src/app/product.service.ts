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
  getMienBac(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?idcate=67ebfee2f8d3b2e3ede2ba7d&limit=8');
  }
  getMienTrung(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?idcate=67ed0c710018c91a35113362&limit=8');
  }
  getMienNam(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://localhost:3000/products?idcate=67ed0db10018c91a35113365&limit=8');
  }
  
  searchProducts(keyword: string):Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`http://localhost:3000/products?ten_mon=${keyword}`);
  }
  getprobyid(id: string):Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`http://localhost:3000/products/${id}`);
  }
  getProductsByCategory(categoryId: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`http://localhost:3000/products?idcate=${categoryId}`);
  }
  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>('http://localhost:3000/categories');
  }
  
}