// Switch between login and signup forms
function switchToSignup() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function switchToLogin() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone-number validation function
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Password strength validation
function validatePassword(password) {
    return password.length >= 8;
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-form .auth-form');
    const signupForm = document.querySelector('#signup-form .auth-form');
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Clear previous error styling
        clearErrors();
        
        let isValid = true;
        
        if (!validateEmail(email)) {
            showError('login-email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (password.length < 6) {
            showError('login-password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show the loading state
            const submitBtn = loginForm.querySelector('.auth-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                window.location.href = '../index.html';
            }, 1500);
        }
    });
    
    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.querySelector('input[name="terms"]').checked;
        
        clearErrors();
        
        let isValid = true;
        
        if (firstName.trim().length < 2) {
            showError('first-name', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        if (lastName.trim().length < 2) {
            showError('last-name', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            showError('signup-email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (!validatePassword(password)) {
            showError('signup-password', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match');
            isValid = false;
        }
        
        if (!termsAccepted) {
            alert('Please accept the Terms & Conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = signupForm.querySelector('.auth-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                window.location.href = '../index.html';
            }, 2000);
        }
    });
    
    // Real-time validation for password confirmation
    document.getElementById('confirm-password').addEventListener('input', function() {
        const password = document.getElementById('signup-password').value;
        const confirmPassword = this.value;
        
        if (confirmPassword.length > 0 && password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match');
        } else {
            clearFieldError('confirm-password');
        }
    });
    
    // Password strength indicator
    document.getElementById('signup-password').addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = getPasswordStrength(password);
        updatePasswordStrength(strengthIndicator);
    });
});

// Error handling functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const inputGroup = field.closest('.input-group');
    
    // Remove existing error
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = '#e74c3c';
    field.style.backgroundColor = '#fdf2f2';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    inputGroup.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const inputGroup = field.closest('.input-group');
    
    // Remove error styling
    field.style.borderColor = '#e1e5e9';
    field.style.backgroundColor = '#fafafa';
    
    // Remove error message
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '#e1e5e9';
        input.style.backgroundColor = '#fafafa';
    });
}

// Password strength checker
function getPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letter');
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Number');
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('Special character');
    
    return {
        score: strength,
        feedback: feedback
    };
}

function updatePasswordStrength(strengthData) {
    // Remove existing strength indicator
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    const passwordField = document.getElementById('signup-password');
    const inputGroup = passwordField.closest('.input-group');
    
    // Create strength indicator
    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'password-strength';
    strengthDiv.style.marginTop = '8px';
    
    const strengthBar = document.createElement('div');
    strengthBar.style.height = '4px';
    strengthBar.style.borderRadius = '2px';
    strengthBar.style.backgroundColor = '#e1e5e9';
    strengthBar.style.overflow = 'hidden';
    
    const strengthFill = document.createElement('div');
    strengthFill.style.height = '100%';
    strengthFill.style.transition = 'all 0.3s ease';
    
    // Set strength bar color and width
    const percentage = (strengthData.score / 5) * 100;
    strengthFill.style.width = percentage + '%';
    
    if (strengthData.score <= 2) {
        strengthFill.style.backgroundColor = '#e74c3c';
    } else if (strengthData.score <= 3) {
        strengthFill.style.backgroundColor = '#f39c12';
    } else {
        strengthFill.style.backgroundColor = '#27ae60';
    }
    
    strengthBar.appendChild(strengthFill);
    strengthDiv.appendChild(strengthBar);
    
    // Add strength text
    if (passwordField.value.length > 0) {
        const strengthText = document.createElement('div');
        strengthText.style.fontSize = '0.8rem';
        strengthText.style.marginTop = '4px';
        
        if (strengthData.score <= 2) {
            strengthText.style.color = '#e74c3c';
            strengthText.textContent = 'Weak password';
        } else if (strengthData.score <= 3) {
            strengthText.style.color = '#f39c12';
            strengthText.textContent = 'Medium password';
        } else {
            strengthText.style.color = '#27ae60';
            strengthText.textContent = 'Strong password';
        }
        
        strengthDiv.appendChild(strengthText);
    }
    
    inputGroup.appendChild(strengthDiv);
}