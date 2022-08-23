const router = require('express').Router()

// our song model
const Song = require('../models/song')

// Crear una canción
router.post('/save', async (req, res) => {
  const newSong = Song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songUrl: req.body.songUrl,
    artist: req.body.artist,
    album: req.body.album,
    language: req.body.language,
    category: req.body.category
  })
  try {
    const savedSong = await newSong.save()
    return res.status(200).send({ success: true, Song: savedSong })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

// Obtener una canción por ID
router.get('/getOne/:id', async (req, res) => {
  const filterSong = { _id: req.params.id }

  const song = await Song.findOne(filterSong)

  if (song) {
    return res.status(200).send({ success: true, Song: song })
  } else {
    return res.status(400).send({ success: false, msg: 'Song not found' })
  }
})

// Obtener todas las canciones
router.get('/getAll', async (req, res) => {
  const options = {
    sort: { createdAt: 1 }
  }

  const songs = await Song.find(options)

  if (songs) {
    return res.status(200).send({ success: true, songs: songs })
  } else {
    return res.status(400).send({ success: false, msg: 'No songs found' })
  }
})

// Eliminar una canción
router.delete('/delete/:id', async (req, res) => {
  const filterSong = { _id: req.params.id }

  const song = await Song.deleteOne(filterSong)

  if (song) {
    return res
      .status(200)
      .send({ success: true, msg: 'Song deleted', Song: song })
  } else {
    return res.status(400).send({ success: false, msg: 'Song not found' })
  }
})

// Atualizar una canción
router.put('/update/:id', async (req, res) => {
  const filterSong = { _id: req.params.id }

  const options = {
    new: true,
    upsert: true
  }

  const updateSongs = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    songUrl: req.body.songUrl,
    artist: req.body.artist,
    album: req.body.album,
    language: req.body.language,
    category: req.body.category
  }

  try {
    const song = await Song.findOneAndUpdate(filterSong, options, updateSongs)

    return res.status(200).send({ success: true, Song: song })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

module.exports = router
