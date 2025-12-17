import '../css/slide01.css'
import { getConfig, type ChristmasCardConfig, saveConfigToLocalStorage } from '../config'
import { imagePaths } from '../utils/imageLoader'

function renderApp(config: ChristmasCardConfig) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide01">
      <!-- Navigation -->
      <div class="navigation">
        <img src="${imagePaths.navigation}" alt="Christmas Logo" class="nav-logo" onerror="this.style.display='none'" />
      </div>

      <!-- Hero Image -->
      <div class="hero-image">
        <img src="${imagePaths.hero}" alt="Christmas Hero" onerror="this.style.backgroundColor='#CC0036'; this.style.minHeight='300px';" />
      </div>

      <!-- Spacer Red -->
      <div class="spacer red small"></div>

      <!-- Decoration Top -->
      <div class="decoration-top">
        <img src="${imagePaths.decorationTop}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Title Section -->
      <div class="title-section">
        <div class="title-content">
          <h1 class="title-main">Merry Christmas and a Happy New Year!</h1>
          <p class="title-subtitle">'Chúc bạn có một mùa Giáng sinh An lành & Ấm áp.<br>Và một năm mới an khang thịnh vượng!'}</p>
          <h2 class="title-sender">LOVE FROM ${config.sender}</h2>
        </div>
      </div>

      <!-- Decoration Bottom -->
      <div class="decoration-bottom">
        <img src="${imagePaths.decorationBottom}" alt="Decoration" onerror="this.style.display='none'" />
      </div>

      <!-- Spacer Red -->
      <div class="spacer red large"></div>

      <!-- Footer -->
      <footer class="footer">
        <div class="social-icons">
          ${imagePaths.social.map((path, index) => 
            `<a href="#" class="social-icon"><img src="${path}" alt="Social ${index + 1}" onerror="this.style.display='none'" /></a>`
          ).join('')}
        </div>
        
        <div class="footer-line"></div>
        
        <nav class="footer-nav">
          <a href="#" class="footer-link">MY ACCOUNT</a>
          <a href="#" class="footer-link">YOUR SERVICE</a>
          <a href="#" class="footer-link">CAREERS</a>
          <a href="#" class="footer-link">PRIVACY POLICY</a>
        </nav>
        
        <p class="footer-copyright">
          ©2023 Christmas, Inc. The brand names, slogans, logos, other trademarks of FridaySale's goods, promotions belong exclusively to FridaySale Inc.
        </p>
        
        <a href="#" class="footer-unsubscribe">Unsubscribe</a>
      </footer>
    </div>
  `
}

function setupEventListeners() {
  // Handle social icons (add your social media URLs)
  const socialIcons = document.querySelectorAll('.social-icon')
  const socialUrls = [
    'https://facebook.com',
    'https://twitter.com',
    'https://instagram.com',
    'https://linkedin.com',
    'https://youtube.com',
    'https://pinterest.com'
  ]
  
  socialIcons.forEach((icon, index) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault()
      if (socialUrls[index]) {
        window.open(socialUrls[index], '_blank')
      }
    })
  })
}

// Initialize app
let currentConfig: ChristmasCardConfig

function initApp() {
  currentConfig = getConfig()
  renderApp(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

// Export for potential customization
export function updateConfig(newConfig: Partial<ChristmasCardConfig>) {
  currentConfig = { ...currentConfig, ...newConfig }
  renderApp(currentConfig)
  saveConfigToLocalStorage(currentConfig)
  setupEventListeners()
}
