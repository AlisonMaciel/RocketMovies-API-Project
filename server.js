require("express-async-errors")

const express = require("express")
const cors = require("cors")
const routes = require("./SRC/routes/index.js")
const AppError = require("./SRC/Utils/appError.js")
const {UPLOADS_FOLDER} = require("./SRC/configs/uploads.js")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/files", express.static(UPLOADS_FOLDER)) 
app.use(routes)

const PORT = 4444

app.use((error, request, response, next) => {

    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }
    
    return response.json({error: "Erro interno no servidor"})
})

app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`)
})


  