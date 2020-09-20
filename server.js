const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
// const bodyParser = require('body-parser')

// const items = require('./routes/api/items')
// const items = require('./routes/api/items')
const app = express()
const db = 'mongodb://localhost/shopping'
//bodyparser middlewear
app.use(express.json())

// DB Config
// const db = require('./config/keys').mongoURI


//below is normal connection
// const db = config.get('mongoURI')
console.log('THIS IS DB ====>', db)
// const db = require

//connect to mongodb
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MONGODB CONNECTED'))
    .catch(err => console.log('THIS IS ERR ====>', err))

app.use('/api/items', require('./routes/api/items'))
app.use('/api/patients', require('./routes/api/patients'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`))