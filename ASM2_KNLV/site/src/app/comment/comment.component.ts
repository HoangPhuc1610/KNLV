import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() productId!: string; // Accept productId as input
  comments: any[] = [];
  commentForm!: FormGroup; // Declare without initialization
  token: string = ''; // Token to check login status
  userName: string = ''; // Store the user's name

  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Add HttpClient for API calls
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Retrieve token from local storage
    if (!this.token) {
      console.warn('User is not logged in.');
    } else {
      this.fetchUserName(); // Fetch the user's name based on the token
    }

    if (!this.productId) {
      console.error('Product ID is missing.');
      return;
    }

    // Initialize commentForm here
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.loadComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && changes['productId'].currentValue) {
      this.loadComments(); // Reload comments when productId changes
    }
  }

  fetchUserName(): void {
    if (!this.token) {
      console.warn('No token found in localStorage.');
      this.userName = 'Ẩn danh';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<{ name: string }>('http://localhost:3000/users/getuser', { headers }).subscribe(
      (data) => {
        this.userName = data.name || 'Ẩn danh'; // Set the user's name or default to 'Ẩn danh'
      },
      (error) => {
        console.error('Error fetching user information:', error);
        this.userName = 'Ẩn danh'; // Default to 'Ẩn danh' in case of an error
      }
    );
  }

  loadComments(): void {
    if (!this.productId) {
      console.error('Cannot fetch comments without a productId.');
      return;
    }

    // Check if comments exist in localStorage
    const storedComments = localStorage.getItem(`comments_${this.productId}`);
    if (storedComments) {
      this.comments = JSON.parse(storedComments).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      console.log('Loaded comments from localStorage:', this.comments);
    } else {
      // Fetch comments from the server if not in localStorage
      this.commentService.getComments(this.productId).subscribe(
        (data) => {
          this.comments = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem(`comments_${this.productId}`, JSON.stringify(this.comments)); // Save to localStorage
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    }
  }

  addComment(): void {
    if (!this.token) {
      alert('Bạn cần đăng nhập để bình luận.');
      this.router.navigate(['/dangky']); // Redirect to login page
      return;
    }

    if (this.commentForm.invalid) {
      alert('Vui lòng nhập nội dung bình luận hợp lệ.');
      return;
    }

    const content = this.commentForm.value.content;
    console.log("Sending comment data:", { productId: this.productId, content, token: this.token }); // Log data being sent

    if (!this.productId || !content) {
      console.error("Missing required fields: productId or content.");
      alert('Không thể gửi bình luận. Vui lòng thử lại.');
      return;
    }

    this.commentService.addComment(this.productId, content, this.token).subscribe(
      (data) => {
        console.log("Comment added successfully:", data);
        const newComment = { userName: this.userName, content, createdAt: new Date() };
        this.comments.unshift(newComment); // Add the new comment to the top of the list
        localStorage.setItem(`comments_${this.productId}`, JSON.stringify(this.comments)); // Update localStorage
        this.commentForm.reset();
        alert('Bình luận của bạn đã được gửi thành công!'); // Display success message
      },
      (error) => {
        console.error("Error adding comment:", error); // Log the error for debugging
        if (error.status === 400) {
          alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra và thử lại.');
        } else if (error.status === 401) {
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          this.router.navigate(['/dangky']);
        } else {
          alert('Lỗi khi thêm bình luận. Vui lòng thử lại sau.');
        }
      }
    );
  }

  onSubmit(): void {
    this.addComment();
  }
}
