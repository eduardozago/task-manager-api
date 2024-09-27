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
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            if (request.body != null) {
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
            } else {
                return response.writeHead(400).end()
            }
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            if (request.body != null) { 

                const { id } = request.params
                const { title, description } = request.body

                database.update('tasks', id, {
                    title,
                    description,
                    updated_at: new Date().toISOString()
                })
            
                return response.writeHead(204).end()
            } else {
                return response.writeHead(400).end()
            }
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (request, response) => {
            const { id } = request.params

            database.update('tasks', id, {
                completed_at: new Date().toISOString(),
            })

            return response.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params

            database.delete('tasks', id)
        
            return response.writeHead(204).end()
        }
    },
]