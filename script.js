// Typing effect on the hero section
const text = "Today's the birthday of the most beautiful soul. ❤️";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 50);
  }
}

// Open gift button function
function openGift() {
  document.getElementById("surprise").classList.remove("hidden");
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  // Trigger balloon and star animation
  triggerBalloonAnimation();
}

// Cut Cake function with animation
function cutCake() {
  const cakeContainer = document.getElementById('cake-container');
  cakeContainer.classList.remove('hidden');
  
  // Create candles
  createCandles();
  
  // Wait for animation then trigger balloons and confetti
  setTimeout(() => {
    createConfetti();
    // Enhanced balloon animation with more balloons
    triggerEnhancedBalloonAnimation();
    
    // Close cake after animation
    setTimeout(() => {
      cakeContainer.classList.add('hidden');
    }, 3000);
  }, 1500);
}

function createCandles() {
  const candlesContainer = document.getElementById('candles-container');
  candlesContainer.innerHTML = '';
  
  const candleCount = 7;
  for (let i = 0; i < candleCount; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    
    const flame = document.createElement('div');
    flame.className = 'flame';
    
    candle.appendChild(flame);
    candlesContainer.appendChild(candle);
  }
}

function createConfetti() {
  const confettiCount = 50;
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => createConfettiPiece(), i * 30);
  }
}

function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#B19CD9', '#FFD700', '#FF1493'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.cssText = `
    background: ${randomColor};
    left: ${window.innerWidth / 2}px;
    top: ${window.innerHeight / 2}px;
    position: fixed;
    z-index: 400;
  `;
  
  document.body.appendChild(confetti);
  
  const duration = Math.random() * 2000 + 1500;
  const randomX = (Math.random() - 0.5) * 400;
  const randomY = Math.random() * 400 + 200;
  const rotation = Math.random() * 720;
  
  const keyframes = `
    @keyframes confetti-fall-${Math.random()} {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translate(${randomX}px, ${randomY}px) rotate(${rotation}deg);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
  
  const animName = `confetti-fall-${Math.random()}`;
  confetti.style.animation = `${animName} ${duration}ms ease-out forwards`;
  
  setTimeout(() => confetti.remove(), duration);
}

// --- Balloon & Star Animation ---
function triggerBalloonAnimation() {
  // Create multiple balloons
  const balloonCount = 12;
  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => createBalloon(), i * 100);
  }
  // Create stars continuously
  createStarBurst();
}

// Enhanced Balloon Animation - More balloons with faster creation
function triggerEnhancedBalloonAnimation() {
  // Create more balloons rapidly after cake cutting
  const balloonCount = 25;
  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => createBalloon(), i * 50);
  }
  // Create stars continuously
  createStarBurst();
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#B19CD9', '#FF1493', '#00CED1', '#FFD700', '#FF69B4', '#FF4500', '#32CD32', '#FF00FF', '#00BFFF'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRotation = Math.random() * 360;
  const randomLeft = Math.random() * 100;
  
  balloon.style.cssText = `
    position: fixed;
    bottom: -50px;
    left: ${randomLeft}%;
    width: 40px;
    height: 50px;
    background: ${randomColor};
    border-radius: 50% 50% 50% 0;
    z-index: 100;
    box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2);
  `;
  
  const string = document.createElement('div');
  string.style.cssText = `
    position: absolute;
    width: 2px;
    height: 80px;
    background: rgba(0,0,0,0.2);
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
  `;
  
  balloon.appendChild(string);
  document.body.appendChild(balloon);
  
  // Animate balloon floating up with varied speed and movement
  const duration = 3500 + Math.random() * 2500;
  const sway = (Math.random() - 0.5) * 300;
  const randomEndRotation = Math.random() * 360;
  const randomEndX = (Math.random() - 0.5) * 200;
  
  const animName = `float-up-${Date.now()}-${Math.random()}`;
  const keyframes = `
    @keyframes ${animName} {
      0% {
        transform: translateY(0) translateX(0) rotate(${randomRotation}deg) scale(1);
        opacity: 1;
      }
      50% {
        transform: translateY(-${window.innerHeight / 2}px) translateX(${sway}px) rotate(${randomEndRotation}deg) scale(1.05);
        opacity: 1;
      }
      100% {
        transform: translateY(-${window.innerHeight + 200}px) translateX(${randomEndX}px) rotate(${randomEndRotation + 180}deg) scale(0.8);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
  
  balloon.style.animation = `${animName} ${duration}ms ease-in forwards`;
  
  setTimeout(() => balloon.remove(), duration);
}

function createStarBurst() {
  const starCount = 30;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 4 + 2;
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * (window.innerHeight * 0.8);
    
    star.style.cssText = `
      position: fixed;
      left: ${randomX}px;
      top: ${randomY}px;
      width: ${size}px;
      height: ${size}px;
      background: #FFD700;
      border-radius: 50%;
      box-shadow: 0 0 ${size * 2}px #FFD700;
      z-index: 50;
      pointer-events: none;
    `;
    
    document.body.appendChild(star);
    
    // Twinkling animation
    const duration = Math.random() * 1500 + 800;
    const animName = `twinkle-${Date.now()}-${Math.random()}`;
    const keyframes = `
      @keyframes ${animName} {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    star.style.animation = `${animName} ${duration}ms ease-in-out infinite`;
    
    setTimeout(() => star.remove(), 8000);
  }
}

// Secret Vault password verification
function checkPass() {
  const passwordInput = document.getElementById("pwd").value;
  if (passwordInput === "Onkendu") {
    document.getElementById("secret").classList.remove("hidden");
  } else {
    alert("Wrong password ❤️");
  }
}

// Central list of images (update names if you add/remove files)
const IMAGES = [
  'photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg','photo5.jpg','photo6.jpg','photo7.jpg','photo8.png','photo9.jpg','photo10.jpg','photo11.jpg','photo12.jpg','photo13.jpg','photo14.jpg','photo15.jpg','photo16.png','photo17.jpg','photo18.jpg'
];

// Load all images from the images/ folder into the gallery
function loadGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  IMAGES.forEach(name => {
    const img = document.createElement('img');
    img.src = `images/${name}`;
    img.alt = name;
    img.loading = 'lazy';
    img.onerror = () => img.style.display = 'none';
    gallery.appendChild(img);
  });
}

// --- Lightbox / gallery interactions ---
let currentIndex = 0;
function createLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox hidden';
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">&times;</button>
    <button class="lb-prev" aria-label="Previous">&#10094;</button>
    <div class="lb-inner"><img class="lb-image" src="" alt=""/></div>
    <button class="lb-next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(lb);

  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', prevLightboxSlide);
  lb.querySelector('.lb-next').addEventListener('click', nextLightboxSlide);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });
}

function openLightbox(index) {
  createLightbox();
  currentIndex = index;
  showLightbox(currentIndex);
  document.getElementById('lightbox').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.add('hidden');
  document.body.style.overflow = '';
}

function showLightbox(index) {
  const img = document.querySelector('.lb-image');
  if (!img) return;
  const name = IMAGES[index];
  img.src = `images/${name}`;
  img.alt = name;
}

function nextLightboxSlide() {
  currentIndex = (currentIndex + 1) % IMAGES.length;
  showLightbox(currentIndex);
}

function prevLightboxSlide() {
  currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
  showLightbox(currentIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || lb.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') nextLightboxSlide();
  if (e.key === 'ArrowLeft') prevLightboxSlide();
  if (e.key === 'Escape') closeLightbox();
});

// Enhance gallery images with click handlers after they are added
function enhanceGalleryClicks() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const imgs = Array.from(gallery.querySelectorAll('img'));
  imgs.forEach((img, idx) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      openLightbox(idx);
      // also update slideshow to the same image
      showSlideshow(idx);
    });
  });
}

// --- Slideshow ---
let ssIndex = 0;
let ssInterval = null;
const SS_DELAY = 3500;

function showSlideshow(index) {
  const imgEl = document.getElementById('ss-image');
  const caption = document.getElementById('ss-caption');
  if (!imgEl) return;
  ssIndex = (index + IMAGES.length) % IMAGES.length;
  const name = IMAGES[ssIndex];
  imgEl.src = `images/${name}`;
  caption.textContent = name.replace(/\.(jpg|png|jpeg)$/i, '').replace(/_/g, ' ');
}

function nextSlideshow() { showSlideshow(ssIndex + 1); }
function prevSlideshow() { showSlideshow(ssIndex - 1); }

function playSlideshow() {
  stopSlideshow();
  ssInterval = setInterval(() => { showSlideshow(ssIndex + 1); }, SS_DELAY);
  document.getElementById('ss-play').textContent = '⏸';
}

function stopSlideshow() {
  if (ssInterval) clearInterval(ssInterval);
  ssInterval = null;
  const btn = document.getElementById('ss-play');
  if (btn) btn.textContent = '⏯';
}

function toggleSlideshow() {
  if (ssInterval) stopSlideshow(); else playSlideshow();
}

function startSecretSlideshow() {
  const slideshow = document.getElementById('secret-slideshow');
  if (!slideshow) return;
  slideshow.classList.remove('hidden');
  showSlideshow(0);
  playSlideshow();
  // Auto-start without user interaction
  setTimeout(() => playSlideshow(), 100);
}

function initSlideshow() {
  const prev = document.getElementById('ss-prev');
  const next = document.getElementById('ss-next');
  const play = document.getElementById('ss-play');
  if (prev) prev.addEventListener('click', () => { prevSlideshow(); stopSlideshow(); });
  if (next) next.addEventListener('click', () => { nextSlideshow(); stopSlideshow(); });
  if (play) play.addEventListener('click', toggleSlideshow);
  // Don't show initially if it's in the secret section (hidden by default)
  const slideshow = document.getElementById('secret-slideshow');
  if (!slideshow || slideshow.classList.contains('hidden')) return;
  showSlideshow(0);
}

// --- Background music control ---
function initMusic() {
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  if (!music || !btn) return;

  // try to autoplay muted (browsers may block audible autoplay)
  music.muted = true;
  music.play().catch(() => {});

  btn.addEventListener('click', () => {
    if (music.paused) {
      music.muted = false;
      music.play();
      btn.textContent = '🔊 Pause Music';
    } else {
      music.pause();
      btn.textContent = '🔊 Play Music';
    }
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  type();
  loadGallery();
  createLightbox();
  enhanceGalleryClicks();
  initSlideshow();
  initMusic();
});
// --- Sayari edit/save helpers ---
function editSayari() {
  const text = document.getElementById('sayari-text');
  const input = document.getElementById('sayari-input');
  const editBtn = document.getElementById('sayari-edit-btn');
  const saveBtn = document.getElementById('sayari-save-btn');
  if (!text || !input || !editBtn || !saveBtn) return;
  input.value = text.textContent.trim();
  text.classList.add('hidden');
  input.classList.remove('hidden');
  editBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
  input.focus();
}
// --- Sayari edit/save helpers ---
function saveSayari() {
  const text = document.getElementById('sayari-text');
  const input = document.getElementById('sayari-input');
  const editBtn = document.getElementById('sayari-edit-btn');
  const saveBtn = document.getElementById('sayari-save-btn');
  if (!text || !input || !editBtn || !saveBtn) return;
  text.textContent = input.value || '—';
  text.classList.remove('hidden');
  input.classList.add('hidden');
  editBtn.classList.remove('hidden');
  saveBtn.classList.add('hidden');
}
