import '../css/slide02.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide02ImagePaths } from '../utils/imageLoader'

function renderSlide02(_config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide02">
      <!-- Hero Image -->
      <div class="hero-image">
        <img src="${slide02ImagePaths.hero}" alt="Christmas Hero" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='332px';" />
      </div>

      <!-- Spacer White -->
      <div class="spacer white large"></div>

      <!-- Navigation -->
      <div class="navigation">
        <img src="${slide02ImagePaths.navigation}" alt="Christmas Logo" class="nav-logo" onerror="this.style.display='none'" />
      </div>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${slide02ImagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Title Section -->
      <div class="title-section">
        <div class="title-content">
          <h1 class="title-main">Best Wish For A Christmas Party</h1>
          <p class="title-subtitle">Chúc bạn và những người thân yêu có một mùa Giáng sinh trọn vẹn yêu thương, đủ đầy bình an. Mong rằng trong những ngày se lạnh này, bạn luôn được sưởi ấm bởi nụ cười, những cái ôm và sự quan tâm chân thành từ những người thật sự quan trọng với bạn.</p>
        </div>
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${slide02ImagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Bottom Image -->
      <div class="bottom-image">
        <img src="${slide02ImagePaths.bottom}" alt="Christmas Bottom" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='193px';" />
      </div>
    </div>
  `
}

function setupEventListeners() {
  // Add any event listeners if needed
}

// Initialize slide02
let currentConfig: ChristmasCardConfig

export function initSlide02() {
  currentConfig = getConfig()
  renderSlide02(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide02Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide02(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
