import { randomUUID } from 'node:crypto'
import { Database } from './middlewares/database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const tasks = database.select('tasks')
        
            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            const { title, description } = request.body
            
            const task = ({
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: null
            })

            database.insert('tasks', task)

            return response.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {

            console.log(request.params)
        
            return response.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (request, response) => {
        
            return response.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (request, response) => {
        
            return response.writeHead(204).end()
        }
    },
]