import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import  path from "node:path";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance){
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 10000000 * 2.5, // 25 MB
        },
    })
    app.post('/videos', async (request, reply) => {
        const data = await request.file()

        if(!data){
            return reply.status(400).send({ error: 'No file uploaded!' })
        }

        const extension = path.extname(data.filename)

        if(extension !== '.mp3'){
            return reply.status(400).send({ error: 'Tipo inválido de dado, por favor suba um MP3.' })
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        return reply.send()
    })
}