import '../css/slide07.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide07ImagePaths } from '../utils/imageLoader'

function renderSlide07(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide07">
      <!-- Top Decoration (bells & leaves) -->
      <div class="navigation">
        <img src="${slide07ImagePaths.top}" alt="Christmas Top Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Hero Image -->
      <div class="hero-image">
        <img src="${slide07ImagePaths.hero}" alt="Christmas Hero" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='332px';" />
      </div>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${slide07ImagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Title Section -->
      <div class="title-section">
        <h1 class="title-main">MERRY CHRISTMAS AND HAPPY NEW YEAR!</h1>
        <p class="title-subtitle">Chúc bạn có một mùa Giáng sinh An lành & Ấm áp.<br>Và một năm mới an khang thịnh vượng!</p>
        <br/>
        <h2 class="title-sender">FROM ${config.sender} WITH LOVE</h2>
      </div>
      
  
      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${slide07ImagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Bottom Wave Image -->
      <div class="bottom-image">
        <img src="${slide07ImagePaths.bottom}" alt="Christmas Bottom" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='193px';" />
      </div>
    </div>
  `
}

function setupEventListeners() {
  // Add any event listeners for slide07 if needed later
}

// Initialize slide07
let currentConfig: ChristmasCardConfig

export function initSlide07() {
  currentConfig = getConfig()
  renderSlide07(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide07Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide07(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
