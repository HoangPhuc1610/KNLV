
function showForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab');

    if (formType === 'login') {
        loginForm.classList.remove('form-hidden');
        registerForm.classList.add('form-hidden');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.add('form-hidden');
        registerForm.classList.remove('form-hidden');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}


// Hiển thị/Ẩn mật khẩu
function togglePassword(inputId, icon) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }