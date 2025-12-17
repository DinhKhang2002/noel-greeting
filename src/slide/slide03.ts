import '../css/slide03.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide03ImagePaths } from '../utils/imageLoader'

function renderSlide03(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide03">
      <!-- Hero Image Top -->
      <div class="hero-image-top">
        <img src="${slide03ImagePaths.heroTop}" alt="Christmas Hero Top" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='182px';" />
      </div>

      <!-- Navigation -->
      <div class="navigation">
        <img src="${slide03ImagePaths.navigation}" alt="Christmas Logo" class="nav-logo" onerror="this.style.display='none'" />
      </div>

      <!-- Main Title Section -->
      <div class="main-title-section">
        <div class="main-title-content">
          <h1 class="main-title">Best wishes For A Christmas Party</h1>
          <p class="main-subtitle">${config.customMessage || 'Wishing you and your family all the best things and timeless treasures on this lovely holiday! Share your endless love and kindness with your nearest and dearest.'}</p>
        </div>
      </div>

      <!-- Spacer White -->
      <div class="spacer white large"></div>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${slide03ImagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Wish Section 1: Sức khỏe -->
      <div class="wish-section">
        <h2 class="wish-title">Sức khỏe</h2>
        <p class="wish-description">Sức khỏe dồi dào, luôn tìm được cho mình<br>niềm vui, bình an, hạnh phúc</p>
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Wish Section 2: Tiền tài -->
      <div class="wish-section">
        <h2 class="wish-title">Tiền tài</h2>
        <p class="wish-description">Công việc thuận lợi, sự nghiệp thăng tiến<br>Tiền vào như nước</p>
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Wish Section 3: An lành -->
      <div class="wish-section large">
        <h2 class="wish-title">An lành</h2>
        <p class="wish-description">Giáng sinh là một dịp lễ đặc biệt<br>hãy chậm lại một chút và chúc bạn<br>sớm tìm được sự an lành trong tâm hồn và cuộc sống!</p>
      </div>

      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${slide03ImagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Spacer White -->
      <div class="spacer white large"></div>

      <!-- Bottom Image -->
      <div class="bottom-image">
        <img src="${slide03ImagePaths.bottom}" alt="Christmas Bottom" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='182px';" />
      </div>
    </div>
  `
}

function setupEventListeners() {
  // Add any event listeners if needed
}

// Initialize slide03
let currentConfig: ChristmasCardConfig

export function initSlide03() {
  currentConfig = getConfig()
  renderSlide03(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide03Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide03(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
