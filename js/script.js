// Variables globales
// Versión: 1.1 - Actualizado para Netlify
let cart = [];
let currentOrder = [];
let inventory = {};

// Cargar configuración
const PRICES = {
    basic: CONFIG.prices.basic.base,
    robust: CONFIG.prices.robust.base,
    hosting: CONFIG.prices.basic.hosting,
    domain: CONFIG.prices.basic.domain,
    messaging: CONFIG.prices.robust.messaging
};

// 20 productos para sublimación con imágenes reales
const PRODUCTS = [
    { id: 1, name: "Taza Personalizada", price: 8500, stock: 50, description: "Taza de cerámica con diseño personalizado mediante sublimación. Perfecta para regalos corporativos y personales.", image: "images/products/taza-personalizada.jpg" },
    { id: 2, name: "Polera Estampada", price: 15900, stock: 30, description: "Polera 100% algodón con estampado personalizado. Disponible en varios colores y tallas.", image: "images/products/polera-estampada.jpg" },
    { id: 3, name: "Gorra Bordada", price: 12900, stock: 40, description: "Gorra de alta calidad con bordado personalizado. Perfecta para eventos y promociones.", image: "images/products/gorra-bordada.jpg" },
    { id: 4, name: "Mouse Pad Personalizado", price: 5900, stock: 60, description: "Mouse pad con superficie suave y diseño personalizado. Ideal para oficina y gaming.", image: "images/products/mouse-pad.jpg" },
    { id: 5, name: "Llavero Sublimado", price: 3900, stock: 100, description: "Llavero de acrílico con diseño sublimado. Perfecto para regalos promocionales.", image: "images/products/llavero-sublimado.jpg" },
    { id: 6, name: "Taza Térmica", price: 12900, stock: 25, description: "Taza térmica de acero inoxidable con diseño personalizado. Mantiene la temperatura por horas.", image: "images/products/taza-termica.jpg" },
    { id: 7, name: "Cojín Decorativo", price: 8900, stock: 35, description: "Cojín de tela con diseño sublimado. Perfecto para decorar cualquier espacio.", image: "images/products/cojin-decorativo.jpg" },
    { id: 8, name: "Mochila Personalizada", price: 25900, stock: 20, description: "Mochila resistente con diseño personalizado. Ideal para estudiantes y viajes.", image: "images/products/mochila-personalizada.jpg" },
    { id: 9, name: "Polo Deportivo", price: 18900, stock: 45, description: "Polo deportivo con tecnología de secado rápido. Perfecto para actividades físicas.", image: "images/products/polo-deportivo.jpg" },
    { id: 10, name: "Taza de Café", price: 7500, stock: 55, description: "Taza de café con diseño personalizado. Ideal para amantes del café.", image: "images/products/taza-cafe.jpg" },
    { id: 11, name: "Gorra Trucker", price: 9900, stock: 40, description: "Gorra trucker con diseño personalizado. Estilo clásico y versátil.", image: "images/products/gorra-trucker.jpg" },
    { id: 12, name: "Taza de Té", price: 6500, stock: 50, description: "Taza de té con diseño personalizado. Perfecta para momentos de relajación.", image: "images/products/taza-te.jpg" },
    { id: 13, name: "Polera Polo", price: 13900, stock: 35, description: "Polera polo con diseño personalizado. Elegante y cómoda para cualquier ocasión.", image: "images/products/polera-polo.jpg" },
    { id: 14, name: "Gorra Snapback", price: 11900, stock: 30, description: "Gorra snapback con diseño personalizado. Estilo moderno y urbano.", image: "images/products/gorra-snapback.jpg" },
            { id: 15, name: "Copa de Vino", price: 9500, stock: 25, description: "Copa de vino con diseño personalizado. Elegante para eventos especiales.", image: "images/products/taza-vino.jpg" },
    { id: 16, name: "Polera Manga Larga", price: 17900, stock: 40, description: "Polera manga larga con diseño personalizado. Perfecta para el invierno.", image: "images/products/polera-manga-larga.jpg" },
    { id: 17, name: "Gorra Beanie", price: 8900, stock: 35, description: "Gorra beanie con diseño personalizado. Cálida y cómoda para el frío.", image: "images/products/gorra-beanie.jpg" },
            { id: 18, name: "Shoppero Cerveza", price: 8500, stock: 30, description: "Shoppero de cerveza con diseño personalizado. Ideal para reuniones con amigos.", image: "images/products/taza-cerveza.jpg" },
    { id: 19, name: "Polera Tank Top", price: 12900, stock: 25, description: "Polera tank top con diseño personalizado. Perfecta para el verano.", image: "images/products/polera-tank-top.jpg" },
    { id: 20, name: "Gorra Bucket", price: 10900, stock: 30, description: "Gorra bucket con diseño personalizado. Estilo casual y versátil.", image: "images/products/gorra-bucket.jpg" }
];

// Inicializar inventario
PRODUCTS.forEach(product => {
    inventory[product.id] = product.stock;
});

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando app...');
    initializeApp();
    initializeSearch();
    
            // Forzar renderizado de productos si estamos en una página de demo
        setTimeout(() => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPage.includes('demo')) {
                console.log('Forzando renderizado de productos...');
                renderProducts();
                
                // Forzar renderizado del carrito
                if (currentPage.includes('demo-basica')) {
                    console.log('Forzando renderizado del carrito básico...');
                    renderBasicCartIcon();
                    
                    // Verificar que el carrito se renderizó correctamente
                    setTimeout(() => {
                        const cartIcon = document.querySelector('.cart-icon.basic-cart');
                        if (!cartIcon) {
                            console.log('Carrito básico no encontrado, re-renderizando...');
                            renderBasicCartIcon();
                        }
                    }, 500);
                } else if (currentPage.includes('demo-robusta')) {
                    console.log('Forzando renderizado del carrito robusto...');
                    renderCartIcon();
                    
                    // Verificar que el carrito se renderizó correctamente
                    setTimeout(() => {
                        const cartIcon = document.querySelector('.cart-icon:not(.basic-cart)');
                        if (!cartIcon) {
                            console.log('Carrito robusto no encontrado, re-renderizando...');
                            renderCartIcon();
                        }
                    }, 500);
                }
            }
        
        // Forzar inicialización de calculadoras
        if (currentPage.includes('maqueta-basica')) {
            console.log('Forzando inicialización de calculadora básica...');
            setTimeout(() => initializeBasicCalculator(), 500);
        } else if (currentPage.includes('maqueta-robusta')) {
            console.log('Forzando inicialización de calculadora robusta...');
            setTimeout(() => initializeRobustCalculator(), 500);
        }
    }, 1000);
});

// Funcionalidad de búsqueda
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        
        // Buscar en el array de productos para obtener la descripción
        const productId = parseInt(card.dataset.productId);
        const product = PRODUCTS.find(p => p.id === productId);
        const productDescription = product ? product.description.toLowerCase() : '';
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Función principal de inicialización
function initializeApp() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            break;
        case 'maqueta-basica.html':
            console.log('Inicializando calculadora básica...');
            initializeBasicCalculator();
            break;
        case 'maqueta-robusta.html':
            console.log('Inicializando calculadora robusta...');
            initializeRobustCalculator();
            break;
        case 'demo-basica.html':
            renderProducts();
            renderBasicCartIcon();
            initializeSearch();
            break;
        case 'demo-robusta.html':
            renderProducts();
            renderCartIcon();
            renderInventory();
            initializeSearch();
            break;
    }
}

// Calculadoras de precios
function initializeBasicCalculator() {
    const calculator = document.getElementById('basic-calculator');
    if (!calculator) return;

    const checkboxes = calculator.querySelectorAll('.checkbox');
    const totalPrice = calculator.querySelector('.total-price');

    function updateTotal() {
        let total = PRICES.basic;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const option = checkbox.dataset.option;
                if (option === 'hosting') total += PRICES.hosting;
                if (option === 'domain') total += PRICES.domain;
            }
        });
        totalPrice.textContent = `$${total.toLocaleString('es-CL')}`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });
}

function initializeRobustCalculator() {
    const calculator = document.getElementById('robust-calculator');
    if (!calculator) return;

    const checkboxes = calculator.querySelectorAll('.checkbox');
    const totalPrice = calculator.querySelector('.total-price');

    function updateTotal() {
        let total = PRICES.robust;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const option = checkbox.dataset.option;
                if (option === 'hosting') total += PRICES.hosting;
                if (option === 'domain') total += PRICES.domain;
                if (option === 'messaging') total += PRICES.messaging;
            }
        });
        totalPrice.textContent = `$${total.toLocaleString('es-CL')}`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });
}

// Renderizado de productos
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    const currentPage = window.location.pathname.split('/').pop();
    const isBasicDemo = currentPage === 'demo-basica.html';

    productsGrid.innerHTML = PRODUCTS.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image" onclick="openProductModal(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toLocaleString('es-CL')}</p>
                <div class="product-stock">Stock: ${inventory[product.id]}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); ${isBasicDemo ? 'addToBasicOrderDirect' : 'addToCartDirect'}(${product.id})">
                    ${isBasicDemo ? 'Agregar al pedido' : 'Agregar al carrito'}
                </button>
            </div>
        </div>
    `).join('');
}



// Modal de producto robusto con personalización
function openRobustProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="product-modal">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}" id="preview-image">
                </div>
                <div class="product-modal-info">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price.toLocaleString('es-CL')}</p>
                    <p class="description">${product.description}</p>
                    <div class="product-details">
                        <p><strong>Stock disponible:</strong> ${inventory[product.id]} unidades</p>
                        <p><strong>Material:</strong> Alta calidad</p>
                        <p><strong>Personalización:</strong> Sublimación digital</p>
                    </div>
                    
                    <div class="customization-section">
                        <h3>Personalizar Producto</h3>
                        
                        <div class="customization-option">
                            <label>Color del producto:</label>
                            <input type="color" id="product-color" value="#ffffff" onchange="updatePreview()">
                        </div>
                        
                        <div class="customization-option">
                            <label>Texto personalizado:</label>
                            <input type="text" id="custom-text" placeholder="Tu texto aquí" oninput="updatePreview()">
                        </div>
                        
                        <div class="customization-option">
                            <label>Fuente:</label>
                            <select id="font-family" onchange="updatePreview()">
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                        
                        <div class="customization-option">
                            <label>Subir imagen:</label>
                            <input type="file" id="custom-image" accept="image/*" onchange="handleImageUpload(event)">
                        </div>
                    </div>
                    
                    <div class="quantity-selector">
                        <label>Cantidad:</label>
                        <input type="number" id="quantity-${product.id}" value="1" min="1" max="${inventory[product.id]}">
                    </div>
                    
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Mostrar el modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Funciones de personalización
function updatePreview() {
    const previewImage = document.getElementById('preview-image');
    const customText = document.getElementById('custom-text');
    const fontFamily = document.getElementById('font-family');
    const productColor = document.getElementById('product-color');
    
    if (previewImage && customText && fontFamily && productColor) {
        // Aquí se actualizaría la vista previa con las personalizaciones
        // Por simplicidad, solo cambiamos el color de fondo
        previewImage.style.backgroundColor = productColor.value;
        
        // Mostrar texto personalizado en la imagen si existe
        if (customText.value) {
            previewImage.style.position = 'relative';
            if (!previewImage.querySelector('.custom-text-overlay')) {
                const textOverlay = document.createElement('div');
                textOverlay.className = 'custom-text-overlay';
                textOverlay.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #000;
                    font-family: ${fontFamily.value};
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    z-index: 10;
                `;
                previewImage.appendChild(textOverlay);
            }
            previewImage.querySelector('.custom-text-overlay').textContent = customText.value;
        }
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImage = document.getElementById('preview-image');
            if (previewImage) {
                previewImage.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Funciones para agregar productos directamente
function addToBasicOrderDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    if (inventory[productId] <= 0) {
        alert('No hay stock disponible');
        return;
    }
    
    const existingItem = currentOrder.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentOrder.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            customizations: {}
        });
    }
    
    inventory[productId] -= 1;
    updateBasicCartIcon();
    renderProducts();
    showNotification('Producto agregado al pedido');
    
    console.log('Producto agregado directamente al pedido básico:', product.name, 'Total productos:', currentOrder.length);
}

function addToCartDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    if (inventory[productId] <= 0) {
        alert('No hay stock disponible');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            customizations: {}
        });
    }
    
    inventory[productId] -= 1;
    updateCartIcon();
    renderProducts();
    showNotification('Producto agregado al carrito');
    
    console.log('Producto agregado directamente al carrito robusto:', product.name, 'Total productos:', cart.length);
}

// Funciones del carrito básico (pedido)
function addToBasicOrder(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    if (quantity > inventory[productId]) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    // Obtener personalizaciones si están disponibles
    const customizations = {
        color: document.getElementById('product-color') ? document.getElementById('product-color').value : '#ffffff',
        text: document.getElementById('custom-text') ? document.getElementById('custom-text').value : '',
        font: document.getElementById('font-family') ? document.getElementById('font-family').value : 'Arial',
        image: document.getElementById('custom-image') ? document.getElementById('custom-image').files[0] : null
    };
    
    console.log('Agregando al pedido básico:', {
        productId,
        productName: product.name,
        quantity,
        customizations
    });
    
    const existingItem = currentOrder.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
        // Actualizar personalizaciones si son diferentes
        if (customizations.text || customizations.color !== '#ffffff' || customizations.font !== 'Arial' || customizations.image) {
            existingItem.customizations = customizations;
        }
    } else {
        currentOrder.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            customizations: customizations
        });
    }
    
    inventory[productId] -= quantity;
    closeModal();
    updateBasicCartIcon();
    renderProducts(); // Actualizar stock mostrado
    showNotification('Producto agregado al pedido');
}

function renderBasicCartIcon() {
    // Remover carrito existente si existe
    const existingCart = document.querySelector('.cart-icon.basic-cart');
    if (existingCart) {
        existingCart.remove();
    }
    
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon basic-cart';
    cartIcon.innerHTML = `
        <div class="cart-icon-inner" onclick="toggleBasicCart()">
            🛒 <span class="cart-count">${currentOrder.length}</span>
        </div>
    `;
    document.body.appendChild(cartIcon);
    
    console.log('Carrito básico renderizado con', currentOrder.length, 'productos');
}

function updateBasicCartIcon() {
    const cartCount = document.querySelector('.basic-cart .cart-count');
    if (cartCount) {
        cartCount.textContent = currentOrder.length;
        console.log('Contador del carrito básico actualizado:', currentOrder.length);
    } else {
        console.log('No se encontró el contador del carrito básico, re-renderizando...');
        renderBasicCartIcon();
    }
}

function toggleBasicCart() {
    const existingCart = document.querySelector('.basic-cart-sidebar');
    if (existingCart) {
        existingCart.remove();
        return;
    }

    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar basic-cart-sidebar';
    
    if (currentOrder.length === 0) {
        cartSidebar.innerHTML = '<p>No hay productos en el pedido</p>';
    } else {
        const totalPrice = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalQuantity = currentOrder.reduce((sum, item) => sum + item.quantity, 0);
        
        cartSidebar.innerHTML = `
            <div class="cart-header">
                <h3>Resumen del Pedido</h3>
                <button onclick="toggleBasicCart()">&times;</button>
            </div>
            <div class="cart-items">
                ${currentOrder.map((item, index) => {
                    const product = PRODUCTS.find(p => p.id === item.id);
                    return `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${product.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>$${item.price.toLocaleString('es-CL')} x ${item.quantity}</p>
                                ${item.customizations && item.customizations.text ? `<p>Texto: "${item.customizations.text}"</p>` : ''}
                            </div>
                            <div class="cart-item-actions">
                                <button onclick="updateBasicCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateBasicCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                                <button onclick="removeFromBasicCart(${index})">🗑️</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="cart-total">
                <strong>Total: ${totalQuantity} productos - $${totalPrice.toLocaleString('es-CL')}</strong>
            </div>
            <button class="btn btn-primary" onclick="generateBasicOrder()">Generar Pedido</button>
        `;
    }
    
    document.body.appendChild(cartSidebar);
}

function updateBasicCartItemQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromBasicCart(index);
        return;
    }
    
    const item = currentOrder[index];
    const stockAvailable = inventory[item.id] + item.quantity;
    
    if (newQuantity > stockAvailable) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    inventory[item.id] = stockAvailable - newQuantity;
    item.quantity = newQuantity;
    toggleBasicCart();
    toggleBasicCart();
    renderProducts();
}

function removeFromBasicCart(index) {
    const item = currentOrder[index];
    inventory[item.id] += item.quantity;
    currentOrder.splice(index, 1);
    updateBasicCartIcon();
    toggleBasicCart();
    toggleBasicCart();
    renderProducts();
}

// Funciones del carrito robusto
function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    if (quantity > inventory[productId]) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    // Obtener personalizaciones si están disponibles
    const customizations = {
        color: document.getElementById('product-color') ? document.getElementById('product-color').value : '#ffffff',
        text: document.getElementById('custom-text') ? document.getElementById('custom-text').value : '',
        font: document.getElementById('font-family') ? document.getElementById('font-family').value : 'Arial',
        image: document.getElementById('custom-image') ? document.getElementById('custom-image').files[0] : null
    };
    
    console.log('Agregando al carrito robusto:', {
        productId,
        productName: product.name,
        quantity,
        customizations
    });
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
        // Actualizar personalizaciones si son diferentes
        if (customizations.text || customizations.color !== '#ffffff' || customizations.font !== 'Arial' || customizations.image) {
            existingItem.customizations = customizations;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            customizations: customizations
        });
    }
    
    inventory[productId] -= quantity;
    closeModal();
    updateCartIcon();
    renderProducts();
    showNotification('Producto agregado al carrito');
    
    console.log('Producto agregado al carrito robusto desde modal:', product.name, 'Total productos:', cart.length);
}

function renderCartIcon() {
    // Remover carrito existente si existe
    const existingCart = document.querySelector('.cart-icon:not(.basic-cart)');
    if (existingCart) {
        existingCart.remove();
    }
    
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
        <div class="cart-icon-inner" onclick="toggleCart()">
            🛒 <span class="cart-count">${cart.length}</span>
        </div>
    `;
    document.body.appendChild(cartIcon);
    
    console.log('Carrito robusto renderizado con', cart.length, 'productos');
}

function updateCartIcon() {
    const cartCount = document.querySelector('.cart-icon:not(.basic-cart) .cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        console.log('Contador del carrito robusto actualizado:', cart.length);
    } else {
        console.log('No se encontró el contador del carrito robusto, re-renderizando...');
        renderCartIcon();
    }
}

function toggleCart() {
    const existingCart = document.querySelector('.cart-sidebar');
    if (existingCart) {
        existingCart.remove();
        return;
    }

    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    
    if (cart.length === 0) {
        cartSidebar.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartSidebar.innerHTML = `
            <div class="cart-header">
                <h3>Carrito de Compras</h3>
                <button onclick="toggleCart()">&times;</button>
            </div>
            <div class="cart-items">
                ${cart.map((item, index) => {
                    const product = PRODUCTS.find(p => p.id === item.id);
                    return `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${product.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>$${item.price.toLocaleString('es-CL')} x ${item.quantity}</p>
                                ${item.customizations.text ? `<p>Texto: "${item.customizations.text}"</p>` : ''}
                            </div>
                            <div class="cart-item-actions">
                                <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                                <button onclick="removeFromCart(${index})">🗑️</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="cart-total">
                <strong>Total: $${totalPrice.toLocaleString('es-CL')}</strong>
            </div>
            <button class="btn btn-primary" onclick="generateRobustOrder()">Finalizar Compra</button>
        `;
    }
    
    document.body.appendChild(cartSidebar);
    
    // Mostrar el carrito con animación
    setTimeout(() => {
        cartSidebar.classList.add('show');
    }, 10);
}

function updateCartItemQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    const item = cart[index];
    const stockAvailable = inventory[item.id] + item.quantity;
    
    if (newQuantity > stockAvailable) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    inventory[item.id] = stockAvailable - newQuantity;
    item.quantity = newQuantity;
    toggleCart();
    toggleCart();
    renderProducts();
}

function removeFromCart(index) {
    const item = cart[index];
    inventory[item.id] += item.quantity;
    cart.splice(index, 1);
    toggleCart();
    toggleCart();
    renderProducts();
}

// Renderizado del inventario
function renderInventory() {
    const inventorySection = document.querySelector('.inventory-section');
    if (!inventorySection) return;

    inventorySection.innerHTML = `
        <h3>Inventario</h3>
        <div class="inventory-grid">
            ${PRODUCTS.map(product => `
                <div class="inventory-item">
                    <span>${product.name}</span>
                    <span class="stock-count">${inventory[product.id]}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Generación de pedidos
function generateBasicOrder() {
    if (currentOrder.length === 0) {
        alert('No hay productos en el pedido');
        return;
    }

    const orderId = generateOrderId();
    const totalPrice = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = currentOrder.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CL')}`
    ).join('\n');

    const message = `Hola, mi número de pedido es ${orderId} y quiero estos productos:\n\n${orderSummary}\n\nTotal: $${totalPrice.toLocaleString('es-CL')}\n\n¿Podrían confirmarme la disponibilidad y el tiempo de entrega?`;

    const whatsappUrl = `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar pedido
    currentOrder = [];
    updateBasicCartIcon();
    const existingCart = document.querySelector('.basic-cart-sidebar');
    if (existingCart) {
        existingCart.remove();
    }
    showNotification('Pedido enviado por WhatsApp');
}

function generateRobustOrder() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    // Guardar datos del pedido en localStorage
    const orderId = generateOrderId();
    const orderData = {
        orderId: orderId,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customizations: cart.length > 0 ? cart[0].customizations : {}
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Redirigir directamente a la página de confirmación
    window.location.href = 'order-confirmation.html';
}

function sendEmailOrder(orderId) {
    // Guardar datos del pedido en localStorage
    const orderData = {
        orderId: orderId,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customizations: cart.length > 0 ? cart[0].customizations : {}
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Redirigir a la página de confirmación
    window.location.href = 'order-confirmation.html';
}

function sendWhatsAppOrder(orderId) {
    // Guardar datos del pedido en localStorage
    const orderData = {
        orderId: orderId,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customizations: cart.length > 0 ? cart[0].customizations : {}
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Redirigir a la página de confirmación
    window.location.href = 'order-confirmation.html';
}

// Funciones auxiliares
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function generateOrderId() {
    return 'ORD-' + Date.now().toString().slice(-6);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Detectar tipo de demo y abrir modal correspondiente
function openProductModal(productId) {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'demo-robusta.html') {
        openRobustProductModal(productId);
    } else {
        openBasicProductModal(productId);
    }
}

// Modal de producto básico (renombrado para evitar conflicto)
function openBasicProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="product-modal">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-modal-info">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price.toLocaleString('es-CL')}</p>
                    <p class="description">${product.description}</p>
                    <div class="product-details">
                        <p><strong>Stock disponible:</strong> ${inventory[product.id]} unidades</p>
                        <p><strong>Material:</strong> Alta calidad</p>
                        <p><strong>Personalización:</strong> Sublimación digital</p>
                    </div>
                    <div class="customization-section">
                        <h3>Personalizar Producto</h3>
                        
                        <div class="customization-option">
                            <label>Color del producto:</label>
                            <input type="color" id="product-color" value="#ffffff" onchange="updatePreview()">
                        </div>
                        
                        <div class="customization-option">
                            <label>Texto personalizado:</label>
                            <input type="text" id="custom-text" placeholder="Tu texto aquí" oninput="updatePreview()">
                        </div>
                        
                        <div class="customization-option">
                            <label>Fuente:</label>
                            <select id="font-family" onchange="updatePreview()">
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                        
                        <div class="customization-option">
                            <label>Subir imagen:</label>
                            <input type="file" id="custom-image" accept="image/*" onchange="handleImageUpload(event)">
                        </div>
                    </div>
                    
                    <div class="quantity-selector">
                        <label>Cantidad:</label>
                        <input type="number" id="quantity-${product.id}" value="1" min="1" max="${inventory[product.id]}">
                    </div>
                    <button class="btn btn-primary" onclick="addToBasicOrder(${product.id})">Agregar al pedido</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Mostrar el modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}
