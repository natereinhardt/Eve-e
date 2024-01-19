const Database = require('better-sqlite3')
const path = require('path')
const needle = require('needle')
const fs = require('fs')
const stream = require('stream')
const util = require('util')
const bz2 = require('unbzip2-stream')
const pipeline = util.promisify(stream.pipeline)

/**
 * Initializes the database.
 * @async
 * @function dbInit
 * @returns {Promise<void>} A promise that resolves when the database unzipping is complete.
 */
const dbInit = async () => {
  const dbPath =
    process.env.NODE_ENV === 'development'
      ? './sqlite-latest.sqlite'
      : path.join(process.resourcesPath, './demo_table.sqlite')

  if (!fs.existsSync(dbPath)) {
    console.log('Database does not exist. Starting download and unzipping process...')

    const needleOptions = { compressed: false }
    const zipLocation = './sqlite-latest.sqlite.bz2'
    const unzipLocation = './sqlite-latest.sqlite'
    const url = 'https://www.fuzzwork.co.uk/dump/sqlite-latest.sqlite.bz2'

    console.log('Starting download from:', url)
    const downloadStream = needle.get(url, needleOptions)
    const saveZip = fs.createWriteStream(zipLocation)
    await pipeline(downloadStream, saveZip)
    console.log('Download completed successfully.')

    console.log('Starting unzip process...')
    const fileContents = fs.createReadStream(zipLocation)
    const writeStream = fs.createWriteStream(unzipLocation)
    await pipeline(fileContents, bz2(), writeStream)
    console.log('Unzip process completed successfully.')
    return dbPath
  } else {
    console.log('Database already exists. Skipping download and unzipping process...')
    return dbPath
  }
}

const startDb = async (dbPath) => {
  console.log('Starting database with path:', dbPath)
  const db = new Database(dbPath, Database.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Error while starting the database:', err.message)
    }
  })

  db.pragma('journal_mode = WAL')
  console.log('Database started successfully with journal mode = WAL')
  return db
}

module.exports = { dbInit, startDb }
