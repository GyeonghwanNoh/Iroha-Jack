# Only for You 🤍

여자친구를 위한 깜짝 서프라이즈 웹사이트

## 🎁 사용 방법

### 1. 사진 추가하기

`index.html` 파일을 열고, 사진 placeholder 부분을 찾으세요:

```html
<div class="photo-placeholder">
    <span class="photo-number">1</span>
</div>
```

이 부분을 아래처럼 바꾸세요:

```html
<div class="photo-placeholder">
    <img src="photos/photo1.jpg" alt="Our moment">
</div>
```

**사진 준비:**
1. `only-for-you` 폴더 안에 `photos` 폴더 만들기
2. 사진 10장을 `photo1.jpg`, `photo2.jpg`, ... `photo10.jpg`로 저장
3. 10개 placeholder 모두 바꾸기

### 2. 웹사이트 실행하기

**로컬에서 보기:**
1. `index.html` 파일을 더블클릭
2. 또는 브라우저로 드래그해서 열기

**온라인으로 공유하기 (무료):**

#### 방법 1: GitHub Pages
1. GitHub 계정 만들기 (무료)
2. 새 repository 생성 (Private으로 설정 가능)
3. 모든 파일 업로드
4. Settings > Pages에서 GitHub Pages 활성화
5. 링크 복사해서 여자친구에게 보내기

#### 방법 2: Netlify (추천!)
1. [Netlify](https://www.netlify.com) 가입 (무료)
2. "Add new site" > "Deploy manually" 클릭
3. `only-for-you` 폴더 전체를 드래그 & 드롭
4. 자동으로 링크 생성됨 (예: `your-site-name.netlify.app`)
5. Site settings에서 이름 변경 가능

#### 방법 3: Vercel
1. [Vercel](https://vercel.com) 가입 (무료)
2. "New Project" 클릭
3. 폴더 업로드
4. 배포 완료!

### 3. 전달 방법

💌 **추천 메시지:**
```
"새해니까 작은 거 하나 준비했어"
[링크]
(비밀번호는 알아서 찾아봐 ㅎㅎ)
```

### 4. 커스터마이징

**색상 변경하기:**
`style.css` 파일에서:
- `#C9A0A0` (연한 핑크) → 원하는 색상 코드로 변경
- `#F5E6D3` (베이지 배경) → 원하는 배경색으로 변경

**문구 수정하기:**
`index.html`에서 따옴표 안의 문장들을 원하는 대로 수정하세요!

**비밀번호 변경하기:**
`script.js` 파일에서:
```javascript
const correctPassword = '0729';  // 원하는 숫자로 변경
```

## 📧 이메일 알림(선택)

편지를 보내면 이메일로 “새 편지가 도착했어요” 알림을 받으려면 **EmailJS**를 사용하세요.

### 1) EmailJS 가입 및 템플릿 생성
1. [EmailJS](https://www.emailjs.com/) 가입 (무료)
2. **Email Services**에서 Gmail 등 연결
3. **Email Templates**에서 새 템플릿 생성

**템플릿 변수 예시:**
- `from_name`
- `message`
- `letter_time`
- `to_email`
- `to_name`

### 2) `script.js` 설정
`script.js` 상단의 `emailConfig`를 채워주세요:
```javascript
const emailConfig = {
    enabled: true,
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    recipients: {
        '공주님 💖': { email: 'iroha0805.168@yahoo.ne.jp', name: 'Iroha' },
        '왕자님 💙': { email: 'korea07291@gmail.com', name: 'Korea' }
    }
};
```

> `enabled`를 `true`로 바꾸면 편지 전송 시 이메일 알림이 전송됩니다.

## 📱 호환성

- 모든 최신 브라우저 지원 (Chrome, Safari, Edge, Firefox)
- 모바일 반응형 디자인
- iPhone, Android 모두 완벽 작동

## ✨ 포함된 기능

✅ 비밀번호 잠금 화면 (0729)
✅ 귀여운 메인 메시지
✅ 사진 10장 갤러리
✅ 인터랙티브 체크리스트
✅ 감동적인 편지
✅ 숨겨진 메시지
✅ 부드러운 사운드 효과
✅ 모바일 최적화

## 🎵 사운드 효과

사이트는 Web Audio API를 사용해 자동으로 작은 소리를 재생합니다:
- 비밀번호 입력 성공: 부드러운 클릭
- 체크박스 선택: 작은 팝
- 숨겨진 메시지: 은은한 차임

## 💡 팁

1. 사진은 가로 사진이 더 예쁘게 보여요
2. 사진 크기는 자동으로 조절되니 걱정 안 해도 됩니다
3. 모바일에서 확인해보세요! 모바일 화면이 더 예쁠 수도 있어요
4. 비밀번호 힌트를 너무 쉽게 주지 마세요 (설렘 포인트!)

## ❤️ 행운을 빕니다!

멋진 서프라이즈 되길 바랍니다 🤍
