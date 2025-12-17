import '../css/slide05.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide05ImagePaths } from '../utils/imageLoader'

function renderSlide05(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide05">
      <!-- Navigation Logo -->
      <div class="navigation">
        <img src="${slide05ImagePaths.navigation}" alt="Merry Christmas" class="nav-logo" onerror="this.style.display='none'" />
      </div>

      <!-- Hero Image -->
      <div class="hero-image">
        <img src="${slide05ImagePaths.hero}" alt="Christmas Hero" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='332px';" />
      </div>

      <!-- Intro Section -->
      <section class="intro-section">
        <h1 class="intro-title">Một vài lời chân thành,<br>Người ấy muốn gửi tới bạn</h1>
        <p class="intro-subtitle">Sometimes the warmest words are the ones we write from the heart.</p>
      </section>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${slide05ImagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Message Section -->
      <section class="message-section">
        <h2 class="message-recipient">Dear ${config.receiver || 'My special person'}</h2>
        <p class="message-body">
          ${config.customMessage || 'Có những điều rất khó để nói thành lời, nên anh gửi chúng vào tấm thiệp nhỏ này. Cảm ơn bạn vì đã xuất hiện trong cuộc đời anh, vì những khoảnh khắc bình yên, những lần lắng nghe, và cả những nụ cười rất chân thành. Mong rằng mỗi mùa Giáng sinh trôi qua, chúng ta vẫn còn có thể nghĩ về nhau với thật nhiều yêu thương và trân trọng.'}
        </p>
      </section>

      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${slide05ImagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Bottom Wave Image -->
      <div class="bottom-image">
        <img src="${slide05ImagePaths.bottom}" alt="Christmas Bottom" onerror="this.style.backgroundColor='#FFFFFF'; this.style.minHeight='193px';" />
      </div>
      
    </div>
  `
}

function setupEventListeners() {
  // No interactive elements on this slide for now
}

// Initialize slide05
let currentConfig: ChristmasCardConfig

export function initSlide05() {
  currentConfig = getConfig()
  renderSlide05(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Export for potential customization
export function updateSlide05Config(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderSlide05(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
