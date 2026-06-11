const totalSlides = 6;
let currentSlide = 0;
let slideInterval;
const TIME_PER_SLIDE = 5000; // 5 segundos por slide

// Inicializa as barras de progresso no topo
const progressContainer = document.getElementById('progress-bars');
for(let i = 0; i < totalSlides; i++) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
    progressContainer.appendChild(bar);
}

// Calcula os dias e horas juntos dinamicamente
function calculateTimeTogether() {
    // Data de início do namoro
    const startDate = new Date('2025-05-22T00:00:00');
    const currentDate = new Date();
    
    const diffInMs = currentDate - startDate;
    
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    // Proteção caso a data do PC seja anterior a maio de 2025
    if (diffInDays >= 0) {
        document.getElementById('dias-juntos').innerText = diffInDays;
        document.getElementById('horas-juntas').innerText = diffInHours.toLocaleString('pt-BR');
    }
}

// Lógica de navegação entre os slides
function goToSlide(n) {
    const slides = document.querySelectorAll('.slide');

    // Manipula as barrinhas de progresso
    for(let i = 0; i < totalSlides; i++) {
        const fill = document.getElementById(`fill-${i}`);
        fill.classList.remove('active');
        if (i < n) {
            fill.classList.add('completed');
        } else {
            fill.classList.remove('completed');
        }
    }

    // Esconde o slide atual e mostra o novo
    slides[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    
    // Anima a barra de progresso do slide atual
    setTimeout(() => {
        document.getElementById(`fill-${currentSlide}`).classList.add('active');
    }, 50);

    // Reseta o temporizador automático
    clearInterval(slideInterval);
    if (currentSlide < totalSlides - 1) {
        slideInterval = setInterval(nextSlide, TIME_PER_SLIDE);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Inicia o Wrapper
calculateTimeTogether();
goToSlide(0);