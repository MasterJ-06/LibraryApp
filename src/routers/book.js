const express = require('express')
// const cors = require('cors')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const adminauth = require('../middleware/adminauth')
const router = new express.Router()
const ISBNnode = require('node-isbn')

//list books with a given name - done
router.get('/books/loans', auth, async (req, res) => {
    try {
        const books = await Book.find({ Name: req.query.Name })
        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

//list borrowed books - done
router.get('/books/borrowed', adminauth, async (req, res) => {
    try {
        const books = await Book.find({ Borrowed: true})

        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

//create books - done
router.post('/books', adminauth,  async (req, res) => {
    if (!req.body.ISBN) {
        throw new Error('Please provide an ISBN number')
    }
    ISBNnode.resolve(req.body.ISBN, { timeout: 30000 }, async function (err, response) {
        if (err) {
            throw new Error('Book not found' + err + req.body.ISBN)
        }
        const mySentence = response.title;
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        if (response.authors === undefined) {
            authors = "Unknown"
        } else {
            authors = response.authors.toString()
        }
        if (response.categories === undefined) {
            categories = "Unknown"
        } else {
            categories = response.categories.toString()
        }
        if (response.publisher === undefined) {
            publisher = "Unknown"
        } else {
            publisher = response.publisher.toString()
        }
        if (response.publishedDate === undefined) {
            publishedDate = "Unknown"
        } else {
            publishedDate = response.publishedDate.toString()
        }
        if (response.pageCount === undefined) {
            pageCount = "Unknown"
        } else {
            pageCount = response.pageCount.toString()
        }
        if (response.printType === undefined) {
            printType = "Unknown"
        } else {
            printType = response.printType.toString()
        }
        if (response.language === undefined) {
            language = "Unknown"
        } else {
            language = response.language.toString()
        }
        if (response.description === undefined) {
            description = "Unknown"
        } else {
            description = response.description.toString()
        }
        if (response.imageLinks === undefined) {
            thumbnail = "Unknown"
        } else {
            thumbnail = response.imageLinks.thumbnail
        }
        book = new Book({
            Title: words.join(" "),
            Authors: authors,
            Categories: categories,
            Publisher: publisher,
            PublishedDate: publishedDate,
            ISBNNumber: req.body.ISBN,
            PageCount: pageCount,
            PrintType: printType,
            Language: language,
            Description: description,
            Image: thumbnail
        })
        try {
            await book.save()
            res.status(201).send(book)
        } catch (e) {
            res.status(400).send(e)
        }
    })
})

//create dvds - done
router.post('/books/dvds', adminauth,  async (req, res) => {
    const mySentence = req.body.title;
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    const book = new Book({
        Title: words.join(" "),
        Authors: req.body.authors,
        Publisher: req.body.publisher,
        PublishedDate: req.body.publishedDate,
        ISBNNumber: req.body.ISBN,
        PageCount: req.body.pageCount,
        PrintType: req.body.printType,
        Categories: req.body.categories,
        Language: req.body.language,
        Description: req.body.description,
        Image: req.body.thumbnail
    })
    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

//read books - done
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})

        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

//read specific book - done
router.get('/books/ISBN', async (req, res) => {
 if (req.query.filter === 'Title') {
    try {

        const mySentence = req.query.Title;
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        const book = await Book.findOne({ Title: words.join(" ") })
    
        if (!book) {
            return res.status(404).send()
        }
    
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
 } else if (req.query.filter === 'ISBN') {
    try {

        const book = await Book.findOne({ ISBNNumber: req.query.ISBN })
    
        if (!book) {
            return res.status(404).send()
        }
    
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
 }
})

//update book - done
router.patch('/books/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Name', 'Borrowed', 'Status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findOne({ ISBNNumber: req.query.ISBNNumber })

        if (!book) {
            return res.status(404).send()
        }
        
        if (req.body.Status == "Borrow") {
            if (book.Borrowed == true) {
                return res.status(200).send({ error: 'That book has already been borrowed!' })
            }
        }

        if (req.body.Status == "Return") {
            if (req.body.Name !== book.Name) {
                return res.status(200).send({ error: 'You do not have permission to return that book!' })
            }
        }

        updates.forEach((update) => book[update] = req.body[update])
        await Book.updateOne({ ISBNNumber: req.query.ISBNNumber }, { Name: ''})
        await book.save()

        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete book - done
router.delete('/books/ISBN', adminauth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ ISBNNumber: req.query.ISBN })

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router