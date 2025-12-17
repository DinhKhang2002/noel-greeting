// Image loader utility with fallback support

export interface ImageInfo {
  src: string
  alt: string
  fallback?: string
}

export function loadImageWithFallback(img: HTMLImageElement, src: string, fallback?: string): void {
  img.src = src
  
  img.onerror = () => {
    if (fallback) {
      img.src = fallback
    } else {
      // Create a placeholder
      img.style.backgroundColor = '#CC0036'
      img.style.display = 'flex'
      img.style.alignItems = 'center'
      img.style.justifyContent = 'center'
      img.style.color = 'white'
      img.style.fontSize = '12px'
      img.alt = img.alt || 'Image placeholder'
    }
  }
}

export const imagePaths = {
  navigation: '/images/navigation.svg',
  hero: '/images/hero-image.png',
  decorationTop: '/images/decoration-top.png',
  decorationBottom: '/images/decoration-bottom.png',
  social: [
    '/images/social-1.png',
    '/images/social-2.png',
    '/images/social-3.png',
    '/images/social-4.png',
    '/images/social-5.png',
    '/images/social-6.png'
  ]
}

export const slide02ImagePaths = {
  navigation: '/images/slide02-navigation.svg',
  hero: '/images/slide02-hero.png',
  decorationTop: '/images/slide02-decoration-top.png',
  decorationBottom: '/images/slide02-decoration-bottom.png',
  bottom: '/images/slide02-bottom.png'
}

export const slide03ImagePaths = {
  navigation: '/images/slide03-navigation.svg',
  heroTop: '/images/slide03-hero-top.png',
  decorationTop: '/images/slide03-decoration-top.png',
  decorationBottom: '/images/slide03-decoration-bottom.png',
  bottom: '/images/slide03-bottom.png'
}

export const slide04ImagePaths = {
  navigation: '/images/slide04-navigation.svg',
  hero: '/images/slide04-hero.png',
  receiver: '/images/slide04-background.png',
  bottom: '/images/slide04-bottom.png'
}

export const slide05ImagePaths = {
  navigation: '/images/slide05-navigation.svg',
  hero: '/images/slide05-hero.png',
  decorationTop: '/images/slide05-decoration-top.png',
  decorationBottom: '/images/slide05-decoration-bottom.png',
  bottom: '/images/slide05-bottom.svg'
}

export const slide06ImagePaths = {
  top: '/images/slide06-top.svg',
  hero: '/images/slide06-nav.svg',
  receiver: '/images/slide06-image.png',
  decorationTop: '/images/slide06-decoration-top.png',
  decorationBottom: '/images/slide06-decoration-bottom.png',
  bottom: '/images/slide06-bottom.svg'
}

export const slide07ImagePaths = {
  top: '/images/slide07-top.svg',
  hero: '/images/slide07-hero.svg',
  receiver: '/images/slide07-image.png',
  decorationTop: '/images/slide07-decoration-top.png',
  decorationBottom: '/images/slide07-decoration-bottom.png',
  bottom: '/images/slide07-bottom.svg'
}