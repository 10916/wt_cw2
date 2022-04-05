// express
let express = require('express')
let app = express()

// port
let PORT = process.env.PORT || 3000

// pug
app.set('view engine', 'pug')

// css
app.use('/static', express.static('public'))

// db
let db = require('./routes/db')
let Notes = require('./routes/models')

db.sync().then(() => console.log('connection established'))

app.use(express.urlencoded({extended:true}))

// 
app.get('/', async (req, res) => {
    let notes = await Notes.findAll()

    res.render('index', {notes:notes})
})

// new
app.get('/new', (req, res) => {
    res.render('add')
})

app.post('/new', async (req, res) => {
    let tl = req.body.title
    if(tl!='') {
        await Notes.create(req.body)

        res.redirect('/')
    } else {
        res.render('add')
    }
})

app.post('/create', async (req, res) => {
    let notes = await Notes.create(req.body)
    res.redirect(`/?id=${notes.title}`)
})

// update
app.get('/edit/:id', async (req, res) => {
    let id = req.params.id
    let notes = await Notes.findByPk(id)
    res.render('update', {notes: notes})
})

app.post('/update/:id', async (req, res) => {
    let id = req.params.id
    let tl = req.body.title
    if(tl!=''){
        let result = await Notes.update({
            title: req.body.title,
            note: req.body.note,
        }, {
            where: {
                id: id
            }
        })
        
    res.redirect('/')
    } else {
        let notes = await Notes.findByPk(id)
        res.render('update', {notes: notes})
    }
})

// delete
app.get('/delete/:id', async (req, res) => {
    let id = req.params.id

    let result = await Notes.destroy({
        where: {
            id: id
        }
    })

    res.redirect('/')
})

// port
app.listen(PORT)