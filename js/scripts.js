// ============================= 
// VALIDACIÓN DE FORMULARIO 
// 
// ============================= 

    const formulario = document.getElementById('formularioContacto');

    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      // Limpiar mensajes anteriores
      document.querySelectorAll('.error').forEach(el => el.textContent = '');

      let valido = true;

      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefono = document.getElementById('telefono').value.trim();

      if (nombre === '') {
        document.getElementById('error-nombre').textContent = 'El campo nombre es obligatorio.';
        valido = false;
      }

      if (apellido === '') {
        document.getElementById('error-apellido').textContent = 'El campo apellido es obligatorio.';
        valido = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        document.getElementById('error-email').textContent = 'El campo email es obligatorio.';
        valido = false;
      } else if (!emailRegex.test(email)) {
        document.getElementById('error-email').textContent = 'El email no es válido.';
        valido = false;
      }

      const telefonoRegex = /^[0-9\s\-()+]+$/;
      if (telefono === '' || !telefonoRegex.test(telefono)) {
        document.getElementById('error-telefono').textContent = 'El teléfono no es válido.';
        valido = false;
      }

      if (valido) {
      
         // Mostrar modal
  modal.classList.remove('oculto');

  // (Opcional) resetear formulario
  formulario.reset();
}});

cerrarModal.addEventListener('click', () => {
  modal.classList.add('oculto');

      //   // Enviar el formulario o mostrar mensaje de éxito
      //   alert('Formulario enviado correctamente.');
      //     formulario.submit();

        //formulario.reset(); // O formulario.submit() si querés enviarlo
      }
  
);

// ============================= 
// MODO OSCURO/CLARO 
// 
// ============================= 

    const botonModo = document.getElementById('toggleModo');
    const cuerpo = document.body;
  
    // Aplicar la preferencia guardada al cargar
    const modoGuardado = localStorage.getItem('modo');
    if (modoGuardado === 'oscuro') {
      cuerpo.classList.add('modo-oscuro');
    }
  
    // Alternar modo y guardar preferencia
    botonModo.addEventListener('click', () => {
      cuerpo.classList.toggle('modo-oscuro');
  
      if (cuerpo.classList.contains('modo-oscuro')) {
        localStorage.setItem('modo', 'oscuro');
        botonModo.textContent = '☀️ Modo claro';
      } else {
        localStorage.setItem('modo', 'claro');
        botonModo.textContent = '🌙 Modo oscuro';
      }
    });
  
    // Cambiar el texto del botón según el modo inicial
    botonModo.textContent = cuerpo.classList.contains('modo-oscuro')
      ? '☀️ Modo claro'
      : '🌙 Modo oscuro';

// ============================= 
// OCULTAR SECCIONES
// 
// =============================
const botones = document.querySelectorAll('.btn-ocultar');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const idContenido = boton.getAttribute('data-target');
    const contenido = document.getElementById(idContenido);

    // contenido.classList.toggle('oculto');
    if (contenido.classList.contains('oculto')) {
      contenido.classList.remove('oculto');
    } else {
      contenido.classList.add('oculto');
    }

    boton.textContent = contenido.classList.contains('oculto') ? 'Mostrar' : 'Ocultar';
  });
});

// ============================= 
// GALERÍA DE IMÁGENES
// 
// =============================
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const carousel = document.querySelector('.carousel');
  const carouselImages = document.querySelectorAll('.carousel img');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  
  // Current state
  let currentIndex = 0;
  let filteredImages = Array.from(carouselImages); // Initially all images
  
  // Initialize the gallery
  showImage(currentIndex);
  
  // Previous button click
  prevButton.addEventListener('click', function() {
    if (filteredImages.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    showImage(currentIndex);
  });
  
  // Next button click
  nextButton.addEventListener('click', function() {
    if (filteredImages.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredImages.length;
    showImage(currentIndex);
  });
  
  // Set up thumbnail clicks
  thumbnails.forEach(function(thumbnail, index) {
    thumbnail.addEventListener('click', function() {
      // Find the corresponding position in the filtered list
      const mainImage = carouselImages[index];
      const filteredIndex = filteredImages.indexOf(mainImage);
      
      if (filteredIndex !== -1) {
        currentIndex = filteredIndex;
        showImage(currentIndex);
      }
    });
  });
  
  // Filter buttons setup
  document.querySelectorAll('.filters button').forEach(function(button) {
    button.addEventListener('click', function() {
      // Get filter category from button text or data attribute
      let category;
      if (this.hasAttribute('data-filter')) {
        category = this.getAttribute('data-filter');
      } else {
        // Extract from button text (for backward compatibility)
        const buttonText = this.textContent.trim().toLowerCase();
        category = buttonText === 'todos' ? 'all' : buttonText;
      }
      
      filterGallery(category);
    });
  });
  
  // Show the current image
  function showImage(index) {
    // Hide all images
    carouselImages.forEach(function(img) {
      img.classList.remove('active');
    });
    
    // Show the current image if we have filtered images
    if (filteredImages.length > 0) {
      filteredImages[index].classList.add('active');
    }
  }
  
  // Filter the gallery
  function filterGallery(category) {
    // Filter images based on category
    filteredImages = Array.from(carouselImages).filter(function(img) {
      const imgCategory = img.getAttribute('data-category');
      return category === 'all' || category === 'todos' || imgCategory === category;
    });
    
    // Update thumbnails visibility
    thumbnails.forEach(function(thumb, index) {
      const imgCategory = carouselImages[index].getAttribute('data-category');
      const isVisible = category === 'all' || category === 'todos' || imgCategory === category;
      thumb.style.display = isVisible ? 'inline-block' : 'none';
    });
    
    // Resaltar botón activo
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(btn => {
    const isActive = btn.textContent.toLowerCase() === category.toLowerCase() || (category === "all" && btn.textContent.toLowerCase() === "todos");
    btn.classList.toggle("active-filter", isActive);
  });

    // Reset index and show first image (if any)
    currentIndex = filteredImages.length > 0 ? 0 : -1;
    showImage(currentIndex);
  }
});

// ============================= 
// CONTENIDO DINÁMICO
// 
// =============================


document.addEventListener("DOMContentLoaded", () => {
 // === Proyectos ===
 const contenedorProyectos = document.getElementById("contenido-mis-proyectos");
 contenedorProyectos.innerHTML = "";
 proyectos.forEach(p => {
   contenedorProyectos.innerHTML += `
     <div class="tarjeta">
       <img src="${p.imagen}" alt="${p.alt}">
       <div class="tarjeta-texto">
         <h3>${p.titulo}</h3>
         <p>${p.descripcion}</p>
       </div>
     </div>
   `;
 });

 // === Habilidades ===
 const listaHabilidades = document.getElementById("contenido-habilidades");
 listaHabilidades.innerHTML = "";
 habilidades.forEach(h => {
   listaHabilidades.innerHTML += `<li>${h}</li>`;
 });

 // === Películas favoritas ===
 const contenedorPeliculas = document.getElementById("contenido-peliculas");
 contenedorPeliculas.innerHTML = "";
 peliculas.forEach(p => {
   contenedorPeliculas.innerHTML += `
     <div class="pelicula">
       <img src="${p.imagen}" alt="${p.alt}">
       <h3>${p.titulo}</h3>
       <p>${p.descripcion}</p>
     </div>
   `;
 });
});

// ============================= 
// TEMPORIZADOR
// 
// ============================= 

// Fecha y hora de entrega (pueden ser ajustados)
const entregaDate = new Date('2025-05-09 23:59:59');

// Función para actualizar el temporizador
function actualizarTemporizador() {
  const ahora = new Date();
  const tiempoRestante = entregaDate - ahora;

  if (tiempoRestante < 0) {
    // Temporizador terminado
    document.getElementById('timer').textContent = 'Entrega: 00:00:00';
    return;
  }

  const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  document.getElementById('timer').textContent = `Entrega: ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Actualizar el temporizador cada segundo
setInterval(actualizarTemporizador, 1000);

// ============================= 
// CONTADOR DE VISITAS
// 
// ============================= 

// Función para obtener el número de visitas
function getVisitCount() {
  let visitCount = localStorage.getItem('visitCount');
  if (!visitCount) {
    visitCount = 0;
  }
  return parseInt(visitCount);
}

// Función para actualizar el contador de visitas
function updateVisitCount() {
  const visitCount = getVisitCount();
  document.getElementById('visit-count').textContent = visitCount;
}

// Incrementar el contador de visitas y guardar en localStorage
function incrementVisitCount() {
  let visitCount = getVisitCount();
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  updateVisitCount();
}

// Incrementar el contador de visitas al cargar la página
window.addEventListener('load', incrementVisitCount);

// ============================= 
// ANIMACIONES DINÁMICAS
// 
// =============================

// Función para agregar la animación de "bounceIn" a un elemento
function bounceIn(element) {
  element.style.animation = 'bounceIn 1s ease';
  element.addEventListener('animationend', () => {
    element.style.animation = '';
  });
}

// Animación para los botones "Ocultar"
const botonesOcultar = document.querySelectorAll('.btn-ocultar');
botonesOcultar.forEach(boton => {
  boton.addEventListener('click', () => {
    bounceIn(boton);
  });
});

