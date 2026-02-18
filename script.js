// Password handling
const passwordInput = document.getElementById('passwordInput');
const lockScreen = document.getElementById('lockScreen');
const mainScreen = document.getElementById('mainScreen');
const errorMsg = document.getElementById('errorMsg');

const correctPassword = '0904';

// Firebase (Firestore)
const firebaseConfig = {
    apiKey: "AIzaSyCj1q3LX7bAfkSZsrab5Dv0cphlqWqHhPg",
    authDomain: "only-for-you-8aff7.firebaseapp.com",
    projectId: "only-for-you-8aff7",
    storageBucket: "only-for-you-8aff7.firebasestorage.app",
    messagingSenderId: "479907456505",
    appId: "1:479907456505:web:85f964062f76f082284928",
    measurementId: "G-EB2RWGRW94"
};

let db = null;
let lettersUnsubscribe = null;

// Email notifications (EmailJS)
// 1) EmailJS 계정 생성 후, 아래 값 채우기
// 2) enabled를 true로 변경하면 이메일 알림이 전송됩니다
const emailConfig = {
    enabled: true,
    publicKey: 't2098UOv7kkTyyh1e',
    serviceId: 'service_2f0apjn',
    templateId: 'template_vz1qtpy',
    // 보내는 사람 기준으로 알림 받을 이메일 지정
    recipients: {
        '공주님 💖': { email: 'korea07291@gmail.com', name: 'Korea' },
        '왕자님 💙': { email: 'iroha0805.168@yahoo.ne.jp', name: 'Iroha' }
    }
};

let emailInitialized = false;

try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
} catch (error) {
    console.error('Firebase init failed:', error);
}

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
    showSection('couponSection');
    updateCouponDate();
}

// Coupon functionality
const coupons = [
    "🌙✨ 오늘 하루 공주님 앞에서\n절대 졸려하지 않기 ✨🌙\n😴❌ (만약 졸면 벌칙 각오)",
    "💋 황금 키스 타임 1시간 💋\n⏰ 중간 휴식 불가능 ⏰\n💕 쉬지 말고 계속! 💕",
    "👑 오늘 하루 공주님만 바라보기 👑\n👀💖 다른 거 보면 안 됨! 💖👀\n✨ 오직 공주님에게만 집중 ✨"
];

let todayCoupon = null;

function updateCouponDate() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const dateElement = document.getElementById('couponDate');
    if (dateElement) {
        dateElement.textContent = dateStr;
    }
}

function showCoupon() {
    showSection('couponSection');
    updateCouponDate();
}

function drawCoupon() {
    playPop();
    
    // 오늘 날짜 확인
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('couponDate');
    
    // 이미 오늘 뽑았는지 확인
    if (savedDate === today && todayCoupon !== null) {
        return; // 이미 뽑았으면 무시
    }
    
    // 새로운 쿠폰 뽑기
    const randomIndex = Math.floor(Math.random() * coupons.length);
    todayCoupon = coupons[randomIndex];
    
    // 로컬 스토리지에 저장
    localStorage.setItem('couponDate', today);
    localStorage.setItem('todayCoupon', todayCoupon);
    
    // 화면에 표시
    const content = document.getElementById('couponContent');
    if (content) {
        content.innerHTML = `
            <p class="coupon-text">${todayCoupon}</p>
            <p class="coupon-notice">✨ 오늘 하루 유효한 쿠폰이에요!</p>
        `;
    }
    
    // 버튼 비활성화
    const btn = document.querySelector('.btn-coupon');
    if (btn) {
        btn.textContent = '오늘은 이미 뽑았어요! 💝';
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    }
}

// 페이지 로드시 오늘 뽑은 쿠폰 확인
function checkTodayCoupon() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('couponDate');
    const savedCoupon = localStorage.getItem('todayCoupon');
    
    if (savedDate === today && savedCoupon) {
        todayCoupon = savedCoupon;
    }
}

// D-day Calculator
function calculateDday() {
    const startDate = new Date('2025-09-04');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const ddayElement = document.getElementById('ddayCount');
    if (ddayElement) {
        ddayElement.textContent = `${diffDays}일 💕`;
    }
}

// Photo Configuration
// photos 폴더에 1.jpg, 2.jpg ... 순서대로 넣었다면 여기 숫자만 늘리면 됩니다.
// 2025년 11월 사진은 1~39로 유지
const photoExtension = 'jpg';

const november2025Count = 39;

// 2025년 12월 사진 (photos 루트에 있는 긴 숫자 파일명들)
const december2025Files = [
    '1767360541753.jpg',
    '1767360543510.jpg',
    '1767360544925.jpg',
    '1767360546502.jpg',
    '1767360548961.jpg',
    '1767360550890.jpg',
    '1767360552628.jpg',
    '1767360554459.jpg',
    '1767360555991.jpg',
    '1767360558841.jpg',
    '1767360560648.jpg',
    '1767360562086.jpg',
    '1767360563441.jpg',
    '1767360564746.jpg',
    '1767360566070.jpg',
    '1767360567378.jpg',
    '1767360568658.jpg',
    '1767360570041.jpg',
    '1767360571282.jpg',
    '1767360572634.jpg',
    '1767360573929.jpg',
    '1767360575226.jpg',
    '1767360577522.jpg',
    '1767360578991.jpg',
    '1767360581177.jpg',
    '1767360583062.jpg',
    '1767360585542.jpg',
    '1767360586871.jpg',
    '1767360588328.jpg',
    '1767360589888.jpg',
    '1767360591228.jpg',
    '1767446342610.jpg',
    '1767446344583.jpg',
    '1767446347373.jpg',
    '1767446349860.jpg',
    '1767446351546.jpg',
    '1767446353328.jpg',
    '1767446354796.jpg',
    '1767446356419.jpg',
    '1767446358079.jpg',
    '1767446359707.jpg',
    '1767446361383.jpg',
    '1767446362833.jpg'
];

const january2026Files = [
    '1769398814311.jpg',
    '1769398816163.jpg',
    '1769398817046.jpg',
    '1769398817717.jpg',
    '1769398818370.jpg',
    '1769398818960.jpg',
    '1769398819697.jpg',
    '1769398820300.jpg',
    '1769398820883.jpg',
    '1769398821451.jpg',
    '1769398822037.jpg',
    '1769398822753.jpg',
    '1769398823494.jpg',
    '1769398824437.jpg',
    '1769398825216.jpg',
    '1769398825969.jpg',
    '1769398826663.jpg',
    '1769398827417.jpg',
    '1769398828194.jpg',
    '1769398829003.jpg',
    '1769398829667.jpg',
    '1769398830455.jpg',
    '1769398831111.jpg',
    '1769398831760.jpg',
    '1769398832360.jpg',
    '1769398833027.jpg',
    '1769398833749.jpg',
    '1769398834470.jpg',
    '1769398835372.jpg',
    '1769398836018.jpg',
    '1769398836923.jpg',
    '1769398837597.jpg',
    '1769398838295.jpg',
    '1769398839031.jpg',
    '1769398839800.jpg',
    '1769398840515.jpg',
    '1769398841229.jpg',
    '1769398842122.jpg',
    '1769398842999.jpg',
    '1769398843767.jpg',
    '1769398844542.jpg',
    '1769398845418.jpg',
    '1769398846594.jpg',
    '1769398847391.jpg',
    '1769398848228.jpg',
    '1769398849002.jpg',
    '1769398849794.jpg',
    '1769398851506.jpg',
    '1769398852329.jpg',
    '1769398853107.jpg',
    '1769398854042.jpg',
    '1769398854819.jpg',
    '1769398855643.jpg',
    '1769398856364.jpg',
    '1769398857198.jpg',
    '1769398858019.jpg',
    '1769398858781.jpg',
    '1769398859560.jpg',
    '1769398860413.jpg',
    '1769398861149.jpg',
    '1769398861992.jpg',
    '1769398862602.jpg',
    '1769398863393.jpg',
    '1769398864013.jpg',
    '1769398864636.jpg',
    '1769398865205.jpg',
    '1769398865973.jpg',
    '1769398866583.jpg',
    '1769398867198.jpg',
    '1769398867912.jpg',
    '1769398868769.jpg',
    '1769398869605.jpg',
    '1769398870381.jpg',
    '1769398871142.jpg',
    '1769398871943.jpg',
    '1769398872631.jpg',
    '1769398873437.jpg',
    '1769398874198.jpg',
    '1769398875115.jpg',
    '1769398876103.jpg',
    '1769398876878.jpg',
    '1769398877662.jpg'
];

const photoGroups = [
    { label: '2025년 11월', key: '2025-11', base: 'photos', folder: null, count: november2025Count },
    { label: '2025년 12월', key: '2025-12', base: 'photos', folder: null, files: december2025Files },
    { label: '2026년 1월', key: '2026-01', base: '', folder: 'Photos-2026-1', files: january2026Files }
];

// Load Photos
function loadPhotos() {
    const container = document.getElementById('photosGroups');
    if (!container) return;

    container.innerHTML = '';

    photoGroups.forEach((group) => {
        const hasFiles = Array.isArray(group.files) && group.files.length > 0;
        const hasCount = typeof group.count === 'number' && group.count > 0;
        if (!hasFiles && !hasCount) return;

        const groupSection = document.createElement('div');
        groupSection.className = 'photo-group';
        groupSection.dataset.month = group.key;

        const title = document.createElement('h3');
        title.className = 'photo-group-title';
        title.textContent = group.label;

        const grid = document.createElement('div');
        grid.className = 'photos-grid';

        if (hasFiles) {
            group.files.forEach((fileName) => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';

                const basePath = group.base ? `${group.base}` : '';
                const folderPath = group.folder ? `/${group.folder}` : '';
                const prefix = basePath ? `${basePath}${folderPath}` : `${group.folder || ''}`;
                photoItem.innerHTML = `
                    <div class="photo-box">
                        <img src="${prefix}/${fileName}" alt="우리의 순간" class="photo-img">
                    </div>
                `;

                grid.appendChild(photoItem);
            });
        } else {
            for (let i = 1; i <= group.count; i += 1) {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';

                const basePath = group.base ? `${group.base}` : '';
                const folderPath = group.folder ? `/${group.folder}` : '';
                const prefix = basePath ? `${basePath}${folderPath}` : `${group.folder || ''}`;
                photoItem.innerHTML = `
                    <div class="photo-box">
                        <img src="${prefix}/${i}.${photoExtension}" alt="우리의 순간" class="photo-img">
                    </div>
                `;

                grid.appendChild(photoItem);
            }
        }

        groupSection.appendChild(title);
        groupSection.appendChild(grid);
        container.appendChild(groupSection);
    });
}

function filterPhotos(monthKey) {
    const groups = document.querySelectorAll('.photo-group');
    const buttons = document.querySelectorAll('.photo-filter-btn');

    buttons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.month === monthKey);
    });

    groups.forEach((group) => {
        if (monthKey === 'all') {
            group.style.display = '';
        } else {
            group.style.display = group.dataset.month === monthKey ? '' : 'none';
        }
    });
}

// Letter Exchange Functions
function showTab(tabName) {
    const tabs = document.querySelectorAll('.letter-tab');
    checkTodayCoupon();
    const btns = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    btns.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'write') {
        document.getElementById('writeTab').classList.add('active');
        btns[0].classList.add('active');
        if (lettersUnsubscribe) {
            lettersUnsubscribe();
            lettersUnsubscribe = null;
        }
    } else {
        document.getElementById('readTab').classList.add('active');
        btns[1].classList.add('active');
        subscribeLetters();
    }
}

function initEmailJs() {
    if (!emailConfig.enabled) return false;
    if (emailInitialized) return true;
    if (!window.emailjs || !emailConfig.publicKey) return false;
    window.emailjs.init(emailConfig.publicKey);
    emailInitialized = true;
    return true;
}

function sendEmailNotification(letter) {
    if (!initEmailJs()) return Promise.resolve(false);

    const recipient = emailConfig.recipients?.[letter.from] || null;
    if (!recipient || !recipient.email) {
        return Promise.resolve(false);
    }

    const params = {
        from_name: letter.from,
        message: letter.content,
        letter_time: letter.date,
        to_email: recipient.email,
        to_name: recipient.name || 'You'
    };

    return window.emailjs
        .send(emailConfig.serviceId, emailConfig.templateId, params)
        .then(() => true)
        .catch((error) => {
            console.warn('Email notification failed:', error);
            return false;
        });
}

function sendLetter() {
    const fromRadio = document.querySelector('input[name="letterFrom"]:checked');
    const from = fromRadio ? fromRadio.value : '';
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

    const finishSend = () => {
        document.querySelector('input[name="letterFrom"][value="공주님 💖"]').checked = true;
        document.getElementById('letterContent').value = '';
        alert('편지가 전달되었어요! 💌');
        showTab('read');
    };

    if (db) {
        db.collection('letters').add(letter)
            .then(() => sendEmailNotification(letter))
            .then(finishSend)
            .catch(() => {
                saveLetterLocal(letter);
                sendEmailNotification(letter).finally(finishSend);
            });
    } else {
        saveLetterLocal(letter);
        sendEmailNotification(letter).finally(finishSend);
    }
}

function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function saveLetterLocal(letter) {
    let letters = JSON.parse(localStorage.getItem('ourLetters') || '[]');
    letters.unshift(letter);
    localStorage.setItem('ourLetters', JSON.stringify(letters));
}

function renderLetters(letters) {
    const container = document.getElementById('lettersContainer');

    if (letters.length === 0) {
        container.innerHTML = '<p class="no-letters">아직 편지가 없어요</p>';
        return;
    }

    container.innerHTML = letters.map(letter => `
        <div class="letter-card">
            <div class="letter-header">
                <span class="letter-from">From. ${escapeHtml(letter.from || '')}</span>
                <span class="letter-time">${escapeHtml(letter.date || '')}</span>
            </div>
            <div class="letter-text">${escapeHtml(letter.content || '')}</div>
        </div>
    `).join('');
}

function loadLettersLocal() {
    const letters = JSON.parse(localStorage.getItem('ourLetters') || '[]');
    renderLetters(letters);
}

function subscribeLetters() {
    if (!db) {
        loadLettersLocal();
        return;
    }

    if (lettersUnsubscribe) {
        lettersUnsubscribe();
        lettersUnsubscribe = null;
    }

    lettersUnsubscribe = db.collection('letters')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            const letters = snapshot.docs.map(doc => doc.data());
            renderLetters(letters);
        }, () => {
            loadLettersLocal();
        });
}

// Auto-focus password input on load
window.addEventListener('load', () => {
    passwordInput.focus();
    calculateDday();
    loadPhotos();
});
