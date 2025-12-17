import '../css/slide03.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { slide03ImagePaths } from '../utils/imageLoader'

function renderSlide03(_config: ChristmasCardConfig) {
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
          <p class="main-subtitle">'Giữa không khí Giáng sinh rực rỡ, mong rằng mọi điều an lành và dịu dàng nhất sẽ tìm đến bạn. Cầu chúc cho trái tim bạn luôn được sưởi ấm bởi tình yêu thương, sự thấu hiểu và những khoảnh khắc bình yên bên những người bạn trân quý.'}</p>
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
        <p class="wish-description">Chúc bạn luôn khỏe mạnh, ngủ ngon mỗi tối,<br>thức dậy với một tâm trạng thật nhẹ nhàng và nhiều năng lượng tích cực.</p>
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Wish Section 2: Tiền tài -->
      <div class="wish-section">
        <h2 class="wish-title">Công việc & ước mơ</h2>
        <p class="wish-description">Mong rằng mọi dự định của bạn đều dần trở thành hiện thực,<br>công việc thuận lợi và luôn có những người sẵn sàng đồng hành, ủng hộ bạn.</p>
      </div>

      <!-- Spacer White -->
      <div class="spacer white small"></div>

      <!-- Wish Section 3: An lành -->
      <div class="wish-section large">
        <h2 class="wish-title">An lành</h2>
        <p class="wish-description">Giữa những bộn bề thường ngày, mong bạn luôn giữ được một góc bình yên cho riêng mình,<br>nơi có nụ cười, kỷ niệm đẹp và những người mà chỉ cần nghĩ tới thôi, trái tim đã thấy ấm lại.</p>
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
