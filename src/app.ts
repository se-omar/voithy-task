import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import router from './router'
import path from 'path'

const app = express()
const port = 3000

// Set security HTTP headers
app.use(helmet())

// Parse Json request body
app.use(express.json())

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// Set gzip compression
app.use(compression())

// Enable cors
app.use(cors())
app.options('*', cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.get('/test', (req, res) => {
  res.send('Healthy Instance')
})

app.get('/addPatient', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addPatient.html'))
})

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
