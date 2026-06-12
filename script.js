let spotifyPlayerController;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-embed');
    const options = {
        width: '100%',
        height: '80',
        uri: 'spotify:track:4pG8lbKPKkfGSniMXxZTM7' 
    };
    const callback = (EmbedController) => {
        spotifyPlayerController = EmbedController;
    };
    IFrameAPI.createController(element, options, callback);
};

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


    randomPhotosList.forEach(photo => {
        const img = new Image();
        img.src = folderPath + photo;
    });

    function buildPhotoStack() {
        const stackContainer = document.getElementById('polaroid-stack');
        if (!stackContainer) return;
        
        stackContainer.innerHTML = ""; // Limpa a pilha anterior

        randomPhotosList.forEach((photo, index) => {
            const polaroid = document.createElement('div');
            polaroid.className = 'polaroid-stack-item';
            
            // Cria um visual "bagunçado natural"
            const randomRot = (Math.random() * 20 - 10).toFixed(2); // entre -10 e 10 graus
            const offsetX = (Math.random() * 40 - 20).toFixed(2);   // entre -20 e 20 px
            const offsetY = (index * -5); // Cada nova foto sobe um pouquinho

            polaroid.style.setProperty('--rot', `${randomRot}deg`);
            polaroid.style.setProperty('--offX', `${offsetX}px`);
            polaroid.style.setProperty('--offY', `${offsetY}px`);
            polaroid.style.zIndex = index;
            
            // Cada foto demora um pouco mais que a anterior para cair na pilha
            polaroid.style.animationDelay = `${index * 0.4}s`;

            polaroid.innerHTML = `<img src="${folderPath}${photo}">`;
            stackContainer.appendChild(polaroid);
        });
    }

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

    const startDate = new Date('2025-05-22T00:00:00');
    let counterTimeout;

    function animateTimeTogether() {
        const timeElement = document.getElementById("time-together");
        if (!timeElement) return;
        clearTimeout(counterTimeout);
        timeElement.innerHTML = "Calculando...";

        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const targetDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const targetHours = Math.floor(diffTime / (1000 * 60 * 60));

        counterTimeout = setTimeout(() => {
            const animationDuration = 2500;
            const startTimestamp = performance.now();

            function step(timestamp) {
                let progress = (timestamp - startTimestamp) / animationDuration;
                if (progress > 1) progress = 1;

                const easeOutProgress = 1 - Math.pow(1 - progress, 3);

                const currentDays = Math.floor(easeOutProgress * targetDays);
                const currentHours = Math.floor(easeOutProgress * targetHours);

                timeElement.innerHTML = `${currentHours.toLocaleString('pt-BR')} horas<span style="font-size: 1.1rem; color: #fff; text-shadow: none;">(ou ${currentDays} dias)</span><br>juntos`;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    timeElement.innerHTML = `${targetHours.toLocaleString('pt-BR')} horas<span style="font-size: 1.1rem; color: #fff; text-shadow: none;">(ou ${targetDays} dias)</span><br>juntos`;
                }
            }
            
            window.requestAnimationFrame(step);
        }, 1500);
    }


    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let slideTimer;
    let progressAnimation;
    let slideStartTime;

    const startBtn = document.getElementById("start-btn");
    const storyContainer = document.getElementById("story-container");

    startBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        if (spotifyPlayerController) {
            spotifyPlayerController.togglePlay();
        }
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
            buildPhotoStack();      // Monta a pilha 3D
            animateTimeTogether();  // Inicia o contador
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

        // ---- LÓGICA DE TEMPO DINÂMICO ----
        // Verifica se o slide atual tem alguma foto (classe .polaroid)
        const hasImage = slides[currentSlide].querySelector('.polaroid') !== null;
        // Se tiver foto, dura 15.3 segundos (70% a mais). Se não, dura 9 segundos.
        const currentDuration = hasImage ? 15300 : 9000; 

        slideStartTime = Date.now();
        
        progressAnimation = setInterval(() => {
            let elapsedTime = Date.now() - slideStartTime;
            let percentage = (elapsedTime / currentDuration) * 100;
            
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
        }, currentDuration);
    }

    function fillProgress(index, percentage) {
        const fillElement = document.getElementById(`fill-${index}`);
        if (fillElement) {
            fillElement.style.width = `${percentage}%`;
        }
    }
});