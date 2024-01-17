const dbmgr = require('./dbManager.js')
const dbInit = require('./invTypes.js')

const db = dbmgr.db
const init = async () => {
  // try {
  //   const query = `CREATE TABLE IF NOT EXISTS person (name varchar, age int);`
  //   db.prepare(query)
  //   db.exec(`CREATE TABLE IF NOT EXISTS person (name varchar, age int);`)
  // } catch (err) {
  //   console.error(err)
  // }

  try {
    // const createQuery = db.prepare()
    const query = dbInit
    const info = db.exec(query)
    console.log(info)
    insertPerson('nate', 20)
    const persons = readAllPerson()
    console.log(persons)
  } catch (err) {
    console.error(err)
    throw err
  }
}
const readAllPerson = () => {
  try {
    const query = `SELECT * FROM person`
    const readQuery = db.prepare(query)
    const rowList = readQuery.all()
    return rowList
  } catch (err) {
    console.error(err)
    throw err
  }
}

const insertPerson = (name, age) => {
  try {
    const insertQuery = db.prepare(`INSERT INTO person (name, age) VALUES ('${name}' , ${age})`)

    const transaction = db.transaction(() => {
      const info = insertQuery.run()
      console.log(`Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into person`)
    })
    transaction()
  } catch (err) {
    console.error(err)
    throw err
  }
}
init()
module.exports = {
  readAllPerson,
  insertPerson
}
