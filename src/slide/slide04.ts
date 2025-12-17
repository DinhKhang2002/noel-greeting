import '../css/slide04.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide04ImagePaths } from '../utils/imageLoader'

function renderSlide04(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide04">
      <!-- Navigation -->
      <div class="navigation">
        <img src="${slide04ImagePaths.navigation}" alt="Christmas Logo" class="nav-logo" onerror="this.style.display='none'" />
      </div>

      <!-- Hero Image -->
      <div class="hero-image">
        <img src="${slide04ImagePaths.hero}" alt="Christmas Hero" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='370px';" />
      </div>

      <!-- Spacer White -->
      <div class="spacer white"></div>

      <!-- Lucky One Section -->
      <div class="lucky-section">
        <h1 class="lucky-title">THE LUCKY ONE</h1>
        <h2 class="lucky-name">${config.sender || 'Marry Anna'}</h2>
      </div>

      <!-- Photo Section -->
      <div class="photo-section">
        <img src="${slide04ImagePaths.receiver}" alt="Background" class="photo-bg-image" onerror="this.style.display='none'" />
        <div class="photo-frame">
          <img src="${slide04ImagePaths.receiver}" alt="Photo" class="photo-image" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='349px';" />
        </div>
      </div>

      <!-- Message Section -->
      <div class="message-section">
        <h3 class="message-title">Bạn thật là mội người may mắn!</h3>
        <p class="message-text">Có một người đặc biệt đã nhớ đến bạn trong dịp lễ này!</p>
      </div>

      <!-- Bottom Image -->
      <div class="bottom-image">
        <img src="${slide04ImagePaths.bottom}" alt="Christmas Bottom" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='342px';" />
      </div>
    </div>
  `
}

function setupEventListeners() {
  // Add any event listeners if needed
}

// Initialize slide04
let currentConfig: ChristmasCardConfig

export function initSlide04() {
  currentConfig = getConfig()
  renderSlide04(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide04Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide04(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
