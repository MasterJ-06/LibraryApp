//Express version 4
const express = require('express')
const router = new express.Router()
const path = require('path')
const { ISBNinfo, validateISBN } = require('../utils/notes')
// Define paths for express config
const PathDir = path.join (__dirname, '../../public')

// Set up static directory to serve
router.use(express.static(PathDir))

router.get('', (req, res) => {
    res.render('index', {
        title: 'Library',
        name: 'MasterJ'
    })
})

router.get('/borrow', (req, res) => {
    res.render('borrow', {
        title: 'Borrow',
        name: 'MasterJ'
    })
})

router.get('/return', (req, res) => {
    res.render('return', {
        title: 'Return',
        name: 'MasterJ'
    })
})

router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        name: 'MasterJ'
    })
})

router.get('/preview', (req, res) => {
    res.render('preview', {
        title: 'Preview',
        name: 'MasterJ'
    })
})

router.get('/validate', (req, res) => {
    res.render('validate', {
        title: 'Validate',
        name: 'MasterJ'
    })
})

router.get('/validateISBN', (req, res) => {
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

router.get('/info', (req, res) => {
    res.render('book-info', {
        title: 'Info',
        name: 'MasterJ'
    })
})

router.get('/infoISBN', (req, res) => {
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

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MasterJ'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help page',
        name: 'MasterJ'
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Help page not found'
    })
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        name: 'MasterJ'
    })
})

router.get('/addbooks', (req, res) => {
    res.render('addbooks', {
        title: 'Add Books',
        name: 'MasterJ',
    })
})

router.get('/adddvds', (req, res) => {
    res.render('adddvds', {
        title: 'Add DVDs',
        name: 'MasterJ',
    })
})

router.get('/removebooks', (req, res) => {
    res.render('removebooks', {
        title: 'Remove Books',
        name: 'MasterJ',
    })
})

router.get('/listbooks', (req, res) => {
    res.render('listbooks', {
        title: 'List Books',
        name: 'MasterJ',
    })
})

router.get('/user', (req, res) => {
    res.render('user', {
        title: 'User',
        name: 'MasterJ',
    })
})

router.get('/notifications', (req, res) => {
    res.render('notifications', {
        title: 'Notifications',
        name: 'MasterJ',
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'MasterJ',
        errMsg: 'Page not found'
    })
})