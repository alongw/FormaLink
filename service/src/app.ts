import express from 'express'
import bodyParser from 'body-parser'
import config from './utils/config'
import logger from './utils/log'
import cors from 'cors'
import axios from 'axios'

import Router from './router'

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Router)

app.listen(config.listen_port, () => {
    logger.info(`FormaLink is running at http://127.0.0.1:${config.listen_port}`)
})
