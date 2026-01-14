// ====================== FADE IN AO CARREGAR ======================
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.body.classList.add("site-fade-loaded");
  }, 80); // pequeno delay pra suavizar
});
 

// ALTERAÇÃO DA COR DO HEADER DO NAVEGADOR MOBILE

window.addEventListener("scroll", () => {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");

  if (window.scrollY > 10) {
    // COR DO HEADER QUANDO ROLA
    metaThemeColor.setAttribute("content", "#0D1117"); 
  } else {
    // COR DO HEADER NO TOPO
    metaThemeColor.setAttribute("content", "#db2763"); 
  }
});

// ====================== CABEÇALHO AO ROLAR ======================

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector("header img");

  if (window.scrollY > 50) {
    header.classList.add("rolagem");
    logo.src = "imagens/logotipos/logotipo-2.png";
  } else {
    header.classList.remove("rolagem");
    logo.src = "imagens/logotipos/logotipo-1.png";
  }
});


// ====================== SCROLL PORTFOLIO DESKTOP ======================

const portfolioContainer = document.querySelector(".portfolio-container");
const portfolioTituloMobile = document.querySelector(".portfolio-titulo-mobile");
const portfolioBoxes = document.querySelectorAll(".portfolio-box");

function updatePortfolio() {
  const containerCenter = portfolioContainer.scrollLeft + portfolioContainer.offsetWidth / 2;

  let closestBox = null;
  let closestDistance = Infinity;

  portfolioBoxes.forEach(box => {
    const boxCenter = box.offsetLeft + box.offsetWidth / 2;
    const distance = Math.abs(containerCenter - boxCenter);

    box.classList.remove("in-focus");

    if (distance < closestDistance) {
      closestDistance = distance;
      closestBox = box;
    }
  });

  if (closestBox) {
    closestBox.classList.add("in-focus");
    portfolioTituloMobile.style.opacity = 0;
    setTimeout(() => {
      portfolioTituloMobile.textContent = closestBox.dataset.titulo;
      portfolioTituloMobile.style.opacity = 1;
    }, 200);
  }
}

portfolioContainer.addEventListener("scroll", updatePortfolio);
updatePortfolio();


// ====================== PARTICULAS HERO ======================

particlesJS("particles-js", {
  particles: {
    number: {
      value: 120,
      density: { enable: true, value_area: 800 }
    },
    color: { value: ["#db2763"] },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true },
    size: { value: 3, random: true },
    move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" },
    line_linked: { enable: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
  },
  retina_detect: true,
  responsive: [
    {
      breakpoint: 1000,
      options: { particles: { number: { value: 150 }, move: { speed: 1 } } }
    }
  ]
});


// ====================== ANIMAÇÃO DE FADE SCROLL ======================

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('[data-animar]');

  const animarScroll = () => {
    const topoTela = window.scrollY + (window.innerHeight * 0.85);
    elementos.forEach(el => {
      if (topoTela > el.offsetTop) {
        el.classList.add('animado');
      } else {
        el.classList.remove('animado');
      }
    });
  };

  animarScroll();
  window.addEventListener('scroll', animarScroll);
});


// ====================== FORMULÁRIO DE CONTATO (EmailJS) ======================

// Inicializa o EmailJS
(function() {
  emailjs.init("S464uvoFBnzRNa7eS"); // sua Public Key
})();

document.getElementById("form-contato").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;

  // Pegar os valores dos campos
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const whatsapp = form.whatsapp.value.trim();
  const titulo = form.titulo.value.trim();
  const mensagem = form.mensagem.value.trim();

  // Validação simples
  if (!nome || !email || !whatsapp || !titulo || !mensagem) {
    alert("Por favor, preencha todos os campos antes de enviar!");
    return;
  }

  // 1️⃣ Envia o email para você
  emailjs.sendForm("service_3yy7hde", "template_qofzsot", form)
    .then(function() {
      // 2️⃣ Envia um email automático para o visitante
      return emailjs.send("service_3yy7hde", "template_3iuy4gp", {
        nome: nome,
        email: email
      });
    })
    .then(function() {
      alert("Mensagem enviada com sucesso! 🚀 Você receberá um e-mail de confirmação.");
      form.reset();
    })
    .catch(function(error) {
      alert("Ocorreu um erro ao enviar. 😕 Tente novamente mais tarde.");
      console.error("Erro:", error);
    });
});


// ====================== MENU MOBILE ======================

const btnAbrirMenuMobile = document.querySelector("#btn-menu-mobile");
const menuMobile = document.querySelector("#menu-mobile");

btnAbrirMenuMobile.addEventListener("click", () => {
  menuMobile.classList.add("abrir-menu");
});

menuMobile.addEventListener("click", () => {
  menuMobile.classList.remove("abrir-menu");
});


// ====================== PORTFOLIO SCROLL MOBILE ======================

const portContainerMobile = document.querySelector(".portfolio-container");
const portTituloMobile = document.querySelector(".portfolio-titulo-mobile");
const portBoxesMobile = document.querySelectorAll(".portfolio-box");

function updatePortfolioMobile() {
  // só roda se a tela for menor que 1000px
  if (window.innerWidth > 1000) return;

  const containerCenter = portContainerMobile.scrollLeft + portContainerMobile.offsetWidth / 2;

  let closestBox = null;
  let closestDistance = Infinity;

  portBoxesMobile.forEach(box => {
    const boxCenter = box.offsetLeft + box.offsetWidth / 2;
    const distance = Math.abs(containerCenter - boxCenter);

    box.classList.remove("in-focus");

    // proporção de quão central o box está
    const maxDistance = portContainerMobile.offsetWidth / 2;
    let progress = 1 - Math.min(distance / maxDistance, 1); // 0 fora do foco, 1 centro

    // move a imagem verticalmente
    box.style.backgroundPosition = `center ${20 + progress * 80}%`;

    if (distance < closestDistance) {
      closestDistance = distance;
      closestBox = box;
    }
  });

  if (closestBox) {
    closestBox.classList.add("in-focus");

    portTituloMobile.style.opacity = 0;
    setTimeout(() => {
      portTituloMobile.textContent = closestBox.dataset.titulo;
      portTituloMobile.style.opacity = 1;
    }, 200);
  }
}

// eventos
portContainerMobile.addEventListener("scroll", updatePortfolioMobile);
window.addEventListener("resize", updatePortfolioMobile); // atualiza se a tela mudar
updatePortfolioMobile();