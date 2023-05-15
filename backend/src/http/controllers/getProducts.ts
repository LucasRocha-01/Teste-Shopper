import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database'

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const products = await knex('products').select('*')

  return products
}
