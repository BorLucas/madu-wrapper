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
        "maria-eugenia-2.jpeg",
        "maria-eugenia-1.jpeg",
        "first-date-1.jpeg",
    ];


    randomPhotosList.forEach(photo => {
        const img = new Image();
        img.src = folderPath + photo;
    });

    function buildPhotoStack() {
        const stackContainer = document.getElementById('polaroid-stack');
        if (!stackContainer) return;
        
        stackContainer.innerHTML = ""; // Limpa a pilha anterior

        // 1. Algoritmo para embaralhar a lista de fotos exclusivamente para a pilha
        function shufflePhotos(array) {
            const shuffled = [...array]; // Cria uma cópia para não alterar a lista original
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        // 2. Cria a lista embaralhada
        const mixedPhotos = shufflePhotos(randomPhotosList);

        // 3. Monta a pilha usando a lista embaralhada
        mixedPhotos.forEach((photo, index) => {
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

    function startFinalSequence() {
        const lines = [
            document.getElementById('line-1'),
            document.getElementById('line-2'),
            document.getElementById('line-3')
        ];
        
        const popContainer = document.getElementById('photo-pop-container');
        popContainer.innerHTML = "";

        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('show');
            }, index * 2000);
        });

        setTimeout(() => {
            const allPhotos = [
                "src/first-date-1.jpeg",
                "src/first-date-2.jpeg",
                "src/roleta-img-1.jpeg",
                "src/roleta-img-2.jpeg",
                "src/roleta-img-3.jpeg",
                "src/roleta-img-4.jpeg",
                "src/roleta-img-5.jpeg",
                "src/roleta-img-6.jpeg",
                "src/roleta-img-7.jpeg",
                "src/maria-eugenia-1.jpeg",
                "src/maria-eugenia-2.jpeg",
            ];

            let photoCount = 0;
            const maxPhotos = 11; 

            const popInterval = setInterval(() => {
                if (photoCount >= maxPhotos) {
                    clearInterval(popInterval);
                    return;
                }

                const randomPhoto = allPhotos[Math.floor(Math.random() * allPhotos.length)];
                createPoppingPhoto(randomPhoto, popContainer);
                photoCount++;
            }, 500);
        }, 3000);
    }

    function createPoppingPhoto(src, container) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'popping-photo';
        
        const top = Math.random() * 70 + 10; 
        const left = Math.random() * 70 + 10;
        const rotation = Math.random() * 40 - 20;

        photoDiv.style.top = `${top}%`;
        photoDiv.style.left = `${left}%`;
        photoDiv.style.setProperty('--r', `${rotation}deg`);

        photoDiv.innerHTML = `<img src="${src}">`;
        container.appendChild(photoDiv);
    }

    const polaroidImgElement = document.getElementById('polaroid-image');

    function setRandomPolaroid() {
        if (polaroidImgElement && randomPhotosList.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomPhotosList.length);
            polaroidImgElement.src = folderPath + randomPhotosList[randomIndex];
        }
    }


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

        if (currentSlide === 3) {
            if(typeof buildPhotoStack === 'function') buildPhotoStack();
            if(typeof animateTimeTogether === 'function') animateTimeTogether();
        }
        
        if (currentSlide === slides.length - 1) {
            startFinalSequence();
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

        const hasImage = slides[currentSlide].querySelector('.polaroid') !== null;
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