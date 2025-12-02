# User Profile App

A modern, responsive user profile application built with React and Vite. This app was created from a Figma design and includes multiple pages for viewing and editing user profiles.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd user-profile-app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
user-profile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx       # Main layout with header/nav/footer
│   │   ├── ProfileCard.jsx  # User profile card component
│   │   ├── InfoSection.jsx  # Information display sections
│   │   ├── Button.jsx       # Button component
│   │   └── Input.jsx        # Input field component
│   ├── pages/               # Page components
│   │   ├── ProfilePage.jsx  # Main profile view
│   │   ├── EditProfilePage.jsx  # Edit profile form
│   │   └── SettingsPage.jsx     # Settings page
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles and design tokens
├── package.json
└── vite.config.js
```

## 🎨 Matching Your Figma Design

### Step 1: Extract Design Tokens from Figma

1. **Open your Figma file** and switch to **Dev Mode** (if available)
2. **Select elements** and note down:
   - Colors (hex codes)
   - Typography (font family, sizes, weights)
   - Spacing values (padding, margins)
   - Border radius values
   - Shadow values

### Step 2: Update Design Tokens

Edit `src/index.css` and update the CSS variables in the `:root` section:

```css
:root {
  /* Replace these with your Figma values */
  --color-primary: #YOUR_COLOR;
  --font-family-primary: 'Your Font', sans-serif;
  --spacing-md: YOUR_SPACING;
  /* ... etc */
}
```

### Step 3: Update Component Styles

Each component has its own CSS file. Update them to match your Figma design:

- `src/components/ProfileCard.css` - Profile card styling
- `src/components/Layout.css` - Header, navigation, footer
- `src/components/Button.css` - Button styles
- `src/components/Input.css` - Form input styles

### Step 4: Adjust Layout

If your Figma design has a different layout structure:

1. **Modify components** in `src/components/` to match your design
2. **Update page layouts** in `src/pages/` 
3. **Adjust responsive breakpoints** in CSS files

### Step 5: Add Assets

1. **Export images/icons** from Figma:
   - Right-click → Export → Choose format (PNG, SVG)
   - Save to `public/` folder for static assets
   - Or `src/assets/` for imported assets

2. **Update image references** in components:
   ```jsx
   <img src="/your-image.png" alt="Description" />
   ```

## 🛠️ Customization Guide

### Adding New Pages

1. Create a new component in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/your-page" element={<YourPage />} />
   ```
3. Add navigation link in `src/components/Layout.jsx`

### Modifying User Data Structure

Update the user data structure in `src/pages/ProfilePage.jsx` to match your needs:

```jsx
const [user] = useState({
  name: 'Your Name',
  // Add your fields here
})
```

### Connecting to Backend

Replace the sample data with API calls:

```jsx
import { useState, useEffect } from 'react'

function ProfilePage() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])
  
  // ... rest of component
}
```

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Adjust breakpoints in component CSS files as needed.

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Multiple pages (Profile, Edit, Settings)
- ✅ Form validation
- ✅ Modern UI components
- ✅ Easy to customize design tokens
- ✅ Clean component structure

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## 🔧 Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS Variables** - Theming system

## 📝 Next Steps

1. **Match Figma Design:**
   - Extract colors, fonts, spacing from Figma
   - Update CSS variables in `src/index.css`
   - Adjust component styles

2. **Add Functionality:**
   - Connect to backend API
   - Add authentication
   - Implement data persistence

3. **Enhance Features:**
   - Add image upload
   - Add more profile fields
   - Add social features

## 🆘 Troubleshooting

### Colors don't match Figma
- Check if you're using exact hex codes
- Verify color profile (sRGB vs Display P3)
- Test on different monitors

### Fonts don't match
- Export fonts from Figma or use Google Fonts
- Add `@font-face` declarations in CSS
- Match font weights exactly

### Spacing doesn't match
- Use Figma's measurement tool
- Update spacing variables in `:root`
- Check padding/margin values

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [Figma to Code Guide](../FIGMA_TO_APP_GUIDE.md)

## 🤝 Need Help?

If you need help matching specific Figma elements:
1. Share screenshots of your Figma design
2. Note the specific elements you want to match
3. I can help customize the components

---

**Happy coding! 🎉**


