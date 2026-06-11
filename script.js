document.addEventListener("DOMContentLoaded", () => {
    // ---- CÁLCULO DE TEMPO JUNTOS ----
    // Data de início: 22/05/2025
    const startDate = new Date('2025-05-22T00:00:00');
    const today = new Date();
    
    // Calcula a diferença
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    // Atualiza no HTML
    const timeElement = document.getElementById("time-together");
    if (timeElement) {
        timeElement.innerHTML = `${diffDays} dias<br><span style="font-size: 1.2rem;">(ou ${diffHours.toLocaleString('pt-BR')} horas)</span>`;
    }

    // ---- LÓGICA DE PASSAR OS SLIDES ----
    const slides = document.querySelectorAll(".slide");
    const TIME_PER_SLIDE = 17000; // 17 segundos por slide
    let currentSlide = 0;
    let slideTimer;
    let progressAnimation;

    // A primeira tela não passa sozinha, espera a pessoa clicar no botão
    const startBtn = document.getElementById("start-btn");
    
    startBtn.addEventListener("click", () => {
        // Quando ela clica, marcamos a primeira barra como cheia e passamos de slide
        fillProgress(0, 100);
        nextSlide();
    });

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            // Esconde slide atual
            slides[currentSlide].classList.remove("active");
            fillProgress(currentSlide, 100); // Garante que a barra antiga ficou cheia
            
            // Vai pro próximo
            currentSlide++;
            slides[currentSlide].classList.add("active");
            
            // Inicia timer e animação do novo slide
            startSlideProgress();
        }
    }

    function startSlideProgress() {
        // Se for o último slide, não precisa pular automaticamente (ou pode parar aí)
        if (currentSlide === slides.length - 1) {
            fillProgress(currentSlide, 100);
            return; 
        }

        let startTime = Date.now();
        
        // Animação suave da barra de progresso
        clearInterval(progressAnimation);
        progressAnimation = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            let percentage = (elapsedTime / TIME_PER_SLIDE) * 100;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressAnimation);
            }
            fillProgress(currentSlide, percentage);
        }, 50);

        // Timer para mudar a tela
        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => {
            nextSlide();
        }, TIME_PER_SLIDE);
    }

    function fillProgress(index, percentage) {
        const fillElement = document.getElementById(`fill-${index}`);
        if (fillElement) {
            fillElement.style.width = `${percentage}%`;
        }
    }
});
