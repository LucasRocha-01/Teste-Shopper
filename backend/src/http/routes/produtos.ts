import { FastifyInstance } from 'fastify'
import fastifyMultipart from '@fastify/multipart'

import { uploadCSV } from '../controllers/uploadCSV'
import { getProducts } from '../controllers/getProducts'
import { updateProducts } from '../controllers/updateProducts'

export async function productsRoutes(app: FastifyInstance) {
  app.register(fastifyMultipart)

  app.get('/', getProducts)
  app.post('/upload', uploadCSV)
  app.patch('/atualizar', updateProducts)
}
