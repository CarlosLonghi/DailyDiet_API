import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkUserIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.cookies

  if (!userId) {
    return reply.status(401).send({
      error: 'Unauthorized. Not found cookie userId!',
    })
  }
}
