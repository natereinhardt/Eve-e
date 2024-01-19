const { dbInit, startDb } = require('./dbManager.js')

const initDb = async () => {
  try {
    console.log('Starting database initialization process...')
    const dbPath = await dbInit()
    console.log('Database initialization process has been completed successfully.')

    console.log('Attempting to start the database...')
    const db = await startDb(dbPath)
    console.log('Database has been started successfully. The database instance:', db)
  } catch (err) {
    console.error('An error occurred during the database initialization/startup process:', err)
    throw err
  }
}

module.exports = {
  initDb
}
