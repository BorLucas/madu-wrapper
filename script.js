document.addEventListener("DOMContentLoaded", () => {
    // ---- CONFIGURAÇÃO DAS FOTOS ALEATÓRIAS (SLIDE 3) ----
    const folderPath = "src/"; 

    const randomPhotosList = [
        "roleta-img-1.jpeg",
        "roleta-img-2.jpeg",
        "roleta-img-3.jpeg",
        "roleta-img-4.jpeg",
        "roleta-img-5.jpeg",
        "roleta-img-6.jpeg",
        "roleta-img-7.jpeg",
    ];

    // ---- PRÉ-CARREGAMENTO DAS IMAGENS ----
    const preloadedImages = [];
    randomPhotosList.forEach(photo => {
        const img = new Image();
        img.src = folderPath + photo;
        preloadedImages.push(img);
    });

    const polaroidImgElement = document.getElementById('polaroid-image');

    function setRandomPolaroid() {
        if (polaroidImgElement && randomPhotosList.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomPhotosList.length);
            polaroidImgElement.src = folderPath + randomPhotosList[randomIndex];
        }
    }

    // ---- CRIAR FUNDO FOFO GLOBAL (Corações Outline) ----
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
    const slideBackgrounds = [
        "linear-gradient(135deg, #1e3c72 0%, #2a5298 40%, #ff7eb3 100%)", // Slide 0
        "linear-gradient(135deg, #141e30 0%, #243b55 60%, #fbc2eb 100%)", // Slide 1
        "linear-gradient(135deg, #2980b9 0%, #6dd5fa 50%, #ff9a9e 100%)", // Slide 2
        "linear-gradient(135deg, #4b6cb7 0%, #182848 70%, #ff7eb3 100%)", // Slide 3
        "linear-gradient(135deg, #09203f 0%, #537895 60%, #ffb199 100%)", // Slide 4
        "linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #fbc2eb 100%)", // Slide 5
        "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #e60073 100%)"  // Slide 6
    ];

    document.body.style.background = slideBackgrounds[0];

    // ---- NOVO: LÓGICA DO CONTADOR ANIMADO (SLIDE 3) ----
    const startDate = new Date('2025-05-22T00:00:00');
    let counterTimeout; // Variável para controlar o timer do "Calculando..."

    function animateTimeTogether() {
        const timeElement = document.getElementById("time-together");
        if (!timeElement) return;

        // 1. Zera qualquer animação que estava rodando antes e mostra a mensagem de suspense
        clearTimeout(counterTimeout);
        timeElement.innerHTML = "Calculando...";

        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const targetDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const targetHours = Math.floor(diffTime / (1000 * 60 * 60));

        // 2. Espera 1.5 segundos no "Calculando..." e depois inicia a contagem
        counterTimeout = setTimeout(() => {
            const animationDuration = 2000; // O contador vai subir durante 2 segundos
            const startTimestamp = performance.now();

            function step(timestamp) {
                // Calcula o progresso de 0 a 1
                let progress = (timestamp - startTimestamp) / animationDuration;
                if (progress > 1) progress = 1;

                // Efeito "Ease Out" (começa rápido e freia no final para ficar mais bonito)
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);

                const currentDays = Math.floor(easeOutProgress * targetDays);
                const currentHours = Math.floor(easeOutProgress * targetHours);

                timeElement.innerHTML = `${currentHours.toLocaleString('pt-BR')} horas<br><span style="font-size: 1.1rem; color: #fff; text-shadow: none;">(ou ${currentDays} dias juntos)</span>`;

                if (progress < 1) {
                    window.requestAnimationFrame(step); // Continua animando
                } else {
                    // Garante que termina exatamente no número correto
                    timeElement.innerHTML = `${targetHours.toLocaleString('pt-BR')} horas<br><span style="font-size: 1.1rem; color: #fff; text-shadow: none;">(ou ${targetDays} dias juntos)</span>`;
                }
            }
            
            // Inicia o motor de animação visual do navegador
            window.requestAnimationFrame(step);
        }, 1500); // 1500ms = 1.5 segundos de suspense
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

    startBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        fillProgress(0, 100);
        goToSlide(1); 
    });

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
        
        document.body.style.background = slideBackgrounds[currentSlide];

        // AÇÕES ESPECÍFICAS DO SLIDE 3
        if (currentSlide === 3) {
            setRandomPolaroid();    // 1. Troca a foto aleatória
            animateTimeTogether();  // 2. Inicia o suspense e a animação dos números
        }
        
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