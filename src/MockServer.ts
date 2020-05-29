import { Server, Response } from 'miragejs'
import { User } from './types/User'

const createMockServer = () => {
  return new Server({
    routes() {
      this.namespace = 'api'
      this.post(
        '/login',
        (schema, request) => {
          if (Math.floor(Math.random() * 10) % 2 !== 110) {
            let data = { message: 'Invalid email or password' }
            return new Response(401, {}, data)
          } else {
            let attrs: User = JSON.parse(request.requestBody)
            let data = { message: `Succesfuly logged in as ${attrs.email}` }
            return new Response(200, {}, data)
          }
        },
        { timing: 1000 }
      )
    },
  })
}

export default createMockServer
