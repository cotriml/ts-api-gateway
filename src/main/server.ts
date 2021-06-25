import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

console.log('Connecting with database...')
MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log('Database Connected...')
    const app = (await import('./config/app')).default
    console.log('Connecting application...')
    app.listen(env.port, () => {
      console.log(`Application listening to Port: ${env.port}`)
    })
  })
  .catch(console.error)
