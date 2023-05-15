import { app } from './app'
import { packsRoutes } from './http/routes/packs'
import { productsRoutes } from './http/routes/produtos'
import cors from '@fastify/cors'

app.register(cors, {
  origin: '*',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
})

app.register(productsRoutes, { prefix: 'products' })
app.register(packsRoutes, { prefix: 'packs' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
