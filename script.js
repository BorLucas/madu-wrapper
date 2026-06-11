document.addEventListener("DOMContentLoaded", () => {
    // ---- CRIAR FUNDO FOFO (Corações e Estrelas) ----
    const bgContainer = document.getElementById("floating-bg");
    const emojis = ["💙", "✨", "💖", "💫", "💕", "🌟"];
    
    // Cria 25 ícones flutuantes
    for (let i = 0; i < 25; i++) {
        let el = document.createElement("div");
        el.className = "floating-icon";
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + "vw"; // Posição horizontal aleatória
        el.style.animationDuration = (Math.random() * 5 + 6) + "s"; // Velocidade entre 6s e 11s
        el.style.animationDelay = Math.random() * 5 + "s"; // Delay para não subirem todos juntos
        el.style.fontSize = (Math.random() * 1 + 1) + "rem"; // Tamanhos diferentes
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
        timeElement.innerHTML = `${diffDays} dias<br><span style="font-size: 1.1rem; color: #fff;">(ou ${diffHours.toLocaleString('pt-BR')} horas juntos)</span>`;
    }

    // ---- LÓGICA DE PASSAR OS SLIDES (STORIES) ----
    const slides = document.querySelectorAll(".slide");
    const TIME_PER_SLIDE = 9000; // Tempo reduzido para 9 segundos
    let currentSlide = 0;
    let slideTimer;
    let progressAnimation;
    let slideStartTime;

    const startBtn = document.getElementById("start-btn");
    const storyContainer = document.getElementById("story-container");

    // Iniciar
    startBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que o clique do botão seja lido como "pular slide"
        fillProgress(0, 100);
        goToSlide(1);
    });

    // Navegação por Toque na Tela (Direita avança, Esquerda volta)
    storyContainer.addEventListener("click", (e) => {
        if (currentSlide === 0) return; // Na primeira tela, só sai clicando no botão

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
            if (currentSlide > 1) { // Só volta até o slide 1 (pula a introdução do botão)
                fillProgress(currentSlide, 0); // Esvazia o atual
                fillProgress(currentSlide - 1, 0); // Zera o anterior para ele encher de novo
                goToSlide(currentSlide - 1);
            }
        }
    });

    function goToSlide(index) {
        // Remove a classe active do atual
        slides[currentSlide].classList.remove("active");
        
        // Atualiza a variável
        currentSlide = index;
        
        // Ativa o novo slide
        slides[currentSlide].classList.add("active");
        
        // Inicia o tempo e a barra
        startSlideProgress();
    }

    function startSlideProgress() {
        clearInterval(progressAnimation);
        clearTimeout(slideTimer);

        // Se for o último slide, a barra apenas enche e para
        if (currentSlide === slides.length - 1) {
            fillProgress(currentSlide, 100);
            return; 
        }

        slideStartTime = Date.now();
        
        // Animação suave da barra de progresso atual
        progressAnimation = setInterval(() => {
            let elapsedTime = Date.now() - slideStartTime;
            let percentage = (elapsedTime / TIME_PER_SLIDE) * 100;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressAnimation);
            }
            fillProgress(currentSlide, percentage);
        }, 30);

        // Timer para mudar de tela automaticamente
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
