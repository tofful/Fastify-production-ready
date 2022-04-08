import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from 'fastify-jwt'

import type { FastifyRequest } from 'fastify'

import { env } from '../config/index.js'

const verifyJwt = (req: FastifyRequest) => req.jwtVerify()

/**
 * This will decorate your fastify instance with the following methods: decode, sign, and verify;
 * refer to their documentation to find how to use the utilities.
 * It will also register request.jwtVerify and reply.jwtSign.
 * You must pass a secret when registering the plugin.
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp<FastifyJWTOptions>(async (fastify) => {
  fastify.register(jwt, {
    secret: env.APP_KEY
  })
  fastify.decorate('verifyJwt', verifyJwt)
})

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars, no-shadow
  interface FastifyInstance {
    verifyJwt: typeof verifyJwt
  }
}

declare module 'fastify-jwt' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyJWT {
    // payload type is used for signing and verifying
    payload: {
      sub: string
      type: 'access' | 'refresh'
    }
  }
}
