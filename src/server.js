import express from 'express'
import mongoose from "mongoose"
import tgRouts from "./routes/tgRoute.js"
import bodyParser from "body-parser"
import fetch from "node-fetch"
import cors from "cors";

const app = express()

const POST = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/tg', tgRouts)

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID


app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, number } = req.body;
    const telegramMessage = `New client message:
    Name: ${name}
    Number: ${number}`
    await sendTelegramMessage(telegramMessage)
    res.status(200).json({success: true, message:'Письмо отправлено'})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Ошибка при обработке данных!'})
  }
})

async function sendTelegramMessage(message) {
  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    })
  })
}

async function start() {
  try {
    const conn = await mongoose.connect(
      MONGO_URL, {
        useNewUrlParser: true,
      }
    )
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
    console.log(`Mongo connected to: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

start()