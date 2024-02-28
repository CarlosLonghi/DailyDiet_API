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

  app.get('/:userId', async (request, reply) => {
    const getAllMealsByUserIdParamsSchema = z.object({
      userId: z.string().uuid(),
    })
    const { userId } = getAllMealsByUserIdParamsSchema.parse(request.params)

    const meals = await knex('meals')
      .where({ user_id: userId })
      .select('id', 'name', 'description', 'diet_compliant', 'date', 'hour')

    return reply.status(200).send({ meals })
  })

  app.get('/metric/:userId', async (request, reply) => {
    const getMetricByUserIdParamsSchema = z.object({
      userId: z.string().uuid(),
    })
    const { userId } = getMetricByUserIdParamsSchema.parse(request.params)

    const allMeals = await knex('meals')
      .where({ user_id: userId })
      .orderBy('created_at')

    const allMealsAmount = allMeals.length

    const withinDietMealsAmount = (
      await knex('meals')
        .where({ user_id: userId })
        .andWhere({ diet_compliant: 'yes' })
    ).length

    const offDietMealsAmount = (
      await knex('meals')
        .where({ user_id: userId })
        .andWhere({ diet_compliant: 'no' })
    ).length

    let currentStreak = 0
    let bestStreak = 0
    for (const meal of allMeals) {
      if (meal.diet_compliant === 'yes') {
        currentStreak++
        bestStreak = Math.max(bestStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }

    return reply.status(200).send({
      allMealsAmount,
      withinDietMealsAmount,
      offDietMealsAmount,
      mealsBestDietStreak: bestStreak,
    })
  })

  // View Role
  app.get('/view/:id', async (request, reply) => {
    const getMealByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealByIdParamsSchema.parse(request.params)

    const { userId } = request.cookies
    const amountMealsToUpdate = (
      await knex('meals').where({ id }).andWhere({ user_id: userId })
    ).length
    if (amountMealsToUpdate === 0) {
      return reply.status(401).send()
    }

    const meals = await knex('meals').where({ id }).select()

    return reply.status(200).send({ meals })
  })

  app.delete('/view/:id', async (request, reply) => {
    const getMealByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getMealByIdParamsSchema.parse(request.params)
    const { userId } = request.cookies

    const amountMealsToDelete = (
      await knex('meals').where({ id }).andWhere({ user_id: userId })
    ).length

    await knex('meals').where({ id }).andWhere({ user_id: userId }).delete()

    if (amountMealsToDelete === 0) {
      return reply.status(401).send()
    }

    return reply.status(200).send()
  })

  app.put('/view/:id', async (request, reply) => {
    const getMealByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const getMealBodyToUpdate = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hour: z.string(),
      diet_compliant: z.enum(['yes', 'no']),
    })

    const { id } = getMealByIdParamsSchema.parse(request.params)

    // eslint-disable-next-line
    const { name, description, date, hour, diet_compliant } =
      getMealBodyToUpdate.parse(request.body)

    const { userId } = request.cookies
    const amountMealsToUpdate = (
      await knex('meals').where({ id }).andWhere({ user_id: userId })
    ).length
    if (amountMealsToUpdate === 0) {
      return reply.status(401).send()
    }

    await knex('meals').where({ id }).update({
      name,
      description,
      date,
      hour,
      diet_compliant,  // eslint-disable-line
    })

    return reply.status(200).send()
  })
}
