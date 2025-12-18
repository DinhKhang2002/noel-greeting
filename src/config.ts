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

export function getConfigFromURL(): Partial<ChristmasCardConfig> {
  // Không dùng URL params nữa, chỉ lấy config từ localStorage (đã được lưu từ API)
  // Trả về object rỗng để không override storedConfig
  return {}
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
  
  // Ưu tiên storedConfig từ localStorage (đã được lưu từ API khi mở /card/:id)
  // Nếu có storedConfig, dùng nó làm base và chỉ merge với urlConfig
  if (storedConfig) {
    return {
      ...storedConfig,
      ...urlConfig
    }
  }
  
  // Nếu không có storedConfig, dùng defaultConfig và merge với urlConfig
  return {
    ...defaultConfig,
    ...urlConfig
  }
}
