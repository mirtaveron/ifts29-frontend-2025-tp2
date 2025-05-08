// =============================
// VALIDACIÓN DE FORMULARIO
// =============================

const formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  let valido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (nombre === "") {
    document.getElementById("error-nombre").textContent =
      "El campo nombre es obligatorio.";
    valido = false;
  }

  if (apellido === "") {
    document.getElementById("error-apellido").textContent =
      "El campo apellido es obligatorio.";
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("error-email").textContent =
      "El campo email es obligatorio.";
    valido = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("error-email").textContent =
      "El email no es válido.";
    valido = false;
  }

  const telefonoRegex = /^[0-9\s\-()+]+$/;
  if (telefono === "" || !telefonoRegex.test(telefono)) {
    document.getElementById("error-telefono").textContent =
      "El teléfono no es válido.";
    valido = false;
  }

  if (valido) {
    modal.classList.remove("oculto");
    formulario.reset();
  }
});

cerrarModal.addEventListener("click", () => {
  modal.classList.add("oculto");
});

// =============================
// MODO OSCURO/CLARO
// =============================

const botonModo = document.getElementById("toggleModo");
const cuerpo = document.body;

const modoGuardado = localStorage.getItem("modo");
if (modoGuardado === "oscuro") {
  cuerpo.classList.add("modo-oscuro");
}

botonModo.addEventListener("click", () => {
  cuerpo.classList.toggle("modo-oscuro");

  if (cuerpo.classList.contains("modo-oscuro")) {
    localStorage.setItem("modo", "oscuro");
    botonModo.textContent = "☀️ Modo claro";
  } else {
    localStorage.setItem("modo", "claro");
    botonModo.textContent = "🌙 Modo oscuro";
  }
});

botonModo.textContent = cuerpo.classList.contains("modo-oscuro")
  ? "☀️ Modo claro"
  : "🌙 Modo oscuro";

// =============================
// OCULTAR SECCIONES//
// =============================

const botones = document.querySelectorAll(".btn-ocultar");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const idContenido = boton.getAttribute("data-target");
    const contenido = document.getElementById(idContenido);

    if (contenido.classList.contains("oculto")) {
      contenido.classList.remove("oculto");
    } else {
      contenido.classList.add("oculto");
    }

    boton.textContent = contenido.classList.contains("oculto")
      ? "Mostrar"
      : "Ocultar";
  });
});

// =============================
// GALERÍA DE IMÁGENES
// =============================

document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.querySelectorAll(".carousel img");
  const thumbnails = document.querySelectorAll(".thumbnails img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let filteredImages = Array.from(carouselImages);

  showImage(currentIndex);

  prevButton.addEventListener("click", function () {
    if (filteredImages.length === 0) return;
    currentIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    showImage(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    if (filteredImages.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredImages.length;
    showImage(currentIndex);
  });

  thumbnails.forEach(function (thumbnail, index) {
    thumbnail.addEventListener("click", function () {
      const mainImage = carouselImages[index];
      const filteredIndex = filteredImages.indexOf(mainImage);

      if (filteredIndex !== -1) {
        currentIndex = filteredIndex;
        showImage(currentIndex);
      }
    });
  });

  document.querySelectorAll(".filters button").forEach(function (button) {
    button.addEventListener("click", function () {
      let category;
      if (this.hasAttribute("data-filter")) {
        category = this.getAttribute("data-filter");
      } else {
        const buttonText = this.textContent.trim().toLowerCase();
        category = buttonText === "todos" ? "all" : buttonText;
      }

      filterGallery(category);
    });
  });

  function showImage(index) {
    carouselImages.forEach(function (img) {
      img.classList.remove("active");
    });

    if (filteredImages.length > 0) {
      filteredImages[index].classList.add("active");
    }
  }

  function filterGallery(category) {
    filteredImages = Array.from(carouselImages).filter(function (img) {
      const imgCategory = img.getAttribute("data-category");
      return (
        category === "all" || category === "todos" || imgCategory === category
      );
    });

    thumbnails.forEach(function (thumb, index) {
      const imgCategory = carouselImages[index].getAttribute("data-category");
      const isVisible =
        category === "all" || category === "todos" || imgCategory === category;
      thumb.style.display = isVisible ? "inline-block" : "none";
    });
    
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach((btn) => {
      const isActive =
        btn.textContent.toLowerCase() === category.toLowerCase() ||
        (category === "all" && btn.textContent.toLowerCase() === "todos");
      btn.classList.toggle("active-filter", isActive);
    });

    currentIndex = filteredImages.length > 0 ? 0 : -1;
    showImage(currentIndex);
  }
});

// =============================
// CONTENIDO DINÁMICO
// =============================

document.addEventListener("DOMContentLoaded", () => {
  // === Proyectos ===
  const contenedorProyectos = document.getElementById(
    "contenido-mis-proyectos"
  );
  contenedorProyectos.innerHTML = "";
  proyectos.forEach((p) => {
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
  habilidades.forEach((h) => {
    listaHabilidades.innerHTML += `<li>${h}</li>`;
  });

  // === Películas favoritas ===
  const contenedorPeliculas = document.getElementById("contenido-peliculas");
  contenedorPeliculas.innerHTML = "";
  peliculas.forEach((p) => {
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
// =============================

const entregaDate = new Date("2025-05-09 23:59:59");

function actualizarTemporizador() {
  const ahora = new Date();
  const tiempoRestante = entregaDate - ahora;

  if (tiempoRestante < 0) {
    document.getElementById("timer").textContent = "Entrega: 00:00:00";
    return;
  }

  const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent = `Entrega: ${horas
    .toString()
    .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos
    .toString()
    .padStart(2, "0")}`;
}

setInterval(actualizarTemporizador, 1000);

// =============================
// CONTADOR DE VISITAS
// =============================

function getVisitCount() {
  let visitCount = localStorage.getItem("visitCount");
  if (!visitCount) {
    visitCount = 0;
  }
  return parseInt(visitCount);
}

function updateVisitCount() {
  const visitCount = getVisitCount();
  document.getElementById("visit-count").textContent = visitCount;
}

function incrementVisitCount() {
  let visitCount = getVisitCount();
  visitCount++;
  localStorage.setItem("visitCount", visitCount);
  updateVisitCount();
}

window.addEventListener("load", incrementVisitCount);

// =============================
// ANIMACIONES DINÁMICAS
// =============================

function bounceIn(element) {
  element.style.animation = "bounceIn 1s ease";
  element.addEventListener("animationend", () => {
    element.style.animation = "";
  });
}

const botonesOcultar = document.querySelectorAll(".btn-ocultar");
botonesOcultar.forEach((boton) => {
  boton.addEventListener("click", () => {
    bounceIn(boton);
  });
});
