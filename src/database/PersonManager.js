// const { dbInit, startDb } = require('./dbManager.js')
// //const dbInit = require('./invTypes.js')
// const Papa = require('papaparse')
// const needle = require('needle')

// // const fs = require('fs')
// // const filepath = require('./invTypes_reduced.csv')
// console.log('FUCK')
// const init = async () => {
//   try {
//     console.log(dbInit)
//     await dbInit()
//     const db = await startDb()
//     console.log(db)
//     // const query = dbInit
//     // console.log('Init: Starting DB Init')
//     // db.exec(query)
//     // console.log('Init: DB Init Finished')
//     // console.log('Seed: Starting Table Seeding')
//     //await seedInvTypes()
//     // console.log('Seed: Seeding Finished')
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

// const seedInvTypes = async () => {
//   try {
//     const insertQuery = db.prepare(
//       `INSERT OR REPLACE INTO invTypes (typeID, groupID, typeName, description, mass, volume, capacity, portionSize, raceID, basePrice, published, marketGroupID, iconID, soundID, graphicID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
//     )
//     const url = 'https://www.fuzzwork.co.uk/dump/latest/invTypes.csv'
//     const result = []
//     const options = { header: true, download: true }

//     console.log('Starting download')
//     const stream = needle.get(url)

//     stream
//       .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, options))
//       .on('data', (data) => {
//         const cleanData = getCleanData(data)
//         const info = insertQuery.run(
//           cleanData.typeID,
//           cleanData.groupID,
//           cleanData.typeName,
//           cleanData.description,
//           cleanData.mass,
//           cleanData.volume,
//           cleanData.capacity,
//           cleanData.portionSize,
//           cleanData.raceID,
//           cleanData.basePrice,
//           cleanData.published,
//           cleanData.marketGroupID,
//           cleanData.iconID,
//           cleanData.soundID,
//           cleanData.graphicID
//         )
//         console.log(info)
//       })
//       .on('done', (err) => {
//         if (err) {
//           console.log('An error has occurred')
//         } else {
//           console.log(result)
//         }
//       })
//   } catch (err) {
//     console.error('WHO IS YOUR MAMA', err)
//     throw err
//   }
// }

// const getCleanData = (data) => {
//   const cleanData = {
//     typeID: data.typeID || null,
//     groupID: data.groupID || null,
//     typeName: data.typeName || null,
//     description: data.description || '',
//     mass: data.mass || null,
//     volume: data.volume || null,
//     capacity: data.capacity || null,
//     portionSize: data.portionSize || null,
//     raceID: data.raceID || null,
//     basePrice: data.basePrice || null,
//     published: data.published || null,
//     marketGroupID: data.marketGroupID || null,
//     iconID: data.iconID || null,
//     soundID: data.soundID || null,
//     graphicID: data.graphicID || null
//   }
//   //console.log(cleanData)
//   return cleanData
// }
// const readAllPerson = () => {
//   try {
//     const query = `SELECT * FROM person`
//     const readQuery = db.prepare(query)
//     const rowList = readQuery.all()
//     return rowList
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

// const insertPerson = (name, age) => {
//   try {
//     const insertQuery = db.prepare(`INSERT INTO person (name, age) VALUES ('${name}' , ${age})`)

//     const transaction = db.transaction(() => {
//       const info = insertQuery.run()
//       console.log(`Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into person`)
//     })
//     transaction()
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }
// init()
// module.exports = {
//   readAllPerson,
//   insertPerson
// }
