const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

const APP_DIR = './client/apps'

app.use(express.static('./client'))
app.use(bodyParser())

const router = express.Router()

router.get('/app', (req, res) => {
  if (req.query.name) {
    readApp(req.query.name).then(data => {
      res.json(data)
    })

    return
  }

  fs.readdir(APP_DIR, (err, files) => {
    if (err) {
      res.json([])
    }

    Promise.all(
      files.map(readApp)
    ).then(data => {
      res.json(data)
    })
  })
})


const store = {
  wallpaper: '/apps/wallpaper/img/maple.jpg'
}

router.get('/config', (req, res) => {
  res.send(store[req.query.key])
})

router.put('/config', (req, res) => {
  Object.assign(store, req.body)
  res.sendStatus(200)
})

app.use('/rest', router)

app.listen(8080)

function readApp(name) {
  return new Promise((resolve, reject) => {
    try {
      const config = require(`./${APP_DIR}/${name}/config.json`)
      resolve(config)
    } catch (e) {
      reject(e)
    }
  })
}
