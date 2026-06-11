document.addEventListener("DOMContentLoaded", () => {
    // ---- CRIAR FUNDO FOFO GLOBAL (Apenas Corações Outline) ----
    const bgContainer = document.getElementById("floating-bg");
    const emojis = ["♡"]; 
    
    for (let i = 0; i < 30; i++) {
        let el = document.createElement("div");
        el.className = "floating-icon";
        el.innerText = emojis[0]; 
        el.style.left = Math.random() * 100 + "vw"; 
        el.style.animationDuration = (Math.random() * 6 + 7) + "s"; 
        el.style.animationDelay = Math.random() * 8 + "s"; 
        el.style.fontSize = (Math.random() * 1.5 + 1.2) + "rem"; 
        bgContainer.appendChild(el);
    }

    // ---- PALETA DE FUNDOS PARA CADA SLIDE ----
    // Aqui você pode personalizar os gradientes de cada página
    const slideBackgrounds = [
        "linear-gradient(135deg, #1e3c72 0%, #2a5298 40%, #ff7eb3 100%)", // Slide 0: Play
        "linear-gradient(135deg, #141e30 0%, #243b55 60%, #fbc2eb 100%)", // Slide 1: Introdução (Mais noturno com rosa pastel)
        "linear-gradient(135deg, #2980b9 0%, #6dd5fa 50%, #ff9a9e 100%)", // Slide 2: Primeiro Encontro (Azul céu aberto com rosa)
        "linear-gradient(135deg, #4b6cb7 0%, #182848 70%, #ff7eb3 100%)", // Slide 3: Tempo Juntos (Azul clássico e neon)
        "linear-gradient(135deg, #09203f 0%, #537895 60%, #ffb199 100%)", // Slide 4: Pessoa Importante (Tons mais elegantes com toque coral)
        "linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #fbc2eb 100%)", // Slide 5: Restaurante (Variante do primeiro, mais suave)
        "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #e60073 100%)"  // Slide 6: Encerramento (Profundo, terminando com o rosa forte do amor)
    ];

    // Garante que o fundo inicial já carregue correto
    document.body.style.background = slideBackgrounds[0];

    // ---- CÁLCULO DE TEMPO JUNTOS ----
    const startDate = new Date('2025-05-22T00:00:00');
    const today = new Date();
    
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    const timeElement = document.getElementById("time-together");
    if (timeElement) {
        timeElement.innerHTML = `${diffDays} dias<br><span style="font-size: 1.1rem; color: #fff; text-shadow: none;">(ou ${diffHours.toLocaleString('pt-BR')} horas juntos)</span>`;
    }

    // ---- LÓGICA DE PASSAR OS SLIDES (STORIES) ----
    const slides = document.querySelectorAll(".slide");
    const TIME_PER_SLIDE = 9000; 
    let currentSlide = 0;
    let slideTimer;
    let progressAnimation;
    let slideStartTime;

    const startBtn = document.getElementById("start-btn");
    const storyContainer = document.getElementById("story-container");

    // Iniciar retrospectiva
    startBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        fillProgress(0, 100);
        goToSlide(1); 
    });

    // 1. Navegação por Toque/Clique na Tela 
    storyContainer.addEventListener("click", (e) => {
        if (currentSlide === 0) return; 

        const clickX = e.clientX;
        const screenWidth = window.innerWidth;

        if (clickX > screenWidth / 2) {
            if (currentSlide < slides.length - 1) {
                fillProgress(currentSlide, 100);
                goToSlide(currentSlide + 1);
            }
        } else {
            if (currentSlide > 1) { 
                fillProgress(currentSlide, 0); 
                fillProgress(currentSlide - 1, 0); 
                goToSlide(currentSlide - 1);
            }
        }
    });

    // 2. Navegação pelas Setas do Teclado
    document.addEventListener("keydown", (e) => {
        if (currentSlide === 0) return; 

        if (e.key === "ArrowRight") {
            if (currentSlide < slides.length - 1) {
                fillProgress(currentSlide, 100);
                goToSlide(currentSlide + 1);
            }
        } else if (e.key === "ArrowLeft") {
            if (currentSlide > 1) { 
                fillProgress(currentSlide, 0); 
                fillProgress(currentSlide - 1, 0); 
                goToSlide(currentSlide - 1);
            }
        }
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        
        // A MÁGICA ACONTECE AQUI: Altera o fundo da tela instantaneamente
        document.body.style.background = slideBackgrounds[currentSlide];
        
        startSlideProgress();
    }

    function startSlideProgress() {
        clearInterval(progressAnimation);
        clearTimeout(slideTimer);

        if (currentSlide === slides.length - 1) {
            fillProgress(currentSlide, 100);
            return; 
        }

        slideStartTime = Date.now();
        
        progressAnimation = setInterval(() => {
            let elapsedTime = Date.now() - slideStartTime;
            let percentage = (elapsedTime / TIME_PER_SLIDE) * 100;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressAnimation);
            }
            fillProgress(currentSlide, percentage);
        }, 50); 

        slideTimer = setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                fillProgress(currentSlide, 100); 
                goToSlide(currentSlide + 1);
            }
        }, TIME_PER_SLIDE);
    }

    function fillProgress(index, percentage) {
        const fillElement = document.getElementById(`fill-${index}`);
        if (fillElement) {
            fillElement.style.width = `${percentage}%`;
        }
    }
});