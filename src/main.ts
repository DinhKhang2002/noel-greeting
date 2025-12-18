import './style.css'
import './css/slide01.css'
import './css/slide02.css'
import './css/slide03.css'
import './css/slide04.css'
import './css/slide05.css'
import './css/slide06.css'
import './css/slide07.css'
import QRCode from 'qrcode'
import { imagePaths } from './utils/imageLoader'
import { getConfig, saveConfigToLocalStorage, type ChristmasCardConfig } from './config'
import { initSlide02 } from './slide/slide02'
import { initSlide03 } from './slide/slide03'
import { initSlide04 } from './slide/slide04'
import { initSlide05 } from './slide/slide05'
import { initSlide06 } from './slide/slide06'
import { initSlide07 } from './slide/slide07'

// API_BASE: trong production, dùng VITE_API_BASE từ env (Netlify) hoặc cùng origin
// Trong dev, dùng localhost:4000
const API_BASE = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_BASE || '') 
  : 'http://localhost:4000'

function getAppElement(): HTMLDivElement {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) throw new Error('#app not found')
  return app
}

function setAppContent(html: string) {
  const app = getAppElement()
  app.classList.remove('fade-out')
  app.classList.add('fade-in')
  app.innerHTML = html
}

function renderLoading(message = 'Đang tải thiệp...') {
  setAppContent(`
    <div style="
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
      font-family: var(--font-poppins);
    ">
      <div class="spinner" style="
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 4px solid rgba(204, 0, 54, 0.2);
        border-top-color: var(--color-lava-red);
        animation: spin 0.8s linear infinite;
      "></div>
      <p style="color: #555;">${message}</p>
    </div>
  `)
}

// Slide01 renderer using config
function renderSlide01WithConfig(config: ChristmasCardConfig) {
  const app = getAppElement()

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
          <p class="title-subtitle">${config.customMessage || 'Chúc bạn có một mùa Giáng sinh An lành & Ấm áp.<br>Và một năm mới an khang thịnh vượng!'}</p>
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

// Slideshow
type SlideRunner = () => void

const slideRunners: SlideRunner[] = [
  () => renderSlide01WithConfig(getConfig()),
  () => initSlide02(),
  () => initSlide03(),
  () => initSlide04(),
  () => initSlide05(),
  () => initSlide06(),
  () => initSlide07()
]

function startSlideshow() {
  const app = getAppElement()
  let index = 0

  const runSlide = () => {
    app.classList.remove('fade-in')
    app.classList.add('fade-out')

    setTimeout(() => {
      slideRunners[index]()
      app.classList.remove('fade-out')
      app.classList.add('fade-in')

      index = (index + 1) % slideRunners.length
      setTimeout(runSlide, 7000) // 7s per slide
    }, 500) // fade duration
  }

  runSlide()
}

// Background music
function startBackgroundMusic() {
  const existing = document.getElementById('bg-music') as HTMLAudioElement | null
  if (existing) {
    existing.play().catch(() => {})
    return
  }

  const audio = document.createElement('audio')
  audio.id = 'bg-music'
  audio.src = '/audio/music.mp3'
  audio.loop = true
  audio.style.display = 'none'
  document.body.appendChild(audio)

  audio.play().catch(() => {
    // Browser chặn autoplay: yêu cầu click 1 lần
    const overlay = document.createElement('button')
    overlay.textContent = 'Nhấn để bật nhạc 🎵'
    overlay.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:1000;padding:10px 16px;border-radius:999px;border:none;background:#CC0036;color:#fff;font-size:14px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2);'
    overlay.addEventListener('click', () => {
      audio.play().catch(() => {})
      overlay.remove()
    })
    document.body.appendChild(overlay)
  })
}

// API helpers
type CardSummary = {
  id: string
  sender: string
  receiver: string
  createdAt: string
}
async function createCard(formData: FormData): Promise<{ id: string }> {
  const res = await fetch(`${API_BASE}/api/cards`, {
    method: 'POST',
    body: formData
  })
  if (!res.ok) {
    throw new Error('Failed to create card')
  }
  return res.json()
}

async function fetchCardConfig(id: string): Promise<ChristmasCardConfig> {
  const res = await fetch(`${API_BASE}/api/cards/${id}`)
  if (!res.ok) {
    throw new Error('Card not found')
  }
  return res.json()
}

async function fetchCards(): Promise<CardSummary[]> {
  const res = await fetch(`${API_BASE}/api/cards`)
  if (!res.ok) {
    throw new Error('Failed to load cards')
  }
  return res.json()
}

// Create card form page
function renderCreateCardPage() {
  setAppContent(`
    <div style="
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 24px;
      padding: 32px 24px 40px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      gap: 24px;
      font-family: var(--font-poppins);
    ">
      <header style="text-align: center; margin-bottom: 8px;">
        <h1 style="font-size: 28px; font-weight: 600; color: var(--color-lava-red); margin-bottom: 4px;">
          Christmas Card Generator
        </h1>
        <p style="color: var(--color-gray); font-size: 14px;">
          Nhập thông tin, upload 2 ảnh → tạo QR thiệp Giáng sinh để gửi cho người thân.
        </p>
      </header>

      <form id="cardForm" style="display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 24px; align-items: flex-start;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label for="sender" style="display:block;font-size:14px;font-weight:500;margin-bottom:4px;">Người gửi</label>
            <input id="sender" name="sender" type="text" placeholder="VD: KHANG DEV" value="KHANG DEV" required
              style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid #ddd;font-size:14px;outline:none;"/>
          </div>
          <div>
            <label for="receiver" style="display:block;font-size:14px;font-weight:500;margin-bottom:4px;">Người nhận</label>
            <input id="receiver" name="receiver" type="text" placeholder="VD: Anna" value="Anna" required
              style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid #ddd;font-size:14px;outline:none;"/>
          </div>
          <div>
            <label for="message" style="display:block;font-size:14px;font-weight:500;margin-bottom:4px;">Lời chúc</label>
            <textarea id="message" name="message" rows="5" placeholder="Viết vài dòng thật chân thành gửi đến người nhận..."
              style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid #ddd;font-size:14px;resize:vertical;outline:none;"></textarea>
            <p style="margin-top:4px;font-size:12px;color:var(--color-gray);">
              Nếu để trống, hệ thống sẽ dùng lời chúc mặc định trên các slide.
            </p>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;min-width:160px;">
              <label for="photo1" style="display:block;font-size:14px;font-weight:500;margin-bottom:4px;">Ảnh 1 (dùng cho slide 04)</label>
              <input id="photo1" name="photo1" type="file" accept="image/*"
                style="width:100%;font-size:13px;"/>
              <p style="margin-top:4px;font-size:12px;color:var(--color-gray);">
                Nên chọn ảnh chân dung hoặc ảnh đôi.
              </p>
            </div>
            <div style="flex:1;min-width:160px;">
              <label for="photo2" style="display:block;font-size:14px;font-weight:500;margin-bottom:4px;">Ảnh 2 (dùng cho slide 06)</label>
              <input id="photo2" name="photo2" type="file" accept="image/*"
                style="width:100%;font-size:13px;"/>
              <p style="margin-top:4px;font-size:12px;color:var(--color-gray);">
                Có thể chọn ảnh khác để tạo cảm giác câu chuyện.
              </p>
            </div>
          </div>

          <button type="submit" style="
            margin-top:8px;
            padding:10px 18px;
            border-radius:999px;
            border:none;
            background:var(--color-lava-red);
            color:#fff;
            font-weight:500;
            font-size:14px;
            cursor:pointer;
            align-self:flex-start;
            display:inline-flex;
            align-items:center;
            gap:8px;
          ">
            <span>✨ Tạo thiệp & QR code</span>
          </button>

          <p style="margin-top:4px;font-size:12px;color:var(--color-gray);">
            Sau khi tạo, bạn có thể tải ảnh QR hoặc copy link để gửi cho người nhận. Mỗi QR là một câu chuyện nhỏ dành riêng cho họ.
          </p>

          <hr style="margin:16px 0;border:none;border-top:1px dashed #eee;">

          <button id="showCardsBtn" type="button" style="
            margin-top:4px;
            padding:8px 14px;
            border-radius:999px;
            border:1px solid #ddd;
            background:#fff;
            color:#555;
            font-size:13px;
            cursor:pointer;
            align-self:flex-start;
          ">
            📚 Xem danh sách thiệp đã tạo
          </button>

          <div id="cardsList" style="margin-top:8px;font-size:12px;color:#666;"></div>
        </div>

        <div id="qrPreview" style="
          border-radius:18px;
          background:linear-gradient(180deg,#FFF5F7,#FFE7EC);
          padding:16px 16px 20px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;
          gap:12px;
          min-height:260px;
        ">
          <h2 style="font-size:16px;font-weight:600;color:var(--color-lava-red);margin-bottom:4px;">
            QR thiệp Giáng sinh
          </h2>
          <p style="font-size:13px;color:#555;text-align:center;max-width:260px;">
            Điền thông tin và nhấn \"Tạo thiệp\" để sinh QR. Người nhận chỉ cần quét QR để mở slideshow thiệp mừng.
          </p>
        </div>
      </form>
    </div>
  `)

  const form = document.getElementById('cardForm') as HTMLFormElement | null
  const showCardsBtn = document.getElementById('showCardsBtn') as HTMLButtonElement | null
  const cardsList = document.getElementById('cardsList') as HTMLDivElement | null

  if (form) {
    form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('button[type=\"submit\"]') as HTMLButtonElement | null
    const qrPreview = document.getElementById('qrPreview') as HTMLDivElement | null
    try {
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.textContent = 'Đang tạo thiệp...'
      }

      const formData = new FormData(form)
      const { id } = await createCard(formData)

      const cardUrl = new URL(`/card/${id}`, window.location.origin).toString()

      const dataUrl = await QRCode.toDataURL(cardUrl, {
        width: 256,
        margin: 1,
        color: {
          dark: '#CC0036',
          light: '#FFFFFF'
        }
      })

      if (qrPreview) {
        qrPreview.innerHTML = `
          <h2 style="font-size:16px;font-weight:600;color:var(--color-lava-red);margin-bottom:4px;">
            QR đã sẵn sàng!
          </h2>
          <img src="${dataUrl}" alt="QR Code" style="width:220px;height:220px;border-radius:16px;background:#fff;padding:12px;box-shadow:0 8px 24px rgba(0,0,0,0.12);" />
          <p style="font-size:13px;color:#555;text-align:center;max-width:260px;">
            Hãy tải ảnh QR xuống hoặc copy link dưới đây và gửi cho người nhận. Khi quét, họ sẽ được dẫn tới thiệp slideshow.
          </p>
          <div style="width:100%;display:flex;flex-direction:column;gap:8px;">
            <div style="font-size:11px;color:#666;word-break:break-all;background:#fff;padding:8px 10px;border-radius:10px;border:1px dashed #FFD1DD;">
              ${cardUrl}
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button id="downloadQrBtn" type="button" style="
                flex:1;min-width:120px;
                padding:8px 12px;border-radius:999px;border:none;
                background:var(--color-lava-red);color:#fff;font-size:13px;font-weight:500;cursor:pointer;
              ">
                ⬇️ Tải ảnh QR
              </button>
              <button id="copyLinkBtn" type="button" style="
                flex:1;min-width:120px;
                padding:8px 12px;border-radius:999px;border:1px solid var(--color-lava-red);
                background:#fff;color:var(--color-lava-red);font-size:13px;font-weight:500;cursor:pointer;
              ">
                📋 Copy link
              </button>
            </div>
          </div>
        `

        const downloadBtn = document.getElementById('downloadQrBtn') as HTMLButtonElement | null
        const copyBtn = document.getElementById('copyLinkBtn') as HTMLButtonElement | null

        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `christmas-card-${id}.png`
            document.body.appendChild(a)
            a.click()
            a.remove()
          })
        }

        if (copyBtn) {
          copyBtn.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(cardUrl)
              copyBtn.textContent = '✅ Đã copy!'
              setTimeout(() => {
                copyBtn.textContent = '📋 Copy link'
              }, 2000)
            } catch {
              alert('Không copy được link, hãy chọn và copy thủ công.')
            }
          })
        }
      }
    } catch (err) {
      console.error(err)
      alert('Tạo thiệp thất bại, hãy thử lại sau.')
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = '✨ Tạo thiệp & QR code'
      }
    }
    })
  }

  if (showCardsBtn && cardsList) {
    showCardsBtn.addEventListener('click', async () => {
      try {
        showCardsBtn.disabled = true
        showCardsBtn.textContent = 'Đang tải danh sách thiệp...'
        cardsList.textContent = ''

        const cards = await fetchCards()
        if (!cards.length) {
          cardsList.innerHTML = '<p>Chưa có thiệp nào được tạo.</p>'
        } else {
          const rows = cards
            .slice(0, 20)
            .map(card => {
              const url = new URL(`/card/${card.id}`, window.location.origin).toString()
              const created = new Date(card.createdAt)
              const dateText = created.toLocaleString('vi-VN')
              return `
                <tr>
                  <td style="padding:4px 6px;white-space:nowrap;">${card.sender}</td>
                  <td style="padding:4px 6px;white-space:nowrap;">${card.receiver}</td>
                  <td style="padding:4px 6px;font-size:11px;color:#999;">${dateText}</td>
                  <td style="padding:4px 6px;">
                    <a href="${url}" target="_blank" style="font-size:11px;color:var(--color-lava-red);text-decoration:none;">Mở thiệp</a>
                  </td>
                </tr>
              `
            }).join('')

          cardsList.innerHTML = `
            <div style="margin-top:4px;padding:8px 10px;border-radius:12px;background:#fafafa;border:1px solid #eee;max-height:220px;overflow:auto;">
              <div style="margin-bottom:6px;font-weight:500;color:#444;">Danh sách thiệp gần đây</div>
              <table style="width:100%;border-collapse:collapse;font-size:12px;">
                <thead>
                  <tr style="text-align:left;color:#888;">
                    <th style="padding:4px 6px;">Người gửi</th>
                    <th style="padding:4px 6px;">Người nhận</th>
                    <th style="padding:4px 6px;">Thời gian</th>
                    <th style="padding:4px 6px;"></th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          `
        }
      } catch (err) {
        console.error(err)
        cardsList.innerHTML = '<p style="color:#c00;">Không tải được danh sách thiệp.</p>'
      } finally {
        showCardsBtn.disabled = false
        showCardsBtn.textContent = '📚 Xem danh sách thiệp đã tạo'
      }
    })
  }
}

async function initCreatePage() {
  renderCreateCardPage()
}

async function initCardSlideshowPage(cardId: string) {
  renderLoading()
  try {
    const config = await fetchCardConfig(cardId)
    saveConfigToLocalStorage(config)
    startBackgroundMusic()
    startSlideshow()
  } catch (err) {
    console.error(err)
    setAppContent(`
      <div style="
        width:100%;
        min-height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        gap:12px;
        font-family:var(--font-poppins);
        text-align:center;
        padding:20px;
      ">
        <h1 style="font-size:22px;color:var(--color-lava-red);margin-bottom:4px;">Không tìm thấy thiệp</h1>
        <p style="font-size:14px;color:#555;">Đường dẫn thiệp không hợp lệ hoặc đã bị xoá.</p>
        <button id="backHomeBtn" style="
          margin-top:8px;
          padding:8px 16px;
          border-radius:999px;
          border:none;
          background:var(--color-lava-red);
          color:#fff;
          font-size:14px;
          cursor:pointer;
        ">
          ← Quay về trang tạo thiệp
        </button>
      </div>
    `)
    const backBtn = document.getElementById('backHomeBtn')
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.pushState({}, '', '/')
        initCreatePage()
      })
    }
  }
}

function initRouter() {
  const path = window.location.pathname
  const cardMatch = path.match(/^\/card\/([^/]+)\/?$/)

  if (cardMatch) {
    const cardId = cardMatch[1]
    initCardSlideshowPage(cardId)
  } else {
    initCreatePage()
  }
}

// Initialize app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRouter)
} else {
  initRouter()
}
