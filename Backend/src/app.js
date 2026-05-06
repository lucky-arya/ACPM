import express  from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true,
    }
))
app.use(express.json({
    limit : "10mb"
}))

app.use(express.urlencoded({
    extended : true,
    limit : "10mb"
}))

app.use(express.static("public"))
app.use(cookieParser())



// routes import 

import homeRouter from "./routes/home.routes.js"
import membershipRouter from "./routes/membership.routes.js"

// routes
app.use("/", homeRouter)
app.use("/api/v1", membershipRouter)




export { app }