# Authentication Screens Guide

## 🎨 New Screens Created

Based on your Figma design, I've created 4 new authentication screens:

### 1. **Splash/Onboarding Screen** (`/`)
- Star icon with "Get points & enjoy" message
- "Get Start →" button at bottom
- Light green gradient background
- Navigates to login when clicked

### 2. **Login Screen** (`/login`)
- "Welcome Back!" title
- "Please sign in to continue" subtitle
- User Name and Password fields
- "FORGOT" link (red, bold)
- "Sign in" button (dark green)
- "Don't have an account? Sign up" footer

### 3. **Create Account Screen** (`/register`)
- "Create Account" title
- Form fields:
  - Full Name
  - Email
  - Mobile number
  - Password
  - Confirm Password
- "Sign up" button (dark green)
- "Already have an account? Sign in" footer

### 4. **Forgot Password Screen** (`/forgot-password`)
- Green header with back arrow
- "Forgot Password" title
- Padlock icon with reset arrows
- Email input field
- "Submit" button
- Success message after submission

## 🎨 Design Features

### Colors
- **Background:** Light green gradient (`#E0FFE0` to `#C0F0C0`)
- **Buttons:** Dark green (`#4CAF50`)
- **Links:** Red (`#EF4444`)
- **Inputs:** Light gray (`#E0E0E0`) with black border

### Typography
- **Font:** Serif (Georgia, Times New Roman)
- **Titles:** Large, bold
- **Body:** Regular weight

### Layout
- Centered forms
- Rounded input fields
- Shadow effects on buttons
- Responsive design

## 🚀 How to Use

### Start the App
```bash
cd user-profile-app
npm run dev
```

### Navigation Flow
```
/ (Splash) 
  → /login
    → /register (Sign up link)
    → /forgot-password (FORGOT link)
    → /profile (after login)
```

### Routes
- `/` - Splash/Onboarding screen
- `/login` - Login page
- `/register` - Create account page
- `/forgot-password` - Password reset page
- `/profile` - User profile (protected)
- `/edit` - Edit profile (protected)
- `/settings` - Settings (protected)

## 🔌 Connect to Backend

To connect these screens to your backend API:

### 1. Update LoginPage.jsx
```javascript
import api from '../services/api'

const handleSubmit = async (e) => {
  e.preventDefault()
  const result = await api.login(formData.username, formData.password)
  if (result.success) {
    navigate('/profile')
  }
}
```

### 2. Update RegisterPage.jsx
```javascript
import api from '../services/api'

const handleSubmit = async (e) => {
  e.preventDefault()
  const result = await api.register(
    formData.email,
    formData.password,
    formData.fullName
  )
  if (result.success) {
    navigate('/profile')
  }
}
```

### 3. Update ForgotPasswordPage.jsx
```javascript
// Add API call for password reset
const handleSubmit = async (e) => {
  e.preventDefault()
  // Call your password reset API endpoint
  // Show success message
}
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-primary: #4CAF50; /* Dark green */
  --color-error: #EF4444; /* Red for links */
}
```

### Change Fonts
Update `src/index.css`:
```css
--font-family-primary: 'Your Font', serif;
```

### Adjust Gradients
Edit individual page CSS files:
```css
background: linear-gradient(180deg, #E0FFE0 0%, #C0F0C0 100%);
```

## 📱 Responsive Design

All screens are responsive and work on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## ✅ Features Implemented

- ✅ Form validation
- ✅ Error messages
- ✅ Success states
- ✅ Navigation between screens
- ✅ Responsive layout
- ✅ Matching Figma design
- ✅ Accessible (ARIA labels, semantic HTML)

## 🔄 Next Steps

1. **Connect to Backend:**
   - Update API calls in each page
   - Handle authentication tokens
   - Add loading states

2. **Add Features:**
   - Remember me checkbox
   - Social login buttons
   - Password strength indicator
   - Email validation

3. **Enhance UX:**
   - Loading spinners
   - Toast notifications
   - Form auto-fill
   - Keyboard navigation

## 📝 Files Created

- `src/pages/SplashPage.jsx` & `.css`
- `src/pages/LoginPage.jsx` & `.css`
- `src/pages/RegisterPage.jsx` & `.css`
- `src/pages/ForgotPasswordPage.jsx` & `.css`

## 🎯 Design Matching Checklist

- [x] Light green gradient background
- [x] Dark green buttons (#4CAF50)
- [x] Red links (#EF4444)
- [x] Serif fonts
- [x] Rounded input fields
- [x] Button shadows
- [x] Proper spacing
- [x] Responsive layout

**All screens are ready to use! 🎉**


