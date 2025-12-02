# How to Match Your Figma Design

This guide will help you customize the app to match your Figma prototype exactly.

## Step-by-Step Process

### 1. Extract Design Tokens from Figma

#### Colors
1. Open your Figma file
2. Select any colored element
3. Check the **Design** panel (right sidebar)
4. Copy the hex code (e.g., `#3B82F6`)
5. Note which color is used for what (primary, secondary, text, etc.)

#### Typography
1. Select text elements in Figma
2. Check the **Design** panel for:
   - Font family (e.g., "Inter", "Roboto")
   - Font size (e.g., 16px, 24px)
   - Font weight (e.g., 400, 600, 700)
   - Line height (e.g., 1.5, 24px)

#### Spacing
1. Use Figma's measurement tool
2. Measure padding, margins, gaps between elements
3. Note common spacing values (4px, 8px, 16px, 24px, etc.)

#### Border Radius
1. Select elements with rounded corners
2. Check border radius value in Design panel
3. Common values: 4px, 8px, 12px, 16px, or full circle

#### Shadows
1. Select elements with shadows
2. Check shadow properties:
   - X offset
   - Y offset
   - Blur radius
   - Spread
   - Color and opacity

### 2. Update CSS Variables

Open `src/index.css` and update the `:root` section:

```css
:root {
  /* Colors - Replace with your Figma colors */
  --color-primary: #YOUR_PRIMARY_COLOR;
  --color-secondary: #YOUR_SECONDARY_COLOR;
  --color-background: #YOUR_BG_COLOR;
  --color-text: #YOUR_TEXT_COLOR;
  /* ... etc */
  
  /* Typography - Replace with your Figma fonts */
  --font-family-primary: 'Your Font Name', sans-serif;
  --font-size-base: YOUR_BASE_SIZE;
  /* ... etc */
  
  /* Spacing - Replace with your Figma spacing */
  --spacing-md: YOUR_SPACING_VALUE;
  /* ... etc */
}
```

### 3. Export and Add Assets

#### Images
1. In Figma, right-click on images
2. Select **Export**
3. Choose format (PNG for photos, SVG for icons)
4. Save to `public/` folder
5. Update image paths in components:
   ```jsx
   <img src="/your-image.png" alt="Description" />
   ```

#### Icons
1. Export icons as SVG (best quality)
2. Save to `public/icons/` or `src/assets/icons/`
3. Import and use:
   ```jsx
   import Icon from '/icons/icon.svg'
   ```

### 4. Match Component Layouts

#### Profile Card
- Edit `src/components/ProfileCard.css`
- Adjust:
  - Avatar size and position
  - Text alignment
  - Spacing between elements
  - Card padding and border radius

#### Layout (Header/Nav/Footer)
- Edit `src/components/Layout.css`
- Customize:
  - Header height and background
  - Navigation style
  - Footer design

#### Buttons
- Edit `src/components/Button.css`
- Match:
  - Button padding
  - Border radius
  - Colors and hover states
  - Font size and weight

#### Forms
- Edit `src/components/Input.css`
- Adjust:
  - Input height and padding
  - Border style
  - Focus states
  - Label positioning

### 5. Adjust Responsive Breakpoints

If your Figma has different breakpoints:

1. Check your Figma design for mobile/tablet/desktop versions
2. Note the breakpoint widths
3. Update media queries in CSS files:
   ```css
   @media (min-width: YOUR_BREAKPOINT) {
     /* Your styles */
   }
   ```

### 6. Fine-Tune Details

#### Exact Spacing
- Use Figma's measurement tool
- Update padding/margin values in component CSS files
- Match gaps between elements exactly

#### Typography Hierarchy
- Match heading sizes (h1, h2, h3)
- Match body text sizes
- Match font weights

#### Colors and States
- Match hover states
- Match active/focus states
- Match disabled states

### 7. Use Figma Dev Mode (If Available)

If you have Figma Dev Mode:
1. Switch to Dev Mode in Figma
2. Select elements
3. Copy CSS properties directly
4. Paste into your component CSS files
5. Adjust as needed

### 8. Visual Comparison

1. Open your Figma design
2. Open your app in browser
3. Place them side-by-side
4. Compare:
   - Colors
   - Spacing
   - Typography
   - Layout
   - Shadows and effects

### 9. Browser Tools

Use browser DevTools:
1. Inspect elements
2. Compare computed styles with Figma
3. Adjust CSS until it matches
4. Use PerfectPixel extension for overlay comparison

## Common Matching Issues

### Colors Don't Match
- ✅ Use exact hex codes from Figma
- ✅ Check if using RGB vs hex
- ✅ Verify color profile (sRGB)

### Fonts Don't Match
- ✅ Export fonts from Figma
- ✅ Use Google Fonts if available
- ✅ Match font weights exactly
- ✅ Match line heights

### Spacing Doesn't Match
- ✅ Use Figma's measurement tool
- ✅ Check padding vs margin
- ✅ Verify box-sizing (border-box)

### Layout Doesn't Match
- ✅ Check flex/grid properties
- ✅ Verify alignment
- ✅ Check responsive breakpoints

## Quick Checklist

- [ ] Colors extracted and updated in `:root`
- [ ] Fonts added and configured
- [ ] Spacing values updated
- [ ] Border radius values matched
- [ ] Shadows copied exactly
- [ ] Images exported and added
- [ ] Icons exported and added
- [ ] Component layouts adjusted
- [ ] Responsive breakpoints set
- [ ] Visual comparison done
- [ ] Tested on different screen sizes

## Need Help?

If you're stuck on a specific element:
1. Take a screenshot of the Figma element
2. Note the exact measurements
3. Share the details and I can help customize it

---

**Tip:** Start with the most visible elements (colors, fonts, main layout) and work your way to details.


