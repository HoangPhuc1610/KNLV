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
      this.comments.push(data);
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

fetchUserName(): void {
  try {
    const userInfo = localStorage.getItem('userInfo'); // Retrieve userInfo from localStorage
    if (userInfo) {
      const user = JSON.parse(userInfo); // Parse the JSON string
      if (user && user.name) {
        this.userName = user.name; // Set the user's name
      } else {
        console.warn('User name is missing in userInfo.');
        this.userName = 'Ẩn danh'; // Default to 'Ẩn danh' if name is not available
      }
    } else {
      console.warn('No userInfo found in localStorage.');
      this.userName = 'Ẩn danh'; // Default to 'Ẩn danh' if userInfo is not found
    }
  } catch (error) {
    console.error('Error parsing userInfo from localStorage:', error);
    this.userName = 'Ẩn danh'; // Default to 'Ẩn danh' in case of an error
  }
}
