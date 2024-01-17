const Database = require('better-sqlite3')
const path = require('path')
process.env.NODE_ENV = 'development'

const dbPath =
  process.env.NODE_ENV === 'development'
    ? './demo_table.sqlite'
    : path.join(process.resourcesPath, './demo_table.sqlite')

const db = new Database(dbPath, { verbose: console.log }, (err) => {
  if (err) {
    console.error(err.message)
  }
  //verbose: console.log
})

db.pragma('journal_mode = WAL')
exports.db = db
