import { config } from './config/config'
import { app } from './app'
import { cronInit } from './config/cron'
import { databaseInit } from './config/database'

app.listen(config.server.port)
databaseInit()
cronInit()