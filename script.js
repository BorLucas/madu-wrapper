document.addEventListener("DOMContentLoaded", () => {
    // ---- CRIAR FUNDO FOFO GLOBAL (Corações e Estrelas) ----
    const bgContainer = document.getElementById("floating-bg");
    // Adicionei mais variações para ficar mais rico
    const emojis = ["💙", "✨", "💖", "💫", "💕", "🌟", "🌸", "🤍"];
    
    // Cria 30 ícones flutuantes
    for (let i = 0; i < 30; i++) {
        let el = document.createElement("div");
        el.className = "floating-icon";
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + "vw"; // Posição horizontal aleatória
        el.style.animationDuration = (Math.random() * 6 + 7) + "s"; // Velocidade entre 7s e 13s
        el.style.animationDelay = Math.random() * 8 + "s"; // Delay espalhado
        el.style.fontSize = (Math.random() * 1 + 0.8) + "rem"; // Tamanhos diferentes
        bgContainer.appendChild(el);
    }

    // ---- CÁLCULO DE TEMPO JUNTOS ----
    // Data de início: 22/05/2025
    const startDate = new Date('2025-05-22T00:00:00');
    const today = new Date();
    
    // Fallback caso a data atual seja anterior à data de início (para testes antes de 2025)
    let actualToday = today;
    if (today < startDate) {
        // Apenas para visualização no desenvolvimento: simulando que hoje é 1 ano depois
        actualToday = new Date('2026-05-22T12:00:00'); 
    }

    const diffTime = Math.abs(actualToday - startDate);
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
        e.stopPropagation(); // Evita que o clique no botão seja lido como "pular slide"
        fillProgress(0, 100);
        goToSlide(1); // Vai direto para o slide 1 (introdução)
    });

    // Navegação por Toque/Clique na Tela (Direita avança, Esquerda volta)
    storyContainer.addEventListener("click", (e) => {
        // Na primeira tela (Play), não navegamos por clique na tela, só no botão
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
            if (currentSlide > 1) { // Só volta até o slide 1
                fillProgress(currentSlide, 0); // Esvazia a barra do atual
                fillProgress(currentSlide - 1, 0); // Zera a anterior para ela encher de novo
                goToSlide(currentSlide - 1);
            }
        }
    });

    function goToSlide(index) {
        // Troca INSTANTÂNEA (o CSS cuida disso agora com display: none/flex)
        slides[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        
        // Reinicia o tempo e a animação da barra
        startSlideProgress();
    }

    function startSlideProgress() {
        // Limpa timers anteriores
        clearInterval(progressAnimation);
        clearTimeout(slideTimer);

        // Se for o último slide, enche a barra e para a auto-navegação
        if (currentSlide === slides.length - 1) {
            fillProgress(currentSlide, 100);
            return; 
        }

        slideStartTime = Date.now();
        
        // Animação suave da barra de progresso atual
        // (A barra precisa de transição suave, mas a troca de slide não)
        progressAnimation = setInterval(() => {
            let elapsedTime = Date.now() - slideStartTime;
            let percentage = (elapsedTime / TIME_PER_SLIDE) * 100;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressAnimation);
            }
            fillProgress(currentSlide, percentage);
        }, 50); // Atualiza a cada 50ms para suavidade

        // Timer para mudar de tela automaticamente
        slideTimer = setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                fillProgress(currentSlide, 100); // Garante barra cheia
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