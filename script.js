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

// Celebration alert function
function fireworks() {
  alert("🎆 Happy Birthday Onko ❤️ 🎆");
  triggerBalloonAnimation();
}

// --- Balloon & Star Animation ---
function triggerBalloonAnimation() {
  // Create multiple balloons
  const balloonCount = 8;
  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => createBalloon(), i * 150);
  }
  // Create stars continuously
  createStarBurst();
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#B19CD9'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  balloon.style.cssText = `
    position: fixed;
    bottom: -50px;
    left: ${Math.random() * 100}%;
    width: 40px;
    height: 50px;
    background: ${randomColor};
    border-radius: 50% 50% 50% 0;
    transform: rotate(${Math.random() * 360}deg);
    z-index: 100;
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
  
  // Animate balloon floating up
  const duration = 4000 + Math.random() * 2000;
  const keyframes = `
    @keyframes float-up-${Math.random()} {
      0% {
        transform: translateY(0) rotate(${Math.random() * 360}deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-${window.innerHeight + 200}px) translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
  
  const animName = `float-up-${Math.random()}`;
  balloon.style.animation = `${animName} ${duration}ms ease-in forwards`;
  
  setTimeout(() => balloon.remove(), duration);
}

function createStarBurst() {
  const starCount = 20;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 3 + 2;
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
    const keyframes = `
      @keyframes twinkle-${Math.random()} {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    const animName = `twinkle-${Math.random()}`;
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
  'photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg','photo5.jpg','photo6.jpg','photo7.jpg','photo8.png','photo9.jpg','photo10.jpg','photo11.jpg','photo12.jpg','photo13.jpg','photo14.jpg','photo15.jpg'
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
