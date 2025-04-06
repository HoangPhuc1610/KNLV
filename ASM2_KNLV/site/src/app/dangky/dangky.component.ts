import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css'
})
export class DangkyComponent {
  formType: 'login' | 'register' = 'login';

  showLoginPassword = false;
  showRegisterPassword = false;

  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  selectedFile: File | null = null;
  submitted = false;

  constructor(private userService: UserService, private router: Router) {}

  setFormType(type: 'login' | 'register') {
    this.formType = type;
  }

  toggleLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleRegisterPassword() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('File selected:', this.selectedFile);
  }

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Mật khẩu xác nhận không khớp');
      return;
    }

    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('confirmPassword', this.user.confirmPassword);

    this.userService.postUser(formData).subscribe({
      next: () => {
        console.log('Đăng ký thành công', this.user);
        this.submitted = true;
      },
      error: () => {
        console.error('Đăng ký thất bại');
      }
    });
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();
    // TODO: xử lý login nếu muốn
    console.log('Đăng nhập form đang được gửi!');
  }
}
