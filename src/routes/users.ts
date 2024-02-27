import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = createUserBodySchema.parse(request.body)

    let userId = request.cookies.userId
    userId = randomUUID()

    reply.cookie('userId', userId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    await knex('users').insert({
      id: userId,
      name,
      email,
    })

    return reply.status(201).send()
  })

  app.get('/', async () => {
    const usersList = await knex('users').select()
    return { usersList }
  })
}
