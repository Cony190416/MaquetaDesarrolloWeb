// ===== CONFIGURACIÓN DEL PROYECTO =====
// Versión: 1.1 - Actualizado para Netlify
// Modifica estos valores según tus necesidades

const CONFIG = {
    // Información de contacto
    contact: {
        whatsapp: "+56955368332", // Número de WhatsApp (formato internacional)
        email: "contacto@tuempresa.cl",
        phone: "+56 9 5536 8332"
    },

    // Información de la empresa
    company: {
        name: "Tu Empresa de Productos Personalizados",
        description: "Especialistas en sublimación y productos personalizados",
        address: "Santiago, Chile",
        website: "www.tuempresa.cl"
    },

    // Precios de las propuestas (en CLP)
    prices: {
        basic: {
            base: 100000,
            hosting: 20000,
            domain: 9990
        },
        robust: {
            base: 650000,
            hosting: 20000,
            domain: 9990,
            messaging: 30000
        }
    },

    // Configuración de productos
    products: {
        maxQuantity: 10, // Cantidad máxima por producto
        currency: "CLP",
        currencySymbol: "$"
    },

    // Configuración de la demo
    demo: {
        enableNotifications: true,
        notificationDuration: 3000, // milisegundos
        autoGenerateOrderId: true
    },

    // Colores personalizables (opcional)
    colors: {
        primary: "#6366f1",
        secondary: "#10b981",
        accent: "#f59e0b",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444"
    },

    // Configuración de WhatsApp
    whatsapp: {
        enabled: true,
        messageTemplate: "Hola, mi número de pedido es {orderId} y quiero estos productos:\n\n{products}\n\nTotal: {total}\n\n¿Podrían confirmarme la disponibilidad y el tiempo de entrega?",
        autoOpen: true
    },

    // Configuración de email (para demo robusta)
    email: {
        enabled: true,
        subject: "Nuevo pedido recibido - {orderId}",
        template: `Nuevo pedido recibido:

Número de pedido: {orderId}
Fecha: {date}

Productos:
{products}

Total: {total}

El cliente será contactado para confirmar detalles de entrega.`
    }
};

// ===== FUNCIONES DE CONFIGURACIÓN =====

// Función para obtener precio formateado
function getFormattedPrice(price) {
    return new Intl.NumberFormat('es-CL').format(price);
}

// Función para generar ID de pedido
function generateOrderId() {
    if (CONFIG.demo.autoGenerateOrderId) {
        return 'ORD-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substr(2, 3).toUpperCase();
    }
    return 'ORD-' + Date.now().toString().slice(-6);
}

// Función para obtener mensaje de WhatsApp
function getWhatsAppMessage(orderId, products, total) {
    let message = CONFIG.whatsapp.messageTemplate;
    message = message.replace('{orderId}', orderId);
    message = message.replace('{products}', products);
    message = message.replace('{total}', getFormattedPrice(total));
    return message;
}

// Función para obtener URL de WhatsApp
function getWhatsAppUrl(message) {
    return `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Función para obtener asunto de email
function getEmailSubject(orderId) {
    return CONFIG.email.subject.replace('{orderId}', orderId);
}

// Función para obtener cuerpo de email
function getEmailBody(orderId, products, total) {
    let body = CONFIG.email.template;
    body = body.replace('{orderId}', orderId);
    body = body.replace('{date}', new Date().toLocaleDateString('es-CL'));
    body = body.replace('{products}', products);
    body = body.replace('{total}', getFormattedPrice(total));
    return body;
}

// Función para mostrar notificación
function showNotification(message) {
    if (!CONFIG.demo.enableNotifications) return;
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${CONFIG.colors.success};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, CONFIG.demo.notificationDuration);
}

// ===== EXPORTACIÓN PARA USO GLOBAL =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
    window.getFormattedPrice = getFormattedPrice;
    window.generateOrderId = generateOrderId;
    window.getWhatsAppMessage = getWhatsAppMessage;
    window.getWhatsAppUrl = getWhatsAppUrl;
    window.getEmailSubject = getEmailSubject;
    window.getEmailBody = getEmailBody;
    window.showNotification = showNotification;
}
