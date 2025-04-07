import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  dropdownOpen = [false];
  keyword: string = '';

  constructor(private router: Router, public cartService: CartService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(event: Event, index: number) {
    if (window.innerWidth <= 768) {
      event.preventDefault();
      this.dropdownOpen[index] = !this.dropdownOpen[index];
    }
  }

  onSearch() {
    if (!this.keyword.trim()) return;
    this.router.navigate(['/timkiem'], { queryParams: { name: this.keyword } });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserName(): string {
    return localStorage.getItem('name') || 'Người dùng';
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    alert('Đăng xuất thành công!');
    this.router.navigate(['/']);
  }
}
