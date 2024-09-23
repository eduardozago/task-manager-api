export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            console.log('get tasks')
        
            return response.writeHead(200).end()
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            console.log(request.body)
        
            return response.writeHead(201).end()
        }
    },
]