class JayaMaryWebsite {
    constructor() {
        this.currentLang = 'en';
        this.autoPlayInterval = null;
        this.currentIndex = 0;
        this.languages = [];
        this.proposalScreen = null;
        this.mainWrapper = null;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupProposalScreen();
        this.setupEventListeners();
        this.collectLanguages();
        this.createFloatingHearts();
        this.addKeyboardNavigation();
    }

    setupElements() {
        this.nameText = document.getElementById('nameText');
        this.languageName = document.getElementById('languageName');
        this.nameCard = document.getElementById('nameCard');
        this.languageButtons = document.getElementById('languageButtons');
        this.autoPlayToggle = document.getElementById('autoPlay');
        this.buttons = document.querySelectorAll('.lang-btn');
        this.startBtn = document.getElementById('startBtn');
        this.proposalScreen = document.getElementById('proposalScreen');
        this.mainWrapper = document.getElementById('mainWrapper');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
    }

    setupProposalScreen() {
        // Show proposal screen by default
        this.proposalScreen.style.display = 'flex';
        this.mainWrapper.style.display = 'none';
    }

    setupEventListeners() {
        // Proposal screen buttons
        this.yesBtn.addEventListener('click', () => {
            this.acceptProposal();
        });

        this.noBtn.addEventListener('click', () => {
            this.rejectProposal();
        });

        // Make No button harder to click
        this.noBtn.addEventListener('mouseenter', () => {
            this.moveNoButton();
        });

        this.startBtn.addEventListener('click', () => {
            if (!this.autoPlayInterval) {
                this.startAutoPlay();
                this.autoPlayToggle.checked = true;
                this.startBtn.classList.add('playing');
                this.startBtn.querySelector('.btn-text').textContent = 'Click to Stop Magic';
            } else {
                this.stopAutoPlay();
                this.startBtn.classList.remove('playing');
                this.startBtn.querySelector('.btn-text').textContent = 'Click to Start Magic';
            }
        });

        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (!this.autoPlayInterval) {
                    this.startAutoPlay();
                    this.autoPlayToggle.checked = true;
                    this.startBtn.classList.add('playing');
                    this.startBtn.querySelector('.btn-text').textContent = 'Click to Stop Magic';
                } else {
                    this.stopAutoPlay();
                    this.startBtn.classList.remove('playing');
                    this.startBtn.querySelector('.btn-text').textContent = 'Click to Start Magic';
                }
            });
        });

        this.autoPlayToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startAutoPlay();
                this.startBtn.classList.add('playing');
                this.startBtn.querySelector('.btn-text').textContent = 'Click to Stop Magic';
            } else {
                this.stopAutoPlay();
                this.startBtn.classList.remove('playing');
                this.startBtn.querySelector('.btn-text').textContent = 'Click to Start Magic';
            }
        });

        this.nameCard.addEventListener('mouseenter', () => {
            this.nameCard.style.transform = 'translateY(-10px) scale(1.02)';
        });

        this.nameCard.addEventListener('mouseleave', () => {
            this.nameCard.style.transform = 'translateY(0) scale(1)';
        });
    }

    acceptProposal() {
        this.createMassiveHeartExplosion();
        this.showLoveMessage();
        
        setTimeout(() => {
            this.transitionToMainContent();
        }, 2000);
    }

    rejectProposal() {
        this.showDisappointedMessage();
        this.moveNoButton();
        
        // After 3 seconds, show the main content anyway (with a sweet message)
        setTimeout(() => {
            this.showSweetMessage();
            setTimeout(() => {
                this.transitionToMainContent();
            }, 2000);
        }, 3000);
    }

    moveNoButton() {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        this.noBtn.style.position = 'fixed';
        this.noBtn.style.left = randomX + 'px';
        this.noBtn.style.top = randomY + 'px';
        this.noBtn.style.transform = 'translate(-50%, -50%)';
    }

    createMassiveHeartExplosion() {
        const container = document.querySelector('.floating-hearts');
        const colors = ['#f093fb', '#f5576c', '#ffc0cb', '#ff69b4', '#ff1493'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '2000';
                
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = Math.random() * 300 + 200;
                const lifetime = Math.random() * 2000 + 2000;
                
                container.appendChild(heart);
                
                let startTime = Date.now();
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / lifetime;
                    
                    if (progress >= 1) {
                        heart.remove();
                        return;
                    }
                    
                    const x = Math.cos(angle) * velocity * progress;
                    const y = Math.sin(angle) * velocity * progress - (progress * progress * 200);
                    const opacity = 1 - progress;
                    const scale = 1 + progress * 0.5;
                    
                    heart.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                    heart.style.opacity = opacity;
                    
                    requestAnimationFrame(animate);
                };
                
                requestAnimationFrame(animate);
            }, i * 50);
        }
    }

    showLoveMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-size: 1.5rem;
                font-weight: 600;
                text-align: center;
                z-index: 2000;
                box-shadow: 0 20px 40px rgba(255, 107, 107, 0.4);
                animation: fadeInScale 0.5s ease-out;
            ">
                💕 I knew it! You're the best! 💕
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    showDisappointedMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-size: 1.2rem;
                text-align: center;
                z-index: 2000;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                animation: fadeInScale 0.5s ease-out;
            ">
                😔 Oh... but I still think you're amazing!
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    showSweetMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #f093fb, #f5576c);
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-size: 1.3rem;
                text-align: center;
                z-index: 2000;
                box-shadow: 0 20px 40px rgba(240, 147, 251, 0.4);
                animation: fadeInScale 0.5s ease-out;
            ">
                💕 Even if you said no, your name is still beautiful in every language!
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    transitionToMainContent() {
        this.proposalScreen.style.opacity = '0';
        this.proposalScreen.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            this.proposalScreen.style.display = 'none';
            this.mainWrapper.style.display = 'block';
            this.mainWrapper.style.opacity = '0';
            
            setTimeout(() => {
                this.mainWrapper.style.opacity = '1';
                this.mainWrapper.style.transition = 'opacity 1s ease-in';
                
                // Auto-start the magic after a short delay
                setTimeout(() => {
                    this.startAutoPlay();
                    this.autoPlayToggle.checked = true;
                    this.startBtn.classList.add('playing');
                    this.startBtn.querySelector('.btn-text').textContent = 'Click to Stop Magic';
                }, 1000);
            }, 100);
        }, 1000);
    }

    collectLanguages() {
        this.buttons.forEach(button => {
            this.languages.push({
                element: button,
                lang: button.dataset.lang,
                name: button.dataset.name,
                langName: button.querySelector('.lang-name').textContent
            });
        });
    }

    switchLanguage(button) {
        const lang = button.dataset.lang;
        const name = button.dataset.name;
        const langName = button.querySelector('.lang-name').textContent;

        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.currentIndex = this.languages.findIndex(l => l.lang === lang);

        this.updateActiveButton(button);
        this.animateNameChange(name, langName);
        this.createHeartExplosion();
        this.playClickSound();
    }

    updateActiveButton(activeButton) {
        this.buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        
        activeButton.classList.add('active');
        activeButton.style.transform = 'scale(1.05)';
    }

    animateNameChange(newName, langName) {
        this.nameText.classList.add('name-change-animation');
        
        setTimeout(() => {
            this.nameText.textContent = newName;
            this.languageName.textContent = langName;
            
            if (this.isRTL(newName)) {
                this.nameText.style.direction = 'rtl';
            } else {
                this.nameText.style.direction = 'ltr';
            }
        }, 300);

        setTimeout(() => {
            this.nameText.classList.remove('name-change-animation');
        }, 600);
    }

    isRTL(text) {
        const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return rtlChars.test(text);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextLanguage();
        }, 1500);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.autoPlayToggle.checked = false;
        this.startBtn.classList.remove('playing');
        this.startBtn.querySelector('.btn-text').textContent = 'Click to Start Magic';
    }

    nextLanguage() {
        this.currentIndex = (this.currentIndex + 1) % this.languages.length;
        const nextLang = this.languages[this.currentIndex];
        this.switchLanguage(nextLang.element);
    }

    createHeartExplosion() {
        const container = document.querySelector('.floating-hearts');
        const colors = ['#f093fb', '#f5576c', '#ffc0cb', '#ff69b4', '#ff1493'];
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = Math.random() * 200 + 100;
            const lifetime = Math.random() * 1000 + 1000;
            
            container.appendChild(heart);
            
            let startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / lifetime;
                
                if (progress >= 1) {
                    heart.remove();
                    return;
                }
                
                const x = Math.cos(angle) * velocity * progress;
                const y = Math.sin(angle) * velocity * progress - (progress * progress * 100);
                const opacity = 1 - progress;
                
                heart.style.transform = `translate(${x}px, ${y}px)`;
                heart.style.opacity = opacity;
                
                requestAnimationFrame(animate);
            };
            
            requestAnimationFrame(animate);
        }
    }

    createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartSymbols = ['💕', '💖', '💗', '💝', '💘'];
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const heart = document.createElement('div');
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.fontSize = Math.random() * 15 + 10 + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.opacity = '0.6';
                
                container.appendChild(heart);
                
                let startY = window.innerHeight;
                let duration = Math.random() * 3000 + 5000;
                let startTime = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    
                    if (progress >= 1) {
                        heart.remove();
                        return;
                    }
                    
                    const y = startY - (startY * progress);
                    const x = parseFloat(heart.style.left) + Math.sin(progress * Math.PI * 2) * 20;
                    const opacity = 0.6 * (1 - progress);
                    
                    heart.style.transform = `translateY(${-startY + y}px)`;
                    heart.style.left = x + '%';
                    heart.style.opacity = opacity;
                    
                    requestAnimationFrame(animate);
                };
                
                requestAnimationFrame(animate);
            }
        }, 2000);
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                    this.nextLanguage();
                    this.stopAutoPlay();
                    break;
                case 'ArrowLeft':
                    this.previousLanguage();
                    this.stopAutoPlay();
                    break;
                case ' ':
                    e.preventDefault();
                    if (this.autoPlayToggle.checked) {
                        this.stopAutoPlay();
                    } else {
                        this.startAutoPlay();
                        this.autoPlayToggle.checked = true;
                    }
                    break;
            }
        });
    }

    previousLanguage() {
        this.currentIndex = (this.currentIndex - 1 + this.languages.length) % this.languages.length;
        const prevLang = this.languages[this.currentIndex];
        this.switchLanguage(prevLang.element);
    }

    playClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    addSpecialEffects() {
        const messages = [
            "Every language speaks the same truth - you are amazing 💕",
            "Beautiful in every language, wonderful in every way ✨",
            "Your name sounds like music in any language 🎵",
            "Across all languages, one truth remains: you are special 💖",
            "Multilingual beauty, universal charm 🌟"
        ];
        
        let messageIndex = 0;
        setInterval(() => {
            if (Math.random() > 0.8) {
                messageIndex = (messageIndex + 1) % messages.length;
                const messageText = document.querySelector('.message-text');
                messageText.style.opacity = '0';
                
                setTimeout(() => {
                    messageText.textContent = messages[messageIndex];
                    messageText.style.opacity = '1';
                }, 500);
            }
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const website = new JayaMaryWebsite();
    website.addSpecialEffects();
    
    setTimeout(() => {
        const firstButton = document.querySelector('.lang-btn.active');
        if (firstButton) {
            firstButton.click();
        }
    }, 1000);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
