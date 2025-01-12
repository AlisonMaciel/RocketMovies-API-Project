require("express-async-errors")
<<<<<<< HEAD

const express = require("express")
const cors = require("cors")
const routes = require("./SRC/routes/index.js")
const AppError = require("./SRC/Utils/appError.js")
const {UPLOADS_FOLDER} = require("./SRC/configs/uploads.js")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/files", express.static(UPLOADS_FOLDER)) 
=======
const express = require("express")
const app = express()

const routes = require("./SRC/routes/index.js")
const AppError = require("./SRC/Utils/appError.js")

app.use(express.json())
>>>>>>> 9259820b5542c29def31dbf21abd83603dc57208
app.use(routes)

const PORT = 4444

app.use((error, request, response, next) => {

    if(error instanceof AppError) {
<<<<<<< HEAD
        return response.status(error.statusCode).json({
            message: error.message
        })
    }
=======
        return response.json({
            error: error.message,
            statusCode: error.StatusCode
    })}
>>>>>>> 9259820b5542c29def31dbf21abd83603dc57208
    
    return response.json({error: "Erro interno no servidor"})
})

app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`)
})


  