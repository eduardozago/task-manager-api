import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { csvImport } from './utils/csv-import.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    const csvTasks = await csvImport()

    if (csvTasks) {
        console.log(csvTasks)
    }
     
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = request.url.match(route.path)

        request.params = routeParams.groups

        return route.handler(request, response)
    }
    
    return response.writeHead(404).end()
})

server.listen(3000)