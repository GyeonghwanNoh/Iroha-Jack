// Password handling
const passwordInput = document.getElementById('passwordInput');
const lockScreen = document.getElementById('lockScreen');
const mainScreen = document.getElementById('mainScreen');
const errorMsg = document.getElementById('errorMsg');

const correctPassword = '0729';

// Audio Context for sounds
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sound effects using Web Audio API
function playClick() {
    initAudio();
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

function playPop() {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
}

function playChime() {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1200;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Password input handler
passwordInput.addEventListener('input', function(e) {
    const value = e.target.value;
    
    if (value.length === 4) {
        if (value === correctPassword) {
            playClick();
            errorMsg.textContent = '';
            
            // Add brightness effect
            lockScreen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
            lockScreen.style.filter = 'brightness(1.3)';
            
            setTimeout(() => {
                lockScreen.classList.remove('active');
                lockScreen.style.display = 'none';
                mainScreen.classList.add('active');
                mainScreen.style.display = 'flex';
            }, 500);
        } else {
            errorMsg.textContent = 'Try again 🤍';
            passwordInput.value = '';
            passwordInput.style.animation = 'shake 0.3s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 300);
        }
    }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Screen navigation
function showSection(sectionId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(sectionId);
    
    if (currentScreen) {
        currentScreen.classList.remove('active');
        currentScreen.style.display = 'none';
    }
    
    nextScreen.classList.add('active');
    nextScreen.style.display = 'flex';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show hidden message
function showHidden() {
    playChime();
    showSection('hiddenSection');
}

// Auto-focus password input on load
window.addEventListener('load', () => {
    passwordInput.focus();
});
