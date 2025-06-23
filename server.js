import express from "express"
import cors from "cors"

import authRouter from "./src/routes/auth.route.js"

const app = express()
const PORT = process.env.PORT || 8888

app.use(cors())
app.use(express.json())

app.use("/", authRouter)

app.listen(PORT, ()=> {
    console.log(`[ \x1b[33mServer\x1b[0m : \x1b[34mlocalhost\x1b[0m\:\x1b[31m${PORT}\x1b[0m ]`)
})