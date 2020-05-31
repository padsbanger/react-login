import { Server, Response } from 'miragejs'
import { User } from './types/User'

const createMockServer = () => {
  return new Server({
    routes() {
      this.namespace = 'api'
      this.post(
        '/login',
        (schema, request) => {
          if (Math.floor(Math.random() * 10) % 2 === 0) {
            return new Response(401, {}, {})
          } else {
            const attrs: User = JSON.parse(request.requestBody)
            const data = { message: `Succesfuly logged in as ${attrs.email}` }
            return new Response(200, {}, data)
          }
        },
        { timing: 1000 }
      )
    },
  })
}

export default createMockServer
