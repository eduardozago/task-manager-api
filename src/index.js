import http from 'node:http'
import { json } from './middlewares/json.js'

const server = http.createServer(async (request, response) => {

    await json(request, response)
     
    if(request.url === '/tasks/new' && request.method === 'POST') {
        console.log(request.body)
    }

    return response.end('listening...')
})
server.listen(3000)