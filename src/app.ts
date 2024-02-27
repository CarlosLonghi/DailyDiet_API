import fastify from 'fastify'
import { mealsRoutes } from './routes/meals'

export const app = fastify()

// Plugins
app.register(mealsRoutes, {
  prefix: 'meals',
})
