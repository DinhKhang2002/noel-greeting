import './style.css'
import './css/slide-selector.css'
import './css/slide01.css'
import { initSlide02 } from './slide/slide02'
import { initSlide03 } from './slide/slide03'
import { initSlide04 } from './slide/slide04'
import { initSlide05 } from './slide/slide05'
import { initSlide06 } from './slide/slide06'
import { initSlide07 } from './slide/slide07'
import { imagePaths } from './utils/imageLoader'
  
// Import slide01 render function
function renderSlide01() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const config = { sender: 'KHANG DEV', showPreHeader: false, customMessage: undefined }
  
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
          <p class="title-subtitle">Chúc bạn có một mùa Giáng sinh An lành & Ấm áp.<br>Và một năm mới an khang thịnh vượng!</p>
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
  
  setupSlide01EventListeners()
}

function setupSlide01EventListeners() {
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
  
  // Add back button
  setTimeout(() => {
    const app = document.querySelector<HTMLDivElement>('#app')!
    const existingBackBtn = document.getElementById('backToSelector')
    if (!existingBackBtn) {
      const backBtn = document.createElement('button')
      backBtn.id = 'backToSelector'
      backBtn.className = 'back-button'
      backBtn.textContent = '← Quay lại danh sách'
      backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
      backBtn.addEventListener('click', () => navigateToSlide(''))
      app.appendChild(backBtn)
    }
  }, 100)
}

// Slide data
interface Slide {
  id: string
  name: string
  description: string
  thumbnail: string
}

const slides: Slide[] = [
  {
    id: 'slide01',
    name: 'Slide 01',
    description: 'Merry Christmas Card - Red Theme',
    thumbnail: imagePaths.hero
  },
  {
    id: 'slide02',
    name: 'Slide 02',
    description: 'Best Wish For A Christmas Party - White Theme',
    thumbnail: '/images/slide02-hero.png'
  },
  {
    id: 'slide03',
    name: 'Slide 03',
    description: 'Best wishes For A Christmas Party - Wishes Theme',
    thumbnail: '/images/slide03-hero-top.png'
  },
  {
    id: 'slide04',
    name: 'Slide 04',
    description: 'THE LUCKY ONE - Special Person Theme',
    thumbnail: '/images/slide04-hero.png'
  },
  {
    id: 'slide05',
    name: 'Slide 05',
    description: 'Merry Christmas - Classic Theme',
    thumbnail: '/images/slide05-hero.png'
  },
  {
    id: 'slide06',
    name: 'Slide 06',
    description: 'Thank you - Special One Theme',
    thumbnail: imagePaths.hero
  },
  {
    id: 'slide07',
    name: 'Slide 07',
    description: 'Lời kết - Christmas Closing Slide',
    thumbnail: '/images/slide07-image.png'
  }
]

// Render slide selector
function renderSlideSelector() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  
  app.innerHTML = `
    <div class="slide-selector">
      <div class="selector-header">
        <h1>Christmas App - Slides</h1>
        <p>Chọn một slide để xem</p>
      </div>
      <div class="slides-grid">
        ${slides.map(slide => `
          <div class="slide-card" data-slide-id="${slide.id}">
            <div class="slide-thumbnail">
              <img src="${slide.thumbnail}" alt="${slide.name}" onerror="this.style.backgroundColor='#CC0036'; this.style.minHeight='200px';" />
            </div>
            <div class="slide-info">
              <h3>${slide.name}</h3>
              <p>${slide.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="selector-footer">
        <button class="back-button" id="backToSelector" style="display: none;">← Quay lại danh sách</button>
      </div>
    </div>
  `
  
  setupSelectorEventListeners()
}

function setupSelectorEventListeners() {
  const slideCards = document.querySelectorAll('.slide-card')
  
  slideCards.forEach(card => {
    card.addEventListener('click', () => {
      const slideId = card.getAttribute('data-slide-id')
      if (slideId) {
        navigateToSlide(slideId)
      }
    })
  })
  
  const backButton = document.getElementById('backToSelector')
  if (backButton) {
    backButton.addEventListener('click', () => {
      navigateToSlide('')
    })
  }
}

// Navigation function
function navigateToSlide(slideId: string) {
  if (slideId === '') {
    // Show selector
    window.location.hash = ''
    renderSlideSelector()
    return
  }
  
  // Update URL hash
  window.location.hash = slideId
  
  // Show back button
  const backButton = document.getElementById('backToSelector')
  if (backButton) {
    backButton.style.display = 'block'
  }
  
  // Load corresponding slide
  switch (slideId) {
    case 'slide01':
      renderSlide01()
      break
    case 'slide02':
      initSlide02()
      // Add back button to slide02
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    case 'slide03':
      initSlide03()
      // Add back button to slide03
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    case 'slide04':
      initSlide04()
      // Add back button to slide04
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    case 'slide05':
      initSlide05()
      // Add back button to slide05
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    case 'slide07':
      initSlide07()
      // Add back button to slide07
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    case 'slide06':
      initSlide06()
      // Add back button to slide06
      setTimeout(() => {
        const app = document.querySelector<HTMLDivElement>('#app')!
        const existingBackBtn = document.getElementById('backToSelector')
        if (!existingBackBtn) {
          const backBtn = document.createElement('button')
          backBtn.id = 'backToSelector'
          backBtn.className = 'back-button'
          backBtn.textContent = '← Quay lại danh sách'
          backBtn.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 1000; padding: 10px 20px; background: rgba(255,255,255,0.9); border: none; border-radius: 5px; cursor: pointer; font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'
          backBtn.addEventListener('click', () => navigateToSlide(''))
          app.appendChild(backBtn)
        }
      }, 100)
      break
    default:
      renderSlideSelector()
  }
}

// Initialize app
function initApp() {
  // Check URL hash for routing
  const hash = window.location.hash.replace('#', '')
  
  if (hash && slides.some(s => s.id === hash)) {
    navigateToSlide(hash)
  } else {
    renderSlideSelector()
  }
  
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '')
    if (hash && slides.some(s => s.id === hash)) {
      navigateToSlide(hash)
    } else {
      renderSlideSelector()
    }
  })
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}
