import { FastifyInstance } from 'fastify'
import { knex } from '../../database'

export async function packsRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const packs = await knex('packs').select('*')

    return { packs }
  })
}
