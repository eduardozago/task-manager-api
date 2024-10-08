import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { csv } from './middlewares/csv.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    
     
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {

        if (route.method === 'GET') {
            await csv()
        }

        const routeParams = request.url.match(route.path)

        request.params = routeParams.groups

        return route.handler(request, response)
    }
    
    return response.writeHead(404).end()
})

server.listen(3000)