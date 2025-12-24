/// <reference types="vite/client" />

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module 'qrcode'

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly url: string
  readonly hot?: ViteHotContext
  readonly glob: any
}

interface ViteHotContext {
  accept(): void
  accept(callback: (module: any) => void): void
  dispose(callback: (data: any) => void): void
  decline(): void
  invalidate(message?: string): void
  on(event: string, cb: (...args: any[]) => void): void
  off(event: string, cb: (...args: any[]) => void): void
  send(event: string, data: any): void
}

