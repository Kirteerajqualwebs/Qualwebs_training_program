const app = require('./app')
const testConnection = require("./config/testConnection.js")
const PORT  = 5000;

app.listen(PORT , ()=>{
    console.log(`server is start on port ${PORT}`)
    testConnection()
})