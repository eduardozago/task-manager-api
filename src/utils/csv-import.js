import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvFilesPath = new URL('../../csv/tasks.csv', import.meta.url)

export async function csvImport() {
    try {
        await fs.promises.access(csvFilesPath)

        const records = []

        const parser = fs.createReadStream(csvFilesPath)
            .pipe( 
                parse()
            )

        for await (const record of parser) {

            records.push(record)
        }

        return records
    } catch (error) {
        console.log('No CSV file was found.')
    }
}

