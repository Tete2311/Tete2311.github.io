// ===================== DATOS DE PROPIEDADES PREMIUM =====================
const propiedades = [
  {
    id: 1,
    titulo: "Penthouse de Lujo en Puerto Madero",
    tipo: "penthouse",
    operacion: "venta",
    ubicacion: "Puerto Madero, Buenos Aires",
    precio: 1850000,
    habitaciones: 4,
    banos: 4,
    metros: 320,
    garaje: 3,
    caracteristicas: ["piscina", "gimnasio", "seguridad"],
    destacado: true,
    imagen: "🏢",
    descripcion: "Exclusivo penthouse con vista panorámica al Río de la Plata. Acabados de primera calidad, piscina privada en la terraza y acceso a amenities premium."
  },
  {
    id: 2,
    titulo: "Chalet Colonial en San Isidro",
    tipo: "chalet",
    operacion: "venta",
    ubicacion: "San Isidro, Buenos Aires",
    precio: 980000,
    habitaciones: 5,
    banos: 4,
    metros: 450,
    garaje: 2,
    caracteristicas: ["jardin", "piscina", "seguridad"],
    destacado: true,
    imagen: "🏡",
    descripcion: "Impresionante chalet estilo colonial en barrio cerrado. Jardín maduro, piscina con cascada y sistema de seguridad 24 horas."
  },
  {
    id: 3,
    titulo: "Departamento Moderno en Palermo",
    tipo: "departamento",
    operacion: "alquiler",
    ubicacion: "Palermo Soho, Buenos Aires",
    precio: 2500,
    habitaciones: 2,
    banos: 2,
    metros: 95,
    garaje: 1,
    caracteristicas: ["gimnasio", "seguridad"],
    destacado: false,
    imagen: "🏢",
    descripcion: "Departamento de diseño en el corazón de Palermo. Balcón con vista, cocina integrada y acceso a gimnasio del edificio."
  },
  {
    id: 4,
    titulo: "Casa de Campo en Pilar",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Pilar, Buenos Aires",
    precio: 650000,
    habitaciones: 4,
    banos: 3,
    metros: 280,
    garaje: 2,
    caracteristicas: ["jardin", "piscina"],
    destacado: false,
    imagen: "🏠",
    descripcion: "Hermosa casa de campo en country club. Piscina, quincho y amplio jardín. Ideal para familias."
  },
  {
    id: 5,
    titulo: "Loft Industrial en Recoleta",
    tipo: "departamento",
    operacion: "venta",
    ubicacion: "Recoleta, Buenos Aires",
    precio: 420000,
    habitaciones: 1,
    banos: 1,
    metros: 75,
    garaje: 1,
    caracteristicas: ["seguridad"],
    destacado: false,
    imagen: "🏢",
    descripcion: "Loft estilo industrial con techos altos. Diseño minimalista en zona premium de Recoleta."
  },
  {
    id: 6,
    titulo: "Terreno en Nordelta",
    tipo: "terreno",
    operacion: "venta",
    ubicacion: "Nordelta, Buenos Aires",
    precio: 180000,
    habitaciones: 0,
    banos: 0,
    metros: 600,
    garaje: 0,
    caracteristicas: ["seguridad"],
    destacado: false,
    imagen: "🏗️",
    descripcion: "Terreno llano en lote privilegiado de Nordelta. Listo para construir con todos los servicios."
  },
  {
    id: 7,
    titulo: "Oficina Corporativa en Microcentro",
    tipo: "oficina",
    operacion: "alquiler",
    ubicacion: "Microcentro, Buenos Aires",
    precio: 4500,
    habitaciones: 0,
    banos: 2,
    metros: 150,
    garaje: 0,
    caracteristicas: ["seguridad"],
    destacado: false,
    imagen: "🏢",
    descripcion: "Oficina premium en edificio corporativo. Infraestructura completa y seguridad 24 horas."
  },
  {
    id: 8,
    titulo: "Local Comercial en Belgrano",
    tipo: "local",
    operacion: "venta",
    ubicacion: "Belgrano, Buenos Aires",
    precio: 380000,
    habitaciones: 0,
    banos: 1,
    metros: 120,
    garaje: 0,
    caracteristicas: ["seguridad"],
    destacado: false,
    imagen: "🏪",
    descripcion: "Local comercial en zona de alto tránsito. Vidriera frontal y excelente visibilidad."
  },
  {
    id: 9,
    titulo: "Duplex en Vicente López",
    tipo: "departamento",
    operacion: "venta",
    ubicacion: "Vicente López, Buenos Aires",
    precio: 520000,
    habitaciones: 3,
    banos: 2,
    metros: 140,
    garaje: 2,
    caracteristicas: ["jardin", "seguridad"],
    destacado: true,
    imagen: "🏢",
    descripcion: "Elegante duplex en zona residencial. Jardín privado y cochera doble. Excelente estado."
  },
  {
    id: 10,
    titulo: "Casa de Lujo en Tigre",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Tigre, Buenos Aires",
    precio: 1200000,
    habitaciones: 6,
    banos: 5,
    metros: 550,
    garaje: 4,
    caracteristicas: ["jardin", "piscina", "gimnasio", "seguridad"],
    destacado: true,
    imagen: "🏡",
    descripcion: "Mansión de lujo frente al río. Muelle privado, piscina olímpica y amenities de resort."
  },
  {
    id: 11,
    titulo: "Estudio en Belgrano",
    tipo: "departamento",
    operacion: "alquiler",
    ubicacion: "Belgrano C, Buenos Aires",
    precio: 850,
    habitaciones: 1,
    banos: 1,
    metros: 45,
    garaje: 0,
    caracteristicas: [],
    destacado: false,
    imagen: "🏢",
    descripcion: "Estudio luminoso y moderno. Ideal para jóvenes profesionales o inversión."
  },
  {
    id: 12,
    titulo: "Terreno en Costa Esmeralda",
    tipo: "terreno",
    operacion: "venta",
    ubicacion: "Costa Esmeralda, Buenos Aires",
    precio: 95000,
    habitaciones: 0,
    banos: 0,
    metros: 400,
    garaje: 0,
    caracteristicas: ["seguridad"],
    destacado: false,
    imagen: "🏗️",
    descripcion: "Terreno en country club en desarrollo. Oportunidad de inversión con gran potencial."
  }
];

// ===================== ELEMENTOS DEL DOM =====================
const propertiesGrid = document.getElementById('propertiesGrid');
const searchForm = document.getElementById('searchForm');
const resultsCount = document.getElementById('resultsCount');
const sortBy = document.getElementById('sortBy');
const searchTabs = document.querySelectorAll('.search-tab');
const advancedToggle = document.querySelector('.btn-advanced-toggle');
const advancedFilters = document.querySelector('.advanced-filters');
const viewBtns = document.querySelectorAll('.view-btn');

// Modales
const propertyModal = document.getElementById('propertyModal');
const propertyModalClose = document.getElementById('propertyModalClose');
const propertyDetail = document.getElementById('propertyDetail');
const inquiryModal = document.getElementById('inquiryModal');
const inquiryModalClose = document.getElementById('inquiryModalClose');
const inquiryForm = document.getElementById('inquiryForm');
const successModal = document.getElementById('successModal');
const successModalClose = document.getElementById('successModalClose');
const successModalBtn = document.getElementById('successModalBtn');

// ===================== ESTADO =====================
let currentTab = 'comprar';
let currentView = 'grid';
let filteredProperties = [...propiedades];

// ===================== FUNCIONES DE RENDERIZADO =====================
function renderProperties(properties) {
  propertiesGrid.innerHTML = '';
  
  if (properties.length === 0) {
    propertiesGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.5rem; color: var(--primary); margin-bottom: 12px;">No se encontraron propiedades</h3>
        <p style="color: var(--text-light);">Intenta ajustar los filtros de búsqueda para ver más resultados.</p>
      </div>
    `;
    resultsCount.textContent = '0';
    return;
  }
  
  resultsCount.textContent = properties.length;
  
  properties.forEach(prop => {
    const card = document.createElement('article');
    card.className = 'property-card';
    card.innerHTML = `
      <div class="property-image">
        ${prop.destacado ? '<span class="property-featured"><i class="fas fa-star"></i> Destacado</span>' : ''}
        <span class="property-badge">${prop.operacion === 'venta' ? 'Venta' : 'Alquiler'}</span>
        <span class="property-icon">${prop.imagen}</span>
      </div>
      <div class="property-content">
        <p class="property-price">
          ${prop.operacion === 'venta' ? '$' + prop.precio.toLocaleString('es-AR') : '$' + prop.precio.toLocaleString('es-AR') + '/mes'}
        </p>
        <h3 class="property-title">${prop.titulo}</h3>
        <p class="property-location">
          <i class="fas fa-map-marker-alt"></i> ${prop.ubicacion}
        </p>
        <div class="property-features">
          <span class="property-feature"><i class="fas fa-bed"></i> ${prop.habitaciones} hab</span>
          <span class="property-feature"><i class="fas fa-bath"></i> ${prop.banos} baños</span>
          <span class="property-feature"><i class="fas fa-ruler-combined"></i> ${prop.metros} m²</span>
          ${prop.garaje > 0 ? `<span class="property-feature"><i class="fas fa-car"></i> ${prop.garaje} cochera${prop.garaje > 1 ? 's' : ''}</span>` : ''}
        </div>
        <div class="property-actions">
          <button class="btn btn-primary" onclick="openPropertyDetail(${prop.id})">
            <i class="fas fa-eye"></i>
            <span>Ver Detalles</span>
          </button>
          <button class="btn btn-secondary" onclick="openInquiryModal(${prop.id})">
            <i class="fas fa-envelope"></i>
            <span>Consultar</span>
          </button>
        </div>
      </div>
    `;
    propertiesGrid.appendChild(card);
  });
}

function openPropertyDetail(propiedadId) {
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (!propiedad) return;
  
  propertyDetail.innerHTML = `
    <div class="property-detail-content">
      <div class="property-detail-image">
        <div class="property-image-large">
          <span class="property-badge">${propiedad.operacion === 'venta' ? 'Venta' : 'Alquiler'}</span>
          <span class="property-icon" style="font-size: 8rem;">${propiedad.imagen}</span>
        </div>
      </div>
      <div class="property-detail-info">
        <div class="property-detail-header">
          <p class="property-price-large">
            ${propiedad.operacion === 'venta' ? '$' + propiedad.precio.toLocaleString('es-AR') : '$' + propiedad.precio.toLocaleString('es-AR') + '/mes'}
          </p>
          <h2 class="property-title-large">${propiedad.titulo}</h2>
          <p class="property-location-large">
            <i class="fas fa-map-marker-alt"></i> ${propiedad.ubicacion}
          </p>
        </div>
        
        <div class="property-detail-features">
          <div class="feature-item">
            <i class="fas fa-bed"></i>
            <div>
              <span class="feature-value">${propiedad.habitaciones}</span>
              <span class="feature-label">Habitaciones</span>
            </div>
          </div>
          <div class="feature-item">
            <i class="fas fa-bath"></i>
            <div>
              <span class="feature-value">${propiedad.banos}</span>
              <span class="feature-label">Baños</span>
            </div>
          </div>
          <div class="feature-item">
            <i class="fas fa-ruler-combined"></i>
            <div>
              <span class="feature-value">${propiedad.metros}</span>
              <span class="feature-label">Metros²</span>
            </div>
          </div>
          ${propiedad.garaje > 0 ? `
          <div class="feature-item">
            <i class="fas fa-car"></i>
            <div>
              <span class="feature-value">${propiedad.garaje}</span>
              <span class="feature-label">Cochera${propiedad.garaje > 1 ? 's' : ''}</span>
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="property-detail-description">
          <h3>Descripción</h3>
          <p>${propiedad.descripcion}</p>
        </div>
        
        ${propiedad.caracteristicas.length > 0 ? `
        <div class="property-detail-amenities">
          <h3>Características</h3>
          <div class="amenities-grid">
            ${propiedad.caracteristicas.map(carac => {
              const icons = {
                piscina: 'fa-swimming-pool',
                jardin: 'fa-tree',
                gimnasio: 'fa-dumbbell',
                seguridad: 'fa-shield-alt'
              };
              const labels = {
                piscina: 'Piscina',
                jardin: 'Jardín',
                gimnasio: 'Gimnasio',
                seguridad: 'Seguridad 24h'
              };
              return `
                <div class="amenity-item">
                  <i class="fas ${icons[carac]}"></i>
                  <span>${labels[carac]}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="property-detail-actions">
          <button class="btn btn-primary btn-full" onclick="openInquiryModal(${propiedad.id})">
            <i class="fab fa-whatsapp"></i>
            <span>Consultar por WhatsApp</span>
          </button>
          <button class="btn btn-secondary btn-full">
            <i class="fas fa-calendar-alt"></i>
            <span>Agendar Visita</span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  propertyModal.classList.add('active');
}

function openInquiryModal(propiedadId) {
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (!propiedad) return;
  
  document.getElementById('inquiryPropertyId').value = propiedadId;
  document.getElementById('inquiryMessage').value = `Hola, estoy interesado en la propiedad: ${propiedad.titulo} (${propiedad.operacion === 'venta' ? '$' + propiedad.precio.toLocaleString('es-AR') : '$' + propiedad.precio.toLocaleString('es-AR') + '/mes'})`;
  
  propertyModal.classList.remove('active');
  inquiryModal.classList.add('active');
}

// ===================== FUNCIONES DE FILTRADO =====================
function filterProperties(e) {
  if (e) e.preventDefault();
  
  const ubicacion = document.getElementById('ubicacion').value.toLowerCase();
  const tipo = document.getElementById('tipo').value;
  const habitaciones = document.getElementById('habitaciones').value;
  const precioMax = document.getElementById('precio-max').value;
  const banos = document.getElementById('banos').value;
  const metrosMin = document.getElementById('metros-min').value;
  const garaje = document.getElementById('garaje').value;
  const caracteristicas = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
  
  filteredProperties = propiedades.filter(prop => {
    // Filtrar por operación según la tab activa
    if (currentTab === 'comprar' && prop.operacion !== 'venta') return false;
    if (currentTab === 'alquilar' && prop.operacion !== 'alquiler') return false;
    
    // Filtros básicos
    if (ubicacion && !prop.ubicacion.toLowerCase().includes(ubicacion)) return false;
    if (tipo && prop.tipo !== tipo) return false;
    if (habitaciones && prop.habitaciones < parseInt(habitaciones)) return false;
    if (precioMax && prop.precio > parseInt(precioMax)) return false;
    if (banos && prop.banos < parseInt(banos)) return false;
    if (metrosMin && prop.metros < parseInt(metrosMin)) return false;
    if (garaje && prop.garaje < parseInt(garaje)) return false;
    
    // Filtros de características
    if (caracteristicas.length > 0) {
      const hasAllCharacteristics = caracteristicas.every(carac => prop.caracteristicas.includes(carac));
      if (!hasAllCharacteristics) return false;
    }
    
    return true;
  });
  
  sortProperties();
  renderProperties(filteredProperties);
  
  // Scroll a resultados
  document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
}

function sortProperties() {
  const sortValue = sortBy.value;
  
  switch (sortValue) {
    case 'price-asc':
      filteredProperties.sort((a, b) => a.precio - b.precio);
      break;
    case 'price-desc':
      filteredProperties.sort((a, b) => b.precio - a.precio);
      break;
    case 'newest':
      filteredProperties.sort((a, b) => b.id - a.id);
      break;
    case 'size':
      filteredProperties.sort((a, b) => b.metros - a.metros);
      break;
    case 'featured':
    default:
      filteredProperties.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
      break;
  }
}

// ===================== EVENT LISTENERS =====================
searchForm.addEventListener('submit', filterProperties);
sortBy.addEventListener('change', () => {
  sortProperties();
  renderProperties(filteredProperties);
});

// Tabs de búsqueda
searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    filterProperties();
  });
});

// Toggle de filtros avanzados
advancedToggle.addEventListener('click', () => {
  advancedFilters.classList.toggle('active');
  advancedToggle.querySelector('i').classList.toggle('fa-chevron-up');
  advancedToggle.querySelector('i').classList.toggle('fa-sliders-h');
});

// View options (grid/list)
viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    
    if (currentView === 'list') {
      propertiesGrid.style.gridTemplateColumns = '1fr';
    } else {
      propertiesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(380px, 1fr))';
    }
  });
});

// Cerrar modales
propertyModalClose.addEventListener('click', () => propertyModal.classList.remove('active'));
inquiryModalClose.addEventListener('click', () => inquiryModal.classList.remove('active'));
successModalClose.addEventListener('click', () => successModal.classList.remove('active'));
successModalBtn.addEventListener('click', () => successModal.classList.remove('active'));

// Cerrar modales al hacer clic fuera
propertyModal.addEventListener('click', (e) => {
  if (e.target === propertyModal) propertyModal.classList.remove('active');
});
inquiryModal.addEventListener('click', (e) => {
  if (e.target === inquiryModal) inquiryModal.classList.remove('active');
});
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) successModal.classList.remove('active');
});

// Cerrar modales con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    propertyModal.classList.remove('active');
    inquiryModal.classList.remove('active');
    successModal.classList.remove('active');
  }
});

// Formulario de consulta
inquiryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('inquiryName').value;
  const telefono = document.getElementById('inquiryPhone').value;
  const email = document.getElementById('inquiryEmail').value;
  const mensaje = document.getElementById('inquiryMessage').value;
  const propiedadId = document.getElementById('inquiryPropertyId').value;
  
  const propiedad = propiedades.find(p => p.id === parseInt(propiedadId));
  
  // Construir mensaje de WhatsApp
  const whatsappMessage = encodeURIComponent(
    `¡Nueva consulta desde LuxeEstate!\n\n` +
    `👤 Nombre: ${nombre}\n` +
    `📱 Teléfono: ${telefono}\n` +
    `📧 Email: ${email}\n\n` +
    `🏠 Propiedad: ${propiedad ? propiedad.titulo : 'N/A'}\n` +
    `💰 Precio: ${propiedad ? (propiedad.operacion === 'venta' ? '$' + propiedad.precio.toLocaleString('es-AR') : '$' + propiedad.precio.toLocaleString('es-AR') + '/mes') : 'N/A'}\n\n` +
    `💬 Mensaje: ${mensaje}`
  );
  
  // Simular derivación a WhatsApp
  console.log('Mensaje de WhatsApp:', whatsappMessage);
  // En producción: window.open(`https://wa.me/5493364208556?text=${whatsappMessage}`, '_blank');
  
  inquiryForm.reset();
  inquiryModal.classList.remove('active');
  successModal.classList.add('active');
});

// Formulario de contacto principal
const mainContactForm = document.getElementById('mainContactForm');
if (mainContactForm) {
  mainContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    mainContactForm.reset();
  });
}

// ===================== INICIALIZACIÓN =====================
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar propiedades iniciales (solo ventas por defecto)
  filteredProperties = propiedades.filter(prop => prop.operacion === 'venta');
  sortProperties();
  renderProperties(filteredProperties);
  
  // Hacer funciones globales
  window.openPropertyDetail = openPropertyDetail;
  window.openInquiryModal = openInquiryModal;
});
