# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd user-profile-app
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:5173`

---

## 🎨 To Match Your Figma Design

### Quick Steps:

1. **Open your Figma file** → Switch to **Dev Mode** (if available)

2. **Extract these values:**
   - Colors (click elements → check right panel for hex codes)
   - Fonts (check typography section)
   - Spacing (use measurement tool)
   - Border radius values
   - Shadow values

3. **Update `src/index.css`:**
   - Find the `:root` section
   - Replace the CSS variable values with your Figma values
   - Example:
     ```css
     --color-primary: #YOUR_FIGMA_COLOR;
     --font-family-primary: 'Your Figma Font', sans-serif;
     ```

4. **Export assets from Figma:**
   - Right-click images/icons → Export
   - Save to `public/` folder
   - Update image paths in components

5. **Adjust component layouts:**
   - Each component has its own CSS file
   - Modify spacing, colors, fonts to match Figma exactly

---

## 📱 App Structure

- **Profile Page** (`/`) - Main profile view
- **Edit Profile** (`/edit`) - Edit profile form
- **Settings** (`/settings`) - Account settings

---

## 🔧 Common Customizations

### Change Colors
Edit `src/index.css` → `:root` section

### Change Fonts
1. Add font files to `public/fonts/` or use Google Fonts
2. Update `--font-family-primary` in `src/index.css`

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Layout.jsx`

---

## 📚 Need More Help?

See `README.md` for detailed documentation.


