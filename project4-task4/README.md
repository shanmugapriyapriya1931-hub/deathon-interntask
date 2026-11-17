# NOVA LUXE | E-Commerce Product Catalog & Interactive Shopping Cart

A complete, modern, responsive e-commerce web application built with vanilla HTML5, CSS3 Grid/Flexbox, and JavaScript, integrated with the real-world [FakeStoreAPI](https://fakestoreapi.com/products).

---

## 🌟 Key Features

### 1. Modern Website Design & Navigation
- **Navigation Bar**: Store logo ("NOVA LUXE"), brand icon, real-time search input, theme toggle (Light / Dark mode), Wishlist indicator, and slide-out Cart button with animated item count badge and subtotal preview.
- **Top Announcement Bar**: Hot deal banner featuring promotional coupon code `SAVE10` with one-click copy and auto-cart opening.
- **Hero Section**: Curated highlights, quick stats (Verified Products, 4.8★ rating, $100+ Free Shipping), and smooth scrolling CTA.
- **Responsive Theme Engine**: Full Light and Dark mode support persisted via `localStorage`.

### 2. Live FakeStoreAPI Integration
- Fetches real product data from `https://fakestoreapi.com/products`.
- Displays products as rich interactive cards with:
  - High-resolution product images with hover zoom and fallback placeholders.
  - Category tag.
  - Clamped titles with tooltips.
  - Dynamic star ratings and verified review counts.
  - Price formatting.
  - Special Badges:
    - 🔥 **Best Seller** (high review counts ≥ 300)
    - ⭐ **Popular** (ratings ≥ 4.2★)
    - ✨ **New**
  - "Add to Cart" button with instant visual feedback ("Added! ✓") and cart badge bounce.
  - "Quick View" modal showcasing product descriptions and quick add options.

### 3. Category Filtering
- Interactive category filter tabs:
  - **All Products** (20 items)
  - **Electronics** (6 items)
  - **Jewelry** (4 items, maps API `jewelery`)
  - **Clothing** (10 items, covers `men's clothing` & `women's clothing`)
- Live item count badges on each tab and active filter tag chips with individual dismiss buttons.

### 4. Real-Time Product Search
- Search input with debounce and instant result updates across titles, descriptions, and categories.
- One-click clear search button (`×`).
- Friendly empty state with "Clear Search & Filters" CTA when no products match.

### 5. Interactive Slide-Out Shopping Cart Drawer
- Smooth slide-in animation from the right with backdrop overlay and ESC key / click-outside close handlers.
- **Mandatory JavaScript Functions**:
  - `addToCart(productId, quantity = 1)`
  - `removeFromCart(productId)`
  - `updateQuantity(productId, newQty)` — strictly prevents quantity from going below 1.
  - `calculateTotal()`
- **Dynamic Pricing Calculations**:
  - `Subtotal` = $\sum (\text{Price} \times \text{Quantity})$
  - `Tax` = 5% of Subtotal
  - `Shipping` = **Free** for orders $\ge \$100$; otherwise **\$10.00**
  - `Grand Total` = $\text{Subtotal} + \text{Tax} + \text{Shipping} - \text{Discount}$
- **Free Shipping Progress Bar**: Real-time progress visualizer indicating how much more to add for free shipping.
- **Promo Coupon System**: Supports promo codes such as `SAVE10` ($10 flat discount) and `LUXE20` (20% off).

### 6. Simulated Checkout & Order Confirmation
- **Checkout Modal**:
  - Customer contact details & shipping address form with validation.
  - Simulated payment options (Credit/Debit Card, PayPal, Cash on Delivery).
  - Itemized order summary sidebar with thumbnail previews and live total breakdown.
- **Order Confirmation Modal**:
  - Animated SVG green checkmark sequence.
  - Generated Order ID (e.g. `#ORD-849204`).
  - Customer name and confirmation email receipt.
  - Estimated delivery timeframe (3-5 business days).
  - Automatically empties the cart and updates `localStorage`.

### 7. LocalStorage Persistence
- Cart items and quantities are saved automatically under `novaluxe_cart_v2`.
- Wishlist favorites saved under `novaluxe_wishlist_v2`.
- Theme preferences saved under `novaluxe_theme_v2`.
- State is fully rehydrated upon page reload.

### 8. Robust Error Handling & Fallbacks
- Skeleton loading placeholder grid with shimmer animation while data loads.
- Graceful API error handling with a retry button and embedded offline catalog fallback.
- Empty cart view with "Start Shopping" button.

---

## 📁 Project Structure

```
task4/
├── index.html        # Semantic HTML5 markup, modals, drawers & containers
├── styles.css        # Responsive CSS3 (CSS Grid, Flexbox, Variables, Animations)
├── app.js            # Core application logic, API fetch, cart, filters, checkout
├── server.js         # Lightweight Node.js local HTTP server
└── README.md         # Project documentation
```

---

## 🚀 Running Locally

1. Start the local server:
   ```powershell
   node server.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000/
   ```
