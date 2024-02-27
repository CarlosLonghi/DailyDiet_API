import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createMealsBodySchema = z.object({
      user_id: z.string(),
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hour: z.string(),
      diet_compliant: z.enum(['yes', 'no']),
    })

    // eslint-disable-next-line
    const { user_id, name, description, date, hour, diet_compliant } =
      createMealsBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      user_id,  // eslint-disable-line
      name,
      description,
      date,
      hour,
      diet_compliant,  // eslint-disable-line
    })

    return reply.status(201).send()
  })
}
