import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// Paths
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')
const DATA_DIR = path.join(__dirname, '..', 'data')
const CARDS_FILE = path.join(DATA_DIR, 'cards.json')
const DIST_DIR = path.join(__dirname, '..', 'dist')

// Ensure folders exist
async function ensureDirs() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  await fs.mkdir(DATA_DIR, { recursive: true })
}

// Multer setup
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg'
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase()
    cb(null, `${base}-${Date.now()}${ext}`)
  }
})

const upload = multer({ storage })

// CORS: cho phép tất cả origin (có thể restrict sau khi biết URL Netlify)
app.use(cors({
  origin: true, // Cho phép tất cả origin (hoặc thay bằng array URLs cụ thể)
  credentials: true
}))
app.use(express.json())

// Helper to read/write cards
async function readCards() {
  try {
    const data = await fs.readFile(CARDS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

async function writeCards(cards) {
  await fs.writeFile(CARDS_FILE, JSON.stringify(cards, null, 2), 'utf8')
}

// API: create card
app.post('/api/cards', upload.fields([
  { name: 'photo1', maxCount: 1 },
  { name: 'photo2', maxCount: 1 }
]), async (req, res) => {
  try {
    await ensureDirs()

    const { sender, receiver, message } = req.body

    const files = req.files || {}
    const photo1File = Array.isArray(files.photo1) ? files.photo1[0] : null
    const photo2File = Array.isArray(files.photo2) ? files.photo2[0] : null

    const id = uuidv4()

    const photo1Url = photo1File ? `/uploads/${path.basename(photo1File.path)}` : undefined
    const photo2Url = photo2File ? `/uploads/${path.basename(photo2File.path)}` : undefined

    const card = {
      id,
      sender: sender || 'KHANG DEV',
      receiver: receiver || 'Anna',
      customMessage: message || undefined,
      photo1Url,
      photo2Url,
      createdAt: new Date().toISOString()
    }

    const cards = await readCards()
    cards.push(card)
    await writeCards(cards)

    res.status(201).json({ id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create card' })
  }
})

// API: list cards (for simple management page)
app.get('/api/cards', async (_req, res) => {
  try {
    const cards = await readCards()
    // sort newest first
    cards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    res.json(cards)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to list cards' })
  }
})

// API: get card
app.get('/api/cards/:id', async (req, res) => {
  try {
    const { id } = req.params
    const cards = await readCards()
    const card = cards.find(c => c.id === id)
    if (!card) return res.status(404).json({ error: 'Card not found' })
    res.json(card)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load card' })
  }
})

// Static files (uploads & built frontend)
app.use('/uploads', express.static(UPLOAD_DIR))
app.use(express.static(DIST_DIR))

// SPA fallback for root and /card/:id
app.get(['/card/:id', '/'], (_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

// Start server
ensureDirs().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to initialize server', err)
  process.exit(1)
})
