import fs from 'node:fs'
import http from 'node:http'
import { parse } from 'csv-parse'
import { routes } from '../routes.js'
import { emitWarning } from 'node:process'

const csvFilesPath = new URL('../../csv/tasks.csv', import.meta.url)

const requestOptions = {
    hostname: 'localhost', // Change this to your target hostname
    port: 3000, // Use 443 for HTTPS
    path: '/tasks', // Change this to your target path
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export async function csv() {
    try {
        await fs.promises.access(csvFilesPath)

        const records = []

        const parser = fs.createReadStream(csvFilesPath)
            .pipe( 
                parse()
            )

        let isFirstRecord = true

        for await (const record of parser) {
            const jsonRecord = {
                title: record[0],
                description: record[1]
            }  

            if (isFirstRecord) {
                isFirstRecord = false
            } else {
                await new Promise((resolve, reject) => {
                    const request = http.request(requestOptions, (res) => {
                        let responseBody = '';
    
                        res.on('data', (chunk) => {
                            responseBody += chunk;
                        });
    
                        res.on('end', () => {
                            resolve();
                        });
                    });
    
                    request.on('error', (error) => {
                        reject(error)
                    });
    
                    request.write(JSON.stringify(jsonRecord))
                    request.end()
                })
            }

            records.push(jsonRecord)
        }

        // Remove CSV header line
        records.splice(0, 1)

        return records
    } catch (error) {
        console.log('error')
        return null
    }
}
