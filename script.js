document.addEventListener("DOMContentLoaded", () => {
    // ---- CRIAR FUNDO FOFO GLOBAL (Corações e Estrelas) ----
    const bgContainer = document.getElementById("floating-bg");
    const emojis = ["💙", "✨", "💖", "💫", "💕", "🌟", "🌸", "🤍"];
    
    // Cria 30 ícones flutuantes
    for (let i = 0; i < 30; i++) {
        let el = document.createElement("div");
        el.className = "floating-icon";
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + "vw"; 
        el.style.animationDuration = (Math.random() * 6 + 7) + "s"; 
        el.style.animationDelay = Math.random() * 8 + "s"; 
        el.style.fontSize = (Math.random() * 1 + 0.8) + "rem"; 
        bgContainer.appendChild(el);
    }

    // ---- CÁLCULO DE TEMPO JUNTOS ----
    // Data de início: 22/05/2025
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
    const TIME_PER_SLIDE = 9000; // 9 segundos por slide
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

    // Navegação por Toque/Clique na Tela (Direita avança, Esquerda volta)
    storyContainer.addEventListener("click", (e) => {
        if (currentSlide === 0) return; 

        const clickX = e.clientX;
        const screenWidth = window.innerWidth;

        if (clickX > screenWidth / 2) {
            // Tocou na Direita -> Próximo
            if (currentSlide < slides.length - 1) {
                fillProgress(currentSlide, 100);
                goToSlide(currentSlide + 1);
            }
        } else {
            // Tocou na Esquerda -> Voltar
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