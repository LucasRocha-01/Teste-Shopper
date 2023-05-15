import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: env.DBHOST,
    user: env.DBUSERNAME,
    password: env.DBPASSWORD,
    database: env.DBNAME,
  },
}

export const knex = setupKnex(config)
