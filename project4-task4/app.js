/**
 * NOVA LUXE - E-Commerce Product Catalog & Interactive Shopping Cart
 * Fully interactive frontend application with FakeStoreAPI integration
 */

(function () {
  'use strict';

  // =========================================================================
  // APPLICATION STATE
  // =========================================================================
  const STATE = {
    products: [],          // Raw products fetched from API
    filteredProducts: [],  // Filtered & searched products
    cart: [],              // Cart items: [{ product, quantity }]
    wishlist: new Set(),   // Wishlist product IDs
    activeCategory: 'all', // 'all', 'electronics', 'jewelry', 'clothing'
    searchQuery: '',       // Search input value
    sortBy: 'featured',    // 'featured', 'price-asc', 'price-desc', 'rating', 'popular'
    discountCode: null,    // Applied promo code
    discountPercent: 0,    // Discount percentage (e.g. 0.1 for 10%)
    discountFixed: 0,      // Flat discount amount ($)
    theme: 'light',        // 'light' | 'dark'
    isLoading: true,
    error: null
  };

  // LocalStorage keys
  const STORAGE_KEYS = {
    CART: 'novaluxe_cart_v2',
    WISHLIST: 'novaluxe_wishlist_v2',
    THEME: 'novaluxe_theme_v2'
  };

  // Fallback product catalog (ensures 100% uptime even if API drops connection)
  const FALLBACK_PRODUCTS = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials in the main compartment.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.30,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain climbing, cycling, traveling or other outdoors.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: { rate: 4.7, count: 500 }
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. Detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      rating: { rate: 2.1, count: 430 }
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695.00,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
      rating: { rate: 4.6, count: 400 }
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave Ring",
      price: 168.00,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and crafted with authentic solid gold and brilliant micropave gems.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
      rating: { rate: 3.9, count: 70 }
    },
    {
      id: 7,
      title: "White Gold Plated Princess Solitaire Diamond Promise Ring",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
      rating: { rate: 3.0, count: 400 }
    },
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double Flared Tunnel",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of high grade 316L Stainless Steel with refined polished sheen.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
      rating: { rate: 1.9, count: 100 }
    },
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: 64.00,
      description: "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance with ultra-compact high capacity storage on the go.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
      rating: { rate: 3.3, count: 203 }
    },
    {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109.00,
      description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
      rating: { rate: 2.9, count: 470 }
    },
    {
      id: 11,
      title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost",
      price: 109.00,
      description: "3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
      rating: { rate: 4.8, count: 319 }
    },
    {
      id: 12,
      title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114.00,
      description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png",
      rating: { rate: 4.8, count: 400 }
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599.00,
      description: "21.5 inches Full HD widescreen IPS display and Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png",
      rating: { rate: 2.9, count: 250 }
    },
    {
      id: 14,
      title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor Super Ultrawide Screen",
      price: 999.99,
      description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png",
      rating: { rate: 2.2, count: 140 }
    },
    {
      id: 15,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description: "Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest and 1 Hidden Pocket Inside.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
      rating: { rate: 2.6, count: 235 }
    },
    {
      id: 16,
      title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description: "Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
      rating: { rate: 2.9, count: 340 }
    },
    {
      id: 17,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description: "Lightweight perfect for trip or casual wear. Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
      rating: { rate: 3.8, count: 679 }
    },
    {
      id: 18,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V-Neck T-Shirt",
      price: 9.85,
      description: "Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem for premium everyday style.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
      rating: { rate: 4.7, count: 130 }
    },
    {
      id: 19,
      title: "Opna Women's Short Sleeve Moisture Wicking Athletic Shirt",
      price: 7.95,
      description: "100% cationic polyester interlock. Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
      rating: { rate: 4.5, count: 146 }
    },
    {
      id: 20,
      title: "DANVOUY Womens T Shirt Casual Cotton Short Sleeve",
      price: 12.99,
      description: "Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees. The fabric is soft and has some stretch. Ideal for school, home, work, street.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
      rating: { rate: 3.6, count: 145 }
    }
  ];

  // DOM Elements Cache
  const DOM = {};

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function initApp() {
    cacheDomElements();
    initTheme();
    loadPersistedData();
    bindEventListeners();
    fetchProducts();
    updateCartUI();
  }

  function cacheDomElements() {
    DOM.body = document.body;
    DOM.promoBar = document.getElementById('promoBar');
    DOM.promoCloseBtn = document.getElementById('promoCloseBtn');
    DOM.copyPromoCode = document.getElementById('copyPromoCode');

    DOM.searchInput = document.getElementById('searchInput');
    DOM.searchClearBtn = document.getElementById('searchClearBtn');

    DOM.themeToggleBtn = document.getElementById('themeToggleBtn');
    DOM.wishlistBtn = document.getElementById('wishlistBtn');
    DOM.wishlistCount = document.getElementById('wishlistCount');

    DOM.cartToggleBtn = document.getElementById('cartToggleBtn');
    DOM.cartCountBadge = document.getElementById('cartCountBadge');
    DOM.navCartTotal = document.getElementById('navCartTotal');

    DOM.sortBySelect = document.getElementById('sortBySelect');
    DOM.categoryFilters = document.getElementById('categoryFilters');
    DOM.catalogSubtitle = document.getElementById('catalogSubtitle');
    DOM.activeFilterBar = document.getElementById('activeFilterBar');
    DOM.activeFilterTags = document.getElementById('activeFilterTags');
    DOM.clearAllFiltersBtn = document.getElementById('clearAllFiltersBtn');

    DOM.loadingState = document.getElementById('loadingState');
    DOM.errorState = document.getElementById('errorState');
    DOM.errorMessage = document.getElementById('errorMessage');
    DOM.retryFetchBtn = document.getElementById('retryFetchBtn');
    DOM.loadFallbackBtn = document.getElementById('loadFallbackBtn');

    DOM.emptyState = document.getElementById('emptyState');
    DOM.resetSearchBtn = document.getElementById('resetSearchBtn');
    DOM.productGrid = document.getElementById('productGrid');

    // Cart Drawer Elements
    DOM.cartOverlay = document.getElementById('cartOverlay');
    DOM.cartDrawer = document.getElementById('cartDrawer');
    DOM.cartCloseBtn = document.getElementById('cartCloseBtn');
    DOM.cartDrawerCount = document.getElementById('cartDrawerCount');
    DOM.shippingProgressContainer = document.getElementById('shippingProgressContainer');
    DOM.shippingProgressText = document.getElementById('shippingProgressText');
    DOM.shippingProgressBar = document.getElementById('shippingProgressBar');
    DOM.cartEmptyView = document.getElementById('cartEmptyView');
    DOM.startShoppingBtn = document.getElementById('startShoppingBtn');
    DOM.cartItemsList = document.getElementById('cartItemsList');
    DOM.cartFooter = document.getElementById('cartFooter');

    DOM.couponInput = document.getElementById('couponInput');
    DOM.applyCouponBtn = document.getElementById('applyCouponBtn');
    DOM.couponFeedback = document.getElementById('couponFeedback');

    DOM.cartSubtotal = document.getElementById('cartSubtotal');
    DOM.discountRow = document.getElementById('discountRow');
    DOM.cartDiscount = document.getElementById('cartDiscount');
    DOM.cartTax = document.getElementById('cartTax');
    DOM.cartShipping = document.getElementById('cartShipping');
    DOM.cartGrandTotal = document.getElementById('cartGrandTotal');
    DOM.proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
    DOM.clearCartBtn = document.getElementById('clearCartBtn');

    // Modals
    DOM.quickViewOverlay = document.getElementById('quickViewOverlay');
    DOM.quickViewCloseBtn = document.getElementById('quickViewCloseBtn');
    DOM.quickViewBody = document.getElementById('quickViewBody');

    DOM.checkoutOverlay = document.getElementById('checkoutOverlay');
    DOM.checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
    DOM.checkoutCancelBtn = document.getElementById('checkoutCancelBtn');
    DOM.checkoutForm = document.getElementById('checkoutForm');
    DOM.checkoutItemsList = document.getElementById('checkoutItemsList');
    DOM.checkoutSubtotal = document.getElementById('checkoutSubtotal');
    DOM.checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
    DOM.checkoutDiscount = document.getElementById('checkoutDiscount');
    DOM.checkoutTax = document.getElementById('checkoutTax');
    DOM.checkoutShipping = document.getElementById('checkoutShipping');
    DOM.checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
    DOM.placeOrderBtn = document.getElementById('placeOrderBtn');
    DOM.placeOrderAmount = document.getElementById('placeOrderAmount');

    DOM.confirmationOverlay = document.getElementById('confirmationOverlay');
    DOM.confOrderId = document.getElementById('confOrderId');
    DOM.confCustomerName = document.getElementById('confCustomerName');
    DOM.confCustomerEmail = document.getElementById('confCustomerEmail');
    DOM.confDeliveryDate = document.getElementById('confDeliveryDate');
    DOM.confTotalPaid = document.getElementById('confTotalPaid');
    DOM.continueShoppingBtn = document.getElementById('continueShoppingBtn');

    DOM.toastContainer = document.getElementById('toastContainer');
    DOM.heroDealsBtn = document.getElementById('heroDealsBtn');
  }

  // =========================================================================
  // THEME MANAGEMENT
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    STATE.theme = theme;
    DOM.body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  function toggleTheme() {
    const newTheme = STATE.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  }

  // =========================================================================
  // LOCALSTORAGE PERSISTENCE (Requirement 9)
  // =========================================================================
  function loadPersistedData() {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) {
        STATE.cart = JSON.parse(storedCart);
      }
      const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (storedWishlist) {
        STATE.wishlist = new Set(JSON.parse(storedWishlist));
        updateWishlistCount();
      }
    } catch (e) {
      console.warn('Could not read from LocalStorage', e);
      STATE.cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(STATE.cart));
    } catch (e) {
      console.warn('Could not save cart to LocalStorage', e);
    }
  }

  function saveWishlistToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([...STATE.wishlist]));
    } catch (e) {
      console.warn('Could not save wishlist to LocalStorage', e);
    }
  }

  // =========================================================================
  // DATA FETCHING & ERROR HANDLING (Requirements 3 & 10)
  // =========================================================================
  async function fetchProducts() {
    showLoading(true);
    showError(false);

    try {
      // 8 second timeout to avoid indefinite hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch('https://fakestoreapi.com/products', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('API returned an empty dataset');
      }

      STATE.products = data;
      STATE.isLoading = false;
      showLoading(false);
      updateCategoryCounts();
      applyFiltersAndRender();
      showToast('Loaded 20 products from FakeStoreAPI', 'success');
    } catch (err) {
      console.error('Fetch error from FakeStoreAPI:', err);
      STATE.error = err.message;
      // Show error state with option to retry or load fallback
      showLoading(false);
      DOM.errorMessage.textContent = `Unable to fetch from FakeStoreAPI (${err.message}). You can retry or load the cached offline catalog.`;
      showError(true);
    }
  }

  function loadFallbackCatalog() {
    STATE.products = [...FALLBACK_PRODUCTS];
    STATE.isLoading = false;
    showLoading(false);
    showError(false);
    updateCategoryCounts();
    applyFiltersAndRender();
    showToast('Loaded cached product catalog', 'info');
  }

  function showLoading(show) {
    if (DOM.loadingState) {
      DOM.loadingState.style.display = show ? 'block' : 'none';
    }
    if (DOM.productGrid) {
      DOM.productGrid.style.display = show ? 'none' : 'grid';
    }
  }

  function showError(show) {
    if (DOM.errorState) {
      DOM.errorState.style.display = show ? 'flex' : 'none';
    }
  }

  // Calculate product counts per category
  function updateCategoryCounts() {
    const total = STATE.products.length;
    const electronics = STATE.products.filter(p => p.category.toLowerCase().includes('electronic')).length;
    const jewelry = STATE.products.filter(p => p.category.toLowerCase().includes('jewel')).length;
    const clothing = STATE.products.filter(p => p.category.toLowerCase().includes('clothing')).length;

    const countAll = document.getElementById('countAll');
    const countElectronics = document.getElementById('countElectronics');
    const countJewelry = document.getElementById('countJewelry');
    const countClothing = document.getElementById('countClothing');

    if (countAll) countAll.textContent = total;
    if (countElectronics) countElectronics.textContent = electronics;
    if (countJewelry) countJewelry.textContent = jewelry;
    if (countClothing) countClothing.textContent = clothing;
  }

  // =========================================================================
  // CATEGORY FILTERING & SEARCH (Requirements 4 & 5)
  // =========================================================================
  function setCategory(category) {
    STATE.activeCategory = category;

    // Update active tab styles
    const filterButtons = DOM.categoryFilters.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    applyFiltersAndRender();
  }

  function handleSearchInput(e) {
    STATE.searchQuery = e.target.value.trim().toLowerCase();
    DOM.searchClearBtn.style.display = STATE.searchQuery ? 'block' : 'none';
    applyFiltersAndRender();
  }

  function clearSearch() {
    STATE.searchQuery = '';
    DOM.searchInput.value = '';
    DOM.searchClearBtn.style.display = 'none';
    applyFiltersAndRender();
    DOM.searchInput.focus();
  }

  function resetAllFilters() {
    STATE.searchQuery = '';
    DOM.searchInput.value = '';
    DOM.searchClearBtn.style.display = 'none';
    STATE.activeCategory = 'all';
    STATE.sortBy = 'featured';
    DOM.sortBySelect.value = 'featured';

    const filterButtons = DOM.categoryFilters.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
    });

    applyFiltersAndRender();
    showToast('Filters reset to default', 'info');
  }

  function applyFiltersAndRender() {
    let result = [...STATE.products];

    // 1. Filter by category
    if (STATE.activeCategory !== 'all') {
      if (STATE.activeCategory === 'electronics') {
        result = result.filter(p => p.category.toLowerCase().includes('electronic'));
      } else if (STATE.activeCategory === 'jewelry') {
        result = result.filter(p => p.category.toLowerCase().includes('jewel'));
      } else if (STATE.activeCategory === 'clothing') {
        result = result.filter(p => p.category.toLowerCase().includes('clothing'));
      }
    }

    // 2. Filter by search query
    if (STATE.searchQuery) {
      result = result.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(STATE.searchQuery);
        const descMatch = p.description.toLowerCase().includes(STATE.searchQuery);
        const catMatch = p.category.toLowerCase().includes(STATE.searchQuery);
        return titleMatch || descMatch || catMatch;
      });
    }

    // 3. Sort results
    if (STATE.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (STATE.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (STATE.sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    } else if (STATE.sortBy === 'popular') {
      result.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
    }

    STATE.filteredProducts = result;
    renderProductGrid(result);
    renderActiveFilterTags();
  }

  function renderActiveFilterTags() {
    const hasCategory = STATE.activeCategory !== 'all';
    const hasSearch = STATE.searchQuery.length > 0;

    if (!hasCategory && !hasSearch) {
      DOM.activeFilterBar.style.display = 'none';
      return;
    }

    DOM.activeFilterBar.style.display = 'flex';
    let tagsHtml = '';

    if (hasCategory) {
      const catLabels = {
        electronics: 'Category: Electronics',
        jewelry: 'Category: Jewelry',
        clothing: 'Category: Clothing'
      };
      tagsHtml += `
        <span class="filter-tag">
          ${catLabels[STATE.activeCategory] || STATE.activeCategory}
          <button class="filter-tag-remove" onclick="window.setCategory('all')" title="Remove filter">&times;</button>
        </span>
      `;
    }

    if (hasSearch) {
      tagsHtml += `
        <span class="filter-tag">
          Search: "${escapeHtml(STATE.searchQuery)}"
          <button class="filter-tag-remove" onclick="window.clearSearch()" title="Remove search">&times;</button>
        </span>
      `;
    }

    DOM.activeFilterTags.innerHTML = tagsHtml;
  }

  // =========================================================================
  // PRODUCT CATALOG RENDERING (Requirement 3)
  // =========================================================================
  function renderProductGrid(products) {
    if (!DOM.productGrid) return;

    // Subtitle updates
    if (DOM.catalogSubtitle) {
      DOM.catalogSubtitle.textContent = `Showing ${products.length} of ${STATE.products.length} products`;
    }

    // Empty search handling
    if (products.length === 0) {
      DOM.productGrid.style.display = 'none';
      DOM.emptyState.style.display = 'flex';
      const emptyDesc = document.getElementById('emptySearchMessage');
      if (emptyDesc) {
        if (STATE.searchQuery) {
          emptyDesc.textContent = `We couldn't find any products matching "${STATE.searchQuery}". Try a different keyword or reset filters.`;
        } else {
          emptyDesc.textContent = 'No products found in this selection.';
        }
      }
      return;
    }

    DOM.emptyState.style.display = 'none';
    DOM.productGrid.style.display = 'grid';

    DOM.productGrid.innerHTML = products.map(product => {
      const badges = getProductBadges(product);
      const isWishlisted = STATE.wishlist.has(product.id);
      const starsHtml = generateStarRating(product.rating ? product.rating.rate : 4.0);
      const reviewCount = product.rating ? product.rating.count : 50;
      const formattedPrice = Number(product.price).toFixed(2);

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image-container">
            <div class="product-badges">
              ${badges.map(b => `<span class="badge-tag ${b.className}">${b.icon} ${b.label}</span>`).join('')}
            </div>

            <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    onclick="window.toggleWishlist(${product.id})" 
                    aria-label="Save to wishlist" 
                    title="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img 
              src="${escapeHtml(product.image)}" 
              alt="${escapeHtml(product.title)}" 
              class="product-img" 
              loading="lazy"
              onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'"
            >

            <button class="card-quick-view-btn" onclick="window.openQuickView(${product.id})">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Quick View
            </button>
          </div>

          <div class="product-details">
            <span class="product-category">${escapeHtml(product.category)}</span>
            <h3 class="product-title" onclick="window.openQuickView(${product.id})" title="${escapeHtml(product.title)}">
              ${escapeHtml(product.title)}
            </h3>

            <div class="product-rating" title="${product.rating ? product.rating.rate : 4.0} out of 5 stars">
              <div class="rating-stars">${starsHtml}</div>
              <span class="rating-score">${product.rating ? product.rating.rate.toFixed(1) : '4.0'}</span>
              <span class="rating-count">(${reviewCount})</span>
            </div>

            <div class="product-footer">
              <div class="product-price-box">
                <span class="product-price">$${formattedPrice}</span>
              </div>
              <button 
                class="add-to-cart-btn" 
                id="btn-add-${product.id}"
                onclick="window.addToCart(${product.id}, 1)"
                aria-label="Add ${escapeHtml(product.title)} to cart"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Badges: Popular, Best Seller, New
  function getProductBadges(product) {
    const badges = [];
    const ratingCount = product.rating ? product.rating.count : 0;
    const ratingScore = product.rating ? product.rating.rate : 0;

    if (ratingCount >= 300) {
      badges.push({ label: 'Best Seller', className: 'badge-bestseller', icon: '🔥' });
    } else if (ratingScore >= 4.2) {
      badges.push({ label: 'Popular', className: 'badge-popular', icon: '⭐' });
    }

    if (product.id % 4 === 0 || product.id === 1) {
      badges.push({ label: 'New', className: 'badge-new', icon: '✨' });
    }

    return badges;
  }

  function generateStarRating(rating) {
    let stars = '';
    const rounded = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars += '★';
      } else if (i - 0.5 === rounded) {
        stars += '★'; // or special half-star
      } else {
        stars += '☆';
      }
    }
    return stars;
  }

  // =========================================================================
  // SHOPPING CART FUNCTIONS (Requirements 6 & 7)
  // Must implement: addToCart(), removeFromCart(), updateQuantity(), calculateTotal()
  // =========================================================================

  /**
   * Add a product to cart or increment quantity if already present
   * @param {number} productId
   * @param {number} quantity
   */
  window.addToCart = function (productId, quantity = 1) {
    const product = STATE.products.find(p => p.id === Number(productId));
    if (!product) {
      console.error(`Product ID ${productId} not found`);
      return;
    }

    const existingIndex = STATE.cart.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      STATE.cart[existingIndex].quantity += quantity;
    } else {
      STATE.cart.push({
        product: product,
        quantity: quantity
      });
    }

    saveCartToStorage();
    updateCartUI();
    bumpCartBadge();

    // Visual button feedback on the product card
    const btn = document.getElementById(`btn-add-${product.id}`);
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Added!</span>
      `;
      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>Add to Cart</span>
        `;
      }, 1200);
    }

    showToast(`Added "${truncate(product.title, 26)}" to cart!`, 'success');
  };

  /**
   * Remove a product completely from cart
   * @param {number} productId
   */
  window.removeFromCart = function (productId) {
    const index = STATE.cart.findIndex(item => item.product.id === Number(productId));
    if (index > -1) {
      const removedName = STATE.cart[index].product.title;
      STATE.cart.splice(index, 1);
      saveCartToStorage();
      updateCartUI();
      showToast(`Removed "${truncate(removedName, 24)}" from cart`, 'info');
    }
  };

  /**
   * Update quantity of a product in the cart
   * Prevents quantity from going below 1
   * @param {number} productId
   * @param {number} newQty
   */
  window.updateQuantity = function (productId, newQty) {
    const item = STATE.cart.find(item => item.product.id === Number(productId));
    if (!item) return;

    const parsedQty = parseInt(newQty, 10);

    // Requirement 6: Prevent quantity from going below 1
    if (isNaN(parsedQty) || parsedQty < 1) {
      item.quantity = 1;
      showToast('Minimum quantity is 1', 'warning');
    } else {
      item.quantity = parsedQty;
    }

    saveCartToStorage();
    updateCartUI();
  };

  /**
   * Calculate all pricing breakdown:
   * Subtotal = Total product prices * quantities
   * Tax = 5% of subtotal
   * Shipping = Free for orders above $100; otherwise $10.
   * Grand Total = Subtotal + Tax + Shipping (- discount)
   */
  window.calculateTotal = function () {
    let subtotal = 0;
    let itemCount = 0;

    STATE.cart.forEach(item => {
      subtotal += item.product.price * item.quantity;
      itemCount += item.quantity;
    });

    // Discount calculations
    let discount = 0;
    if (STATE.discountFixed > 0) {
      discount = Math.min(STATE.discountFixed, subtotal);
    } else if (STATE.discountPercent > 0) {
      discount = subtotal * STATE.discountPercent;
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);

    // Tax = 5% of subtotal (or discounted subtotal)
    const tax = subtotal > 0 ? (discountedSubtotal * 0.05) : 0;

    // Shipping = Free for orders above $100; otherwise $10 (free if empty)
    let shipping = 0;
    if (subtotal > 0) {
      shipping = subtotal >= 100 ? 0 : 10;
    }

    const grandTotal = discountedSubtotal + tax + shipping;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      itemCount: itemCount,
      isFreeShipping: subtotal >= 100 && subtotal > 0
    };
  };

  /**
   * Clear the entire cart
   */
  window.clearCart = function () {
    if (STATE.cart.length === 0) return;
    STATE.cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Shopping cart has been cleared', 'info');
  };

  // =========================================================================
  // CART UI UPDATES
  // =========================================================================
  function updateCartUI() {
    const totals = window.calculateTotal();

    // 1. Update Badges
    if (DOM.cartCountBadge) {
      DOM.cartCountBadge.textContent = totals.itemCount;
    }
    if (DOM.navCartTotal) {
      DOM.navCartTotal.textContent = `$${totals.grandTotal.toFixed(2)}`;
    }
    if (DOM.cartDrawerCount) {
      DOM.cartDrawerCount.textContent = `${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'}`;
    }

    // 2. Free shipping progress calculation
    updateShippingProgress(totals.subtotal);

    // 3. Render Cart Drawer items & footer
    if (STATE.cart.length === 0) {
      if (DOM.cartEmptyView) DOM.cartEmptyView.style.display = 'flex';
      if (DOM.cartItemsList) DOM.cartItemsList.style.display = 'none';
      if (DOM.cartFooter) DOM.cartFooter.style.display = 'none';
    } else {
      if (DOM.cartEmptyView) DOM.cartEmptyView.style.display = 'none';
      if (DOM.cartItemsList) {
        DOM.cartItemsList.style.display = 'flex';
        renderCartItemsList();
      }
      if (DOM.cartFooter) {
        DOM.cartFooter.style.display = 'block';
        renderCartTotals(totals);
      }
    }
  }

  function updateShippingProgress(subtotal) {
    if (!DOM.shippingProgressContainer) return;

    if (subtotal >= 100) {
      DOM.shippingProgressText.innerHTML = '🎉 <strong>Congratulations!</strong> You have unlocked <strong>FREE Shipping</strong>!';
      DOM.shippingProgressBar.style.width = '100%';
    } else if (subtotal > 0) {
      const remaining = (100 - subtotal).toFixed(2);
      const percentage = Math.min(100, Math.round((subtotal / 100) * 100));
      DOM.shippingProgressText.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>FREE Shipping</strong>!`;
      DOM.shippingProgressBar.style.width = `${percentage}%`;
    } else {
      DOM.shippingProgressText.innerHTML = 'Add <strong>$100.00</strong> more for <strong>FREE Shipping</strong>!';
      DOM.shippingProgressBar.style.width = '0%';
    }
  }

  function renderCartItemsList() {
    if (!DOM.cartItemsList) return;

    DOM.cartItemsList.innerHTML = STATE.cart.map(item => {
      const p = item.product;
      const itemSubtotal = (p.price * item.quantity).toFixed(2);
      const isMinQty = item.quantity <= 1;

      return `
        <div class="cart-item" data-cart-id="${p.id}">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" class="cart-item-img">
          
          <div class="cart-item-info">
            <h4 class="cart-item-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</h4>
            <span class="cart-item-price">$${Number(p.price).toFixed(2)} each</span>
            
            <div class="cart-item-actions">
              <div class="qty-control">
                <button 
                  class="qty-btn" 
                  onclick="window.updateQuantity(${p.id}, ${item.quantity - 1})"
                  ${isMinQty ? 'disabled title="Quantity cannot be less than 1"' : 'title="Decrease quantity"'}
                  aria-label="Decrease quantity"
                >−</button>
                <span class="qty-val">${item.quantity}</span>
                <button 
                  class="qty-btn" 
                  onclick="window.updateQuantity(${p.id}, ${item.quantity + 1})"
                  title="Increase quantity"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>
          </div>

          <div class="cart-item-total-col">
            <button 
              class="cart-item-remove-btn" 
              onclick="window.removeFromCart(${p.id})" 
              title="Remove item from cart"
              aria-label="Remove ${escapeHtml(p.title)}"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
            <span class="cart-item-subtotal">$${itemSubtotal}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderCartTotals(totals) {
    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    
    if (DOM.discountRow && DOM.cartDiscount) {
      if (totals.discount > 0) {
        DOM.discountRow.style.display = 'flex';
        DOM.cartDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
      } else {
        DOM.discountRow.style.display = 'none';
      }
    }

    if (DOM.cartTax) DOM.cartTax.textContent = `$${totals.tax.toFixed(2)}`;
    
    if (DOM.cartShipping) {
      if (totals.shipping === 0 && totals.subtotal > 0) {
        DOM.cartShipping.innerHTML = '<span style="color: var(--accent-emerald); font-weight: 800;">FREE</span>';
      } else {
        DOM.cartShipping.textContent = `$${totals.shipping.toFixed(2)}`;
      }
    }

    if (DOM.cartGrandTotal) DOM.cartGrandTotal.textContent = `$${totals.grandTotal.toFixed(2)}`;
  }

  function bumpCartBadge() {
    if (DOM.cartCountBadge) {
      DOM.cartCountBadge.classList.add('bump');
      setTimeout(() => DOM.cartCountBadge.classList.remove('bump'), 350);
    }
  }

  // =========================================================================
  // DRAWER TOGGLE & MODALS
  // =========================================================================
  window.openCart = function () {
    DOM.cartOverlay.classList.add('open');
    DOM.cartDrawer.classList.add('open');
    DOM.cartOverlay.setAttribute('aria-hidden', 'false');
    DOM.cartDrawer.setAttribute('aria-hidden', 'false');
    DOM.body.style.overflow = 'hidden';
  };

  window.closeCart = function () {
    DOM.cartOverlay.classList.remove('open');
    DOM.cartDrawer.classList.remove('open');
    DOM.cartOverlay.setAttribute('aria-hidden', 'true');
    DOM.cartDrawer.setAttribute('aria-hidden', 'true');
    DOM.body.style.overflow = '';
  };

  // Promo code coupon logic
  function applyCoupon() {
    const code = DOM.couponInput.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'SAVE10') {
      STATE.discountFixed = 10;
      STATE.discountPercent = 0;
      STATE.discountCode = code;
      showCouponFeedback('Coupon "SAVE10" applied! $10.00 saved.', 'success');
      updateCartUI();
    } else if (code === 'LUXE20') {
      STATE.discountFixed = 0;
      STATE.discountPercent = 0.20;
      STATE.discountCode = code;
      showCouponFeedback('Coupon "LUXE20" applied! 20% discount granted.', 'success');
      updateCartUI();
    } else {
      showCouponFeedback('Invalid coupon code. Try "SAVE10"', 'error');
    }
  }

  function showCouponFeedback(msg, type) {
    if (!DOM.couponFeedback) return;
    DOM.couponFeedback.textContent = msg;
    DOM.couponFeedback.className = `coupon-feedback ${type}`;
    DOM.couponFeedback.style.display = 'block';
    setTimeout(() => {
      if (DOM.couponFeedback) DOM.couponFeedback.style.display = 'none';
    }, 4000);
  }

  // =========================================================================
  // QUICK VIEW MODAL
  // =========================================================================
  window.openQuickView = function (productId) {
    const product = STATE.products.find(p => p.id === Number(productId));
    if (!product) return;

    const starsHtml = generateStarRating(product.rating ? product.rating.rate : 4.0);
    const badges = getProductBadges(product);
    const isWishlisted = STATE.wishlist.has(product.id);

    DOM.quickViewBody.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-img-wrapper">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" onerror="this.src='https://via.placeholder.com/400'">
        </div>
        <div class="qv-info">
          <span class="qv-category">${escapeHtml(product.category)}</span>
          <h2 class="qv-title">${escapeHtml(product.title)}</h2>
          <div class="qv-rating">
            <div class="rating-stars">${starsHtml}</div>
            <strong>${product.rating ? product.rating.rate.toFixed(1) : '4.0'} / 5.0</strong>
            <span style="color: var(--text-muted)">(${product.rating ? product.rating.count : 50} reviews)</span>
          </div>
          <div class="qv-price">$${Number(product.price).toFixed(2)}</div>
          <p class="qv-desc">${escapeHtml(product.description)}</p>
          
          <div class="qv-actions">
            <button class="btn btn-primary" onclick="window.addToCart(${product.id}, 1); window.closeQuickView(); window.openCart();">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Add to Cart
            </button>
            <button class="btn btn-secondary" onclick="window.toggleWishlist(${product.id})">
              ${isWishlisted ? '❤️ Favorited' : '🤍 Wishlist'}
            </button>
          </div>
        </div>
      </div>
    `;

    DOM.quickViewOverlay.classList.add('open');
    DOM.quickViewOverlay.setAttribute('aria-hidden', 'false');
    DOM.body.style.overflow = 'hidden';
  };

  window.closeQuickView = function () {
    DOM.quickViewOverlay.classList.remove('open');
    DOM.quickViewOverlay.setAttribute('aria-hidden', 'true');
    DOM.body.style.overflow = '';
  };

  // =========================================================================
  // CHECKOUT & ORDER CONFIRMATION (Requirement 8)
  // =========================================================================
  window.openCheckout = function () {
    if (STATE.cart.length === 0) {
      showToast('Your cart is empty. Add items before checking out.', 'warning');
      return;
    }

    window.closeCart();

    const totals = window.calculateTotal();

    // Populate checkout items summary
    DOM.checkoutItemsList.innerHTML = STATE.cart.map(item => `
      <div class="checkout-summary-item">
        <img src="${escapeHtml(item.product.image)}" alt="${escapeHtml(item.product.title)}" class="checkout-summary-img">
        <div class="checkout-summary-info">
          <div class="checkout-summary-name">${escapeHtml(item.product.title)}</div>
          <div class="checkout-summary-qty">Qty: ${item.quantity} × $${Number(item.product.price).toFixed(2)}</div>
        </div>
        <div class="checkout-summary-price">$${(item.product.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    // Totals in sidebar
    DOM.checkoutSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    if (totals.discount > 0) {
      DOM.checkoutDiscountRow.style.display = 'flex';
      DOM.checkoutDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
    } else {
      DOM.checkoutDiscountRow.style.display = 'none';
    }

    DOM.checkoutTax.textContent = `$${totals.tax.toFixed(2)}`;
    DOM.checkoutShipping.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
    DOM.checkoutGrandTotal.textContent = `$${totals.grandTotal.toFixed(2)}`;
    DOM.placeOrderAmount.textContent = `($${totals.grandTotal.toFixed(2)})`;

    DOM.checkoutOverlay.classList.add('open');
    DOM.checkoutOverlay.setAttribute('aria-hidden', 'false');
    DOM.body.style.overflow = 'hidden';
  };

  window.closeCheckout = function () {
    DOM.checkoutOverlay.classList.remove('open');
    DOM.checkoutOverlay.setAttribute('aria-hidden', 'true');
    DOM.body.style.overflow = '';
  };

  /**
   * Complete simulated checkout
   */
  window.placeOrder = function () {
    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    const addressInput = document.getElementById('checkoutAddress');
    const cityInput = document.getElementById('checkoutCity');

    const customerName = nameInput ? nameInput.value.trim() : 'Valued Customer';
    const customerEmail = emailInput ? emailInput.value.trim() : 'customer@example.com';

    // Disable button & show spinner state
    DOM.placeOrderBtn.disabled = true;
    DOM.placeOrderBtn.innerHTML = '<span>Processing Order...</span>';

    setTimeout(() => {
      const totals = window.calculateTotal();
      const orderId = '#ORD-' + Math.floor(100000 + Math.random() * 900000);
      
      // Calculate delivery date (3-5 business days)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 4);
      const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      // Populate confirmation modal
      DOM.confOrderId.textContent = orderId;
      DOM.confCustomerName.textContent = customerName;
      DOM.confCustomerEmail.textContent = customerEmail;
      DOM.confDeliveryDate.textContent = `Arriving by ${deliveryDateStr}`;
      DOM.confTotalPaid.textContent = `$${totals.grandTotal.toFixed(2)}`;

      // Clear cart (Requirement 8)
      STATE.cart = [];
      STATE.discountCode = null;
      STATE.discountPercent = 0;
      STATE.discountFixed = 0;
      saveCartToStorage();
      updateCartUI();

      // Reset checkout button
      DOM.placeOrderBtn.disabled = false;
      DOM.placeOrderBtn.innerHTML = '<span>Place Order</span> <span id="placeOrderAmount"></span>';

      // Transition modals
      window.closeCheckout();
      DOM.confirmationOverlay.classList.add('open');
      DOM.confirmationOverlay.setAttribute('aria-hidden', 'false');
      DOM.body.style.overflow = 'hidden';

      showToast(`Order ${orderId} placed successfully!`, 'success');
    }, 900);
  };

  window.closeConfirmation = function () {
    DOM.confirmationOverlay.classList.remove('open');
    DOM.confirmationOverlay.setAttribute('aria-hidden', 'true');
    DOM.body.style.overflow = '';
  };

  // =========================================================================
  // WISHLIST MANAGEMENT
  // =========================================================================
  window.toggleWishlist = function (productId) {
    const id = Number(productId);
    if (STATE.wishlist.has(id)) {
      STATE.wishlist.delete(id);
      showToast('Removed from favorites', 'info');
    } else {
      STATE.wishlist.add(id);
      showToast('Saved to favorites! ❤️', 'success');
    }

    saveWishlistToStorage();
    updateWishlistCount();
    applyFiltersAndRender();
  };

  function updateWishlistCount() {
    if (DOM.wishlistCount) {
      DOM.wishlistCount.textContent = STATE.wishlist.size;
    }
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;

    const icons = {
      success: '✓',
      info: 'ℹ',
      warning: '⚠️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '•'}</span>
      <span>${escapeHtml(message)}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    // Trigger animate-in
    setTimeout(() => toast.classList.add('show'), 20);

    // Auto dismiss after 3.2s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // =========================================================================
  // EVENT LISTENERS
  // =========================================================================
  function bindEventListeners() {
    // Theme
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Search
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', handleSearchInput);
    }
    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.addEventListener('click', clearSearch);
    }
    if (DOM.resetSearchBtn) {
      DOM.resetSearchBtn.addEventListener('click', resetAllFilters);
    }

    // Category Tabs (Requirement 4)
    if (DOM.categoryFilters) {
      DOM.categoryFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (btn) {
          const category = btn.getAttribute('data-category');
          setCategory(category);
        }
      });
    }

    // Sort select
    if (DOM.sortBySelect) {
      DOM.sortBySelect.addEventListener('change', (e) => {
        STATE.sortBy = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Clear all filters button
    if (DOM.clearAllFiltersBtn) {
      DOM.clearAllFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // Cart Drawer Open/Close
    if (DOM.cartToggleBtn) {
      DOM.cartToggleBtn.addEventListener('click', window.openCart);
    }
    if (DOM.cartCloseBtn) {
      DOM.cartCloseBtn.addEventListener('click', window.closeCart);
    }
    if (DOM.cartOverlay) {
      DOM.cartOverlay.addEventListener('click', window.closeCart);
    }
    if (DOM.startShoppingBtn) {
      DOM.startShoppingBtn.addEventListener('click', () => {
        window.closeCart();
        const catalog = document.getElementById('catalogSection');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Cart clear
    if (DOM.clearCartBtn) {
      DOM.clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove all items from your cart?')) {
          window.clearCart();
        }
      });
    }

    // Promo code
    if (DOM.applyCouponBtn) {
      DOM.applyCouponBtn.addEventListener('click', applyCoupon);
    }
    if (DOM.couponInput) {
      DOM.couponInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyCoupon();
        }
      });
    }

    // Copy promo code from top banner
    if (DOM.copyPromoCode) {
      DOM.copyPromoCode.addEventListener('click', () => {
        if (DOM.couponInput) {
          DOM.couponInput.value = 'SAVE10';
        }
        showToast('Promo code "SAVE10" copied! Opening cart...', 'success');
        window.openCart();
      });
    }

    // Promo close
    if (DOM.promoCloseBtn) {
      DOM.promoCloseBtn.addEventListener('click', () => {
        DOM.promoBar.classList.add('hidden');
      });
    }

    // Checkout
    if (DOM.proceedCheckoutBtn) {
      DOM.proceedCheckoutBtn.addEventListener('click', window.openCheckout);
    }
    if (DOM.checkoutCloseBtn) {
      DOM.checkoutCloseBtn.addEventListener('click', window.closeCheckout);
    }
    if (DOM.checkoutCancelBtn) {
      DOM.checkoutCancelBtn.addEventListener('click', () => {
        window.closeCheckout();
        window.openCart();
      });
    }
    if (DOM.checkoutOverlay) {
      DOM.checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.checkoutOverlay) window.closeCheckout();
      });
    }

    // Payment method radio selection styling
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
        radio.closest('.payment-option').classList.add('selected');
        const cardBox = document.getElementById('cardFieldsBox');
        if (cardBox) {
          cardBox.style.display = radio.value === 'card' ? 'block' : 'none';
        }
      });
    });

    // Confirmation modal close
    if (DOM.continueShoppingBtn) {
      DOM.continueShoppingBtn.addEventListener('click', () => {
        window.closeConfirmation();
        const catalog = document.getElementById('catalogSection');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (DOM.confirmationOverlay) {
      DOM.confirmationOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.confirmationOverlay) window.closeConfirmation();
      });
    }

    // Quick view close
    if (DOM.quickViewCloseBtn) {
      DOM.quickViewCloseBtn.addEventListener('click', window.closeQuickView);
    }
    if (DOM.quickViewOverlay) {
      DOM.quickViewOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.quickViewOverlay) window.closeQuickView();
      });
    }

    // Error retry / fallback buttons
    if (DOM.retryFetchBtn) {
      DOM.retryFetchBtn.addEventListener('click', fetchProducts);
    }
    if (DOM.loadFallbackBtn) {
      DOM.loadFallbackBtn.addEventListener('click', loadFallbackCatalog);
    }

    // Hero buttons
    if (DOM.heroDealsBtn) {
      DOM.heroDealsBtn.addEventListener('click', () => {
        DOM.sortBySelect.value = 'popular';
        STATE.sortBy = 'popular';
        applyFiltersAndRender();
        const catalog = document.getElementById('catalogSection');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Footer category links
    document.querySelectorAll('[data-cat-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = link.getAttribute('data-cat-link');
        setCategory(cat);
        const catalog = document.getElementById('catalogSection');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Wishlist button click in nav
    if (DOM.wishlistBtn) {
      DOM.wishlistBtn.addEventListener('click', () => {
        if (STATE.wishlist.size === 0) {
          showToast('Your wishlist is empty. Click the heart icon on any product to save it!', 'info');
        } else {
          showToast(`You have ${STATE.wishlist.size} item(s) in your wishlist!`, 'info');
        }
      });
    }

    // ESC key closes any open modal/drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeCart();
        window.closeQuickView();
        window.closeCheckout();
        window.closeConfirmation();
      }
    });
  }

  // Helper utility functions
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function truncate(str, max = 30) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max) + '...' : str;
  }

  window.subscribeNewsletter = function () {
    const emailInput = document.getElementById('newsletterEmail');
    if (emailInput && emailInput.value) {
      showToast(`Subscribed ${emailInput.value}! Code "SAVE10" is active.`, 'success');
      emailInput.value = '';
    }
  };

  // Expose setCategory and clearSearch on window for inline handlers
  window.setCategory = setCategory;
  window.clearSearch = clearSearch;

  // Boot app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
