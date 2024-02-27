import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkUserIdExist } from '../middlewares/check-user-id-exist'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkUserIdExist] }, async (request, reply) => {
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hour: z.string(),
      diet_compliant: z.enum(['yes', 'no']),
    })

    const { userId } = request.cookies

    // eslint-disable-next-line
    const { name, description, date, hour, diet_compliant } =
      createMealsBodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      user_id: userId,  // eslint-disable-line
      name,
      description,
      date,
      hour,
      diet_compliant,  // eslint-disable-line
    })

    return reply.status(201).send()
  })
}
