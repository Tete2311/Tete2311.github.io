// Datos de propiedades de ejemplo
const propiedades = [
  {
    id: 1,
    titulo: "Casa Moderna en Centro",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Centro",
    precio: 250000,
    habitaciones: 3,
    banos: 2,
    metros: 150,
    imagen: "🏠"
  },
  {
    id: 2,
    titulo: "Departamento con Vista",
    tipo: "departamento",
    operacion: "alquiler",
    ubicacion: "Norte",
    precio: 800,
    habitaciones: 2,
    banos: 1,
    metros: 85,
    imagen: "🏢"
  },
  {
    id: 3,
    titulo: "Terreno en Zona Residencial",
    tipo: "terreno",
    operacion: "venta",
    ubicacion: "Sur",
    precio: 120000,
    habitaciones: 0,
    banos: 0,
    metros: 500,
    imagen: "🏗️"
  },
  {
    id: 4,
    titulo: "Local Comercial",
    tipo: "local",
    operacion: "alquiler",
    ubicacion: "Centro",
    precio: 1500,
    habitaciones: 0,
    banos: 1,
    metros: 120,
    imagen: "🏪"
  },
  {
    id: 5,
    titulo: "Casa con Piscina",
    tipo: "casa",
    operacion: "venta",
    ubicacion: "Norte",
    precio: 450000,
    habitaciones: 4,
    banos: 3,
    metros: 280,
    imagen: "🏡"
  },
  {
    id: 6,
    titulo: "Departamento Estudio",
    tipo: "departamento",
    operacion: "venta",
    ubicacion: "Centro",
    precio: 95000,
    habitaciones: 1,
    banos: 1,
    metros: 45,
    imagen: "🏠"
  }
];

// Elementos del DOM
const propertiesGrid = document.getElementById('propertiesGrid');
const searchForm = document.getElementById('searchForm');
const modalConsulta = document.getElementById('modalConsulta');
const modalExito = document.getElementById('modalExito');
const modalClose = document.getElementById('modalClose');
const modalExitoClose = document.getElementById('modalExitoClose');
const contactForm = document.getElementById('contactForm');
const btnCerrarExito = document.getElementById('btnCerrarExito');
const propiedadIdInput = document.getElementById('propiedadId');

// Renderizar propiedades
function renderProperties(properties) {
  propertiesGrid.innerHTML = '';
  
  if (properties.length === 0) {
    propertiesGrid.innerHTML = `
      <div class="no-results">
        <p>No se encontraron propiedades con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }
  
  properties.forEach(prop => {
    const card = document.createElement('article');
    card.className = 'property-card';
    card.innerHTML = `
      <div class="property-image">
        <span class="property-badge">${prop.operacion === 'venta' ? 'Venta' : 'Alquiler'}</span>
        <span>${prop.imagen}</span>
      </div>
      <div class="property-content">
        <h3 class="property-title">${prop.titulo}</h3>
        <p class="property-location">
          <span>📍</span> ${prop.ubicacion}
        </p>
        <p class="property-price">
          ${prop.operacion === 'venta' ? '$' + prop.precio.toLocaleString() : '$' + prop.precio + '/mes'}
        </p>
        <div class="property-features">
          <span class="property-feature">🛏️ ${prop.habitaciones} hab</span>
          <span class="property-feature">🚿 ${prop.banos} baños</span>
          <span class="property-feature">📐 ${prop.metros} m²</span>
        </div>
        <div class="property-actions">
          <button class="btn btn-primary" onclick="abrirModalConsulta(${prop.id})">Consultar</button>
        </div>
      </div>
    `;
    propertiesGrid.appendChild(card);
  });
}

// Filtrar propiedades
function filterProperties(e) {
  e.preventDefault();
  
  const tipo = document.getElementById('tipo').value;
  const operacion = document.getElementById('operacion').value;
  const ubicacion = document.getElementById('ubicacion').value.toLowerCase();
  const precioMin = parseInt(document.getElementById('precio-min').value) || 0;
  const precioMax = parseInt(document.getElementById('precio-max').value) || Infinity;
  
  const filtered = propiedades.filter(prop => {
    if (tipo && prop.tipo !== tipo) return false;
    if (operacion && prop.operacion !== operacion) return false;
    if (ubicacion && !prop.ubicacion.toLowerCase().includes(ubicacion)) return false;
    if (prop.precio < precioMin || prop.precio > precioMax) return false;
    return true;
  });
  
  renderProperties(filtered);
  
  // Scroll a resultados
  document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
}

// Abrir modal de consulta
function abrirModalConsulta(propiedadId) {
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (propiedad) {
    propiedadIdInput.value = propiedadId;
    document.getElementById('mensaje').value = `Hola, estoy interesado en la propiedad: ${propiedad.titulo} (${propiedad.operacion === 'venta' ? '$' + propiedad.precio.toLocaleString() : '$' + propiedad.precio + '/mes'})`;
    modalConsulta.classList.add('active');
  }
}

// Cerrar modal de consulta
function cerrarModalConsulta() {
  modalConsulta.classList.remove('active');
  contactForm.reset();
}

// Cerrar modal de éxito
function cerrarModalExito() {
  modalExito.classList.remove('active');
}

// Manejar envío del formulario de contacto
function handleContactSubmit(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;
  const propiedadId = propiedadIdInput.value;
  
  const propiedad = propiedades.find(p => p.id === parseInt(propiedadId));
  
  // Construir mensaje de WhatsApp
  const whatsappMessage = encodeURIComponent(
    `¡Nueva consulta desde Eterial Inmobiliaria!\n\n` +
    `👤 Nombre: ${nombre}\n` +
    `📱 Teléfono: ${telefono}\n` +
    `📧 Email: ${email}\n\n` +
    `🏠 Propiedad: ${propiedad ? propiedad.titulo : 'N/A'}\n` +
    `💬 Mensaje: ${mensaje}`
  );
  
  // Simular derivación a WhatsApp
  console.log('Mensaje de WhatsApp:', whatsappMessage);
  
  // Cerrar modal de consulta y mostrar modal de éxito
  cerrarModalConsulta();
  modalExito.classList.add('active');
}

// Event listeners
searchForm.addEventListener('submit', filterProperties);
modalClose.addEventListener('click', cerrarModalConsulta);
modalExitoClose.addEventListener('click', cerrarModalExito);
btnCerrarExito.addEventListener('click', cerrarModalExito);
contactForm.addEventListener('submit', handleContactSubmit);

// Cerrar modales al hacer clic fuera
modalConsulta.addEventListener('click', (e) => {
  if (e.target === modalConsulta) cerrarModalConsulta();
});

modalExito.addEventListener('click', (e) => {
  if (e.target === modalExito) cerrarModalExito();
});

// Cerrar modales con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalConsulta();
    cerrarModalExito();
  }
});

// Renderizar propiedades al cargar
document.addEventListener('DOMContentLoaded', () => {
  renderProperties(propiedades);
});

// Hacer función global para onclick en HTML
window.abrirModalConsulta = abrirModalConsulta;
