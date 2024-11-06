require("express-async-errors")
const express = require("express")
const app = express()

const routes = require("./SRC/routes/index.js")
const AppError = require("./SRC/Utils/appError.js")

app.use(express.json())
app.use(routes)

const PORT = 4444

app.use((error, request, response, next) => {

    if(error instanceof AppError) {
        return response.json({
            error: error.message,
            statusCode: error.StatusCode
    })}
    
    return response.json({error: "Erro interno no servidor"})
})

app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`)
})


  