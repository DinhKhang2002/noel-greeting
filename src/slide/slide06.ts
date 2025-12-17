import '../css/slide06.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide06ImagePaths } from '../utils/imageLoader'

function renderSlide06(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const receiverImage = config.photo2Url || slide06ImagePaths.receiver
  
  app.innerHTML = `
    <div class="slide06">
      <!-- Top Decoration (bells & leaves) -->
      <div class="top-decoration">
        <img src="${slide06ImagePaths.top}" alt="Christmas Top Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Merry Christmas Logo -->
      <div class="logo-section">
        <img src="${slide06ImagePaths.hero}" alt="Merry Christmas" class="logo-image" onerror="this.style.display='none'" />
      </div>

      <!-- Final Message Section -->
      <section class="final-message-section">
        <h1 class="final-title">Lời cuối cùng</h1>
        <p class="final-text">
          ${config.customMessage || 'Một mùa Giáng sinh lại đến và một năm cũ sắp qua, chúc mọi điều tốt đẹp sẽ luôn hiện hữu xung quanh bạn, tựa như ánh đèn lung linh đêm Giáng sinh, dẫn lối bạn đến với những hạnh phúc ngọt ngào nhất. Chúc những nỗ lực và sự cố gắng sẽ gói ghém lại những nỗi buồn của năm cũ, chỉ giữ lại niềm vui và sự an nhiên để làm hành trang bước vào năm mới.'}
        </p>
      </section>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${slide06ImagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Photo Section -->
      <div class="photo-section">
        <img src="${receiverImage}" alt="Special Person" class="final-photo" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='360px';" />
      </div>

      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${slide06ImagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Bottom Gifts Decoration -->
      <div class="bottom-decoration">
        <img src="${slide06ImagePaths.bottom}" alt="Christmas Gifts" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='220px';" />
      </div>
    </div>
  `
}

function setupEventListeners() {
  // Add any event listeners for slide06 if needed later
}

// Initialize slide06
let currentConfig: ChristmasCardConfig

export function initSlide06() {
  currentConfig = getConfig()
  renderSlide06(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide06Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide06(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
