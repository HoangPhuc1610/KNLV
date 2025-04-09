import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserInterface{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: {type:String, default:"user"};
  favorite: [{type:String}];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/register'; 

  constructor(private http: HttpClient) {}

  postUser(user: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  private apiLogin='http://localhost:3000/users/login';
  login(user: UserInterface): Observable<any> {
    return this.http.post<any>(this.apiLogin, user);
  }
  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users');
  }
  addToFavorite(email: string, productId: string): Observable<any> {
    const url = `http://localhost:3000/users/${email}/favorite/${productId}`;
    return this.http.post<any>(url, {}); 
  }
  checkFavorite(email: string, productId: string) {
    return this.http.get<{ isFavorite: boolean }>(
      `http://localhost:3000/users/${email}/favorite/${productId}`
    );
  }
}
