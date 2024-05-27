/* mport {createServer} from 'node:http'

const server = createServer((request, response)=>{
    response.write("hello world")
    return response.end()
})

server.listen(3333) */

import { fastify } from 'fastify'
import { DataBasememory } from './database-postgres.js'

const server = fastify() 
const database = new DataBasememory()
server.post('/videos', async (request,response) => {
    const {title,description, duration} = request.body
   await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return response.status(201).send()
})
server.get('/videos', async (request) => {
    const search = request.query.search
    const video = await database.list(search)
    return video
})
server.put('/videos/:id', async (request,response) => {
   const videoId = request.params.id
   const {title,description, duration} = request.body
     await database.update(videoId,{
        title: title,
        description: description,
        duration: duration,
    })
    response.status(204).send()
})

server.delete('/videos/:id', async (request,response) => {
    const videoId = request.params.id
    await database.delete(videoId)
})
server.listen({
    port: process.env.PORT ?? 3333,
})