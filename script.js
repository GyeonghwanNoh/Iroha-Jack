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

// D-day Calculator
function calculateDday() {
    const startDate = new Date('2024-09-03');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const ddayElement = document.getElementById('ddayCount');
    if (ddayElement) {
        ddayElement.textContent = `${diffDays}일 💕`;
    }
}

// Letter Exchange Functions
function showTab(tabName) {
    const tabs = document.querySelectorAll('.letter-tab');
    const btns = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'write') {
        document.getElementById('writeTab').classList.add('active');
        btns[0].classList.add('active');
    } else {
        document.getElementById('readTab').classList.add('active');
        btns[1].classList.add('active');
        loadLetters();
    }
}

function sendLetter() {
    const from = document.getElementById('letterFrom').value.trim();
    const content = document.getElementById('letterContent').value.trim();
    
    if (!from || !content) {
        alert('보내는 사람과 내용을 모두 입력해주세요! 🤍');
        return;
    }
    
    const letter = {
        from: from,
        content: content,
        timestamp: new Date().getTime(),
        date: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Get existing letters
    let letters = JSON.parse(localStorage.getItem('ourLetters') || '[]');
    letters.unshift(letter);
    localStorage.setItem('ourLetters', JSON.stringify(letters));
    
    // Clear form
    document.getElementById('letterFrom').value = '';
    document.getElementById('letterContent').value = '';
    
    // Show success message
    alert('편지가 전달되었어요! 💌');
    
    // Switch to read tab
    showTab('read');
}

function loadLetters() {
    const letters = JSON.parse(localStorage.getItem('ourLetters') || '[]');
    const container = document.getElementById('lettersContainer');
    
    if (letters.length === 0) {
        container.innerHTML = '<p class="no-letters">아직 편지가 없어요</p>';
        return;
    }
    
    container.innerHTML = letters.map(letter => `
        <div class="letter-card">
            <div class="letter-header">
                <span class="letter-from">From. ${letter.from}</span>
                <span class="letter-time">${letter.date}</span>
            </div>
            <div class="letter-text">${letter.content}</div>
        </div>
    `).join('');
}

// Auto-focus password input on load
window.addEventListener('load', () => {
    passwordInput.focus();
    calculateDday();
});
