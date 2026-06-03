// Typing effect on the hero section
const text = "Today the world celebrates the most beautiful soul. ❤️";
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

// Celebration alert function
function fireworks() {
  alert("🎆 Happy Birthday Onko ❤️ 🎆");
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