const mongoose = require('mongoose')
//.\mongod.exe --dbpath C:\Users\jonat\Documents\Code\mongodata 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})