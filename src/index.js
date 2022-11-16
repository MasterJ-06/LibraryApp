const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const bookRouter = require('./routers/book')
const webRouter = require('./routers/web')
const app = express()
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT
app.use(express.json({limit: '5gb'}))
app.use(express.urlencoded({limit: '5gb'}))
app.use(userRouter)
app.use(adminRouter)
app.use(bookRouter)
const ViewsPath = path.join(__dirname, '../templates/views')
const PartialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(PartialsPath)
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
const { ISBNinfo, validateISBN } = require('./utils/notes')
// Define paths for express config
const PathDir = path.join (__dirname, '../public')

// Set up static directory to serve
app.use(express.static(PathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Library',
        name: 'MasterJ'
    })
})

app.get('/borrow', (req, res) => {
    res.render('borrow', {
        title: 'Borrow',
        name: 'MasterJ'
    })
})

app.get('/return', (req, res) => {
    res.render('return', {
        title: 'Return',
        name: 'MasterJ'
    })
})

app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        name: 'MasterJ'
    })
})

app.get('/preview', (req, res) => {
    res.render('preview', {
        title: 'Preview',
        name: 'MasterJ'
    })
})

app.get('/validate', (req, res) => {
    res.render('validate', {
        title: 'Validate',
        name: 'MasterJ'
    })
})

app.get('/validateISBN', (req, res) => {
    if (!req.query.ISBN) {
        return res.send({
            error: 'You must provide an ISBN number'
        })
    }

    validateISBN(req.query.ISBN, (error, boolean) => {
        if (error) {
            return res.send(error)
        }
        res.send({ boolean })
    })
})

app.get('/info', (req, res) => {
    res.render('book-info', {
        title: 'Info',
        name: 'MasterJ'
    })
})

app.get('/infoISBN', (req, res) => {
    if (!req.query.ISBN) {
        return res.send({
            error: 'You must provide an ISBN number'
        })
    }

    ISBNinfo(req.query.ISBN, (error, book) => {
        if (error) {
            return res.send(error)
        }
        res.send({
            book
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MasterJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help page',
        name: 'MasterJ'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Help page not found'
    })
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        name: 'MasterJ'
    })
})

app.get('/addbooks', (req, res) => {
    res.render('addbooks', {
        title: 'Add Books',
        name: 'MasterJ',
    })
})

app.get('/adddvds', (req, res) => {
    res.render('adddvds', {
        title: 'Add DVDs',
        name: 'MasterJ',
    })
})

app.get('/removebooks', (req, res) => {
    res.render('removebooks', {
        title: 'Remove Books',
        name: 'MasterJ',
    })
})

app.get('/listbooks', (req, res) => {
    res.render('listbooks', {
        title: 'List Books',
        name: 'MasterJ',
    })
})

app.get('/user', (req, res) => {
    res.render('user', {
        title: 'User',
        name: 'MasterJ',
    })
})

app.get('/notifications', (req, res) => {
    res.render('notifications', {
        title: 'Notifications',
        name: 'MasterJ',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})