export interface ChristmasCardConfig {
  sender: string
  receiver: string
  showPreHeader?: boolean
  customMessage?: string
  photo1Url?: string
  photo2Url?: string
}

export const defaultConfig: ChristmasCardConfig = {
  sender: 'KHANG DEV',
  receiver: 'Anna',
  showPreHeader: false,
  customMessage: undefined,
  photo1Url: undefined,
  photo2Url: undefined
}

export function getConfigFromURL(): ChristmasCardConfig {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    sender: urlParams.get('sender') || defaultConfig.sender,
    receiver: urlParams.get('receiver') || defaultConfig.receiver,
    showPreHeader: urlParams.get('hidePreHeader') !== 'true',
    customMessage: urlParams.get('message') || undefined
  }
}

export function saveConfigToLocalStorage(config: ChristmasCardConfig): void {
  try {
    localStorage.setItem('christmasCardConfig', JSON.stringify(config))
  } catch (e) {
    console.warn('Failed to save config to localStorage', e)
  }
}

export function loadConfigFromLocalStorage(): ChristmasCardConfig | null {
  try {
    const stored = localStorage.getItem('christmasCardConfig')
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    console.warn('Failed to load config from localStorage', e)
    return null
  }
}

export function getConfig(): ChristmasCardConfig {
  const urlConfig = getConfigFromURL()
  const storedConfig = loadConfigFromLocalStorage()
  
  return {
    ...defaultConfig,
    ...storedConfig,
    ...urlConfig
  }
}
