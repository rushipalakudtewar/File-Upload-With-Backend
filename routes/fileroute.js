const express= require('express')
const router = express.Router()
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require('../controllers/filecontroller')

router.post('/localFileUpload',localFileUpload)
router.post('/imageupload',imageUpload)
router.post('/videoupload',videoUpload)
router.post('/imgsizereduce',imageSizeReducer)

module.exports = router