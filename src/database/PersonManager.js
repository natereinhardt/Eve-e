const dbmgr = require('./dbManager.js')
const dbInit = require('./invTypes.js')
const Papa = require('papaparse')
const csvParser = require('csv-parser')
const needle = require('needle')
const ProgressBar = require('progress')
const Axios = require('axios')
const https = require('https')
const cliProgress = require('cli-progress')

// const fs = require('fs')
// const filepath = require('./invTypes_reduced.csv')
console.log('FUCK')
const db = dbmgr.db
const init = async () => {
  try {
    const query = dbInit
    const info = db.exec(query)
    console.log(info)
    const persons = await readAndInsertInvTypes2()
    console.log(persons)
  } catch (err) {
    console.error(err)
    throw err
  }
}

// const readAndInsertInvTypes = () => {
//   try {
//     const insertQuery = db.prepare(
//       `INSERT INTO invTypes (typeID, groupID, typeName, description, mass, volume, capacity, portionSize, raceID, basePrice, published, marketGroupID, iconID, soundID, graphicID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
//     )
//     fs.createReadStream(filepath)
//       .pipe(csvParser())
//       .on('data', (data) => {
//         console.log(data)
//         const {
//           typeID,
//           groupID,
//           typeName,
//           description,
//           mass,
//           volume,
//           capacity,
//           portionSize,
//           raceID,
//           basePrice,
//           published,
//           marketGroupID,
//           iconID,
//           soundID,
//           graphicID
//         } = data

//         const info = insertQuery.run(
//           typeID,
//           groupID,
//           typeName,
//           description,
//           mass,
//           volume,
//           capacity,
//           portionSize,
//           raceID,
//           basePrice,
//           published,
//           marketGroupID,
//           iconID,
//           soundID,
//           graphicID
//         )
//         console.log(data)
//       })
//       .on('end', () => {
//         console.log('CSV file successfully processed')
//       })
//   } catch (err) {
//     console.error("WHO IS YOUR MAMA")
//     throw err
//   }
// }
const readAndInsertInvTypes = async () => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO invTypes (typeID, groupID, typeName, description, mass, volume, capacity, portionSize, raceID, basePrice, published, marketGroupID, iconID, soundID, graphicID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const url = 'https://www.fuzzwork.co.uk/dump/latest/invTypes.csv'
    const result = []
    needle
      .get(url)
      .pipe(csvParser())
      .on('data', (data) => {
        console.log(data)
        const cleanData = getCleanData(data)
        const info = insertQuery.run(cleanData)
        console.log(info)
      })
      .on('done', (err) => {
        if (err) console.log('An error has occurred')
        else console.log(result)
      })
  } catch (err) {
    console.error('WHO IS YOUR MAMA')
    throw err
  }
}

const readAndInsertInvTypes2 = async () => {
  try {
    const insertQuery = db.prepare(
      `INSERT OR REPLACE INTO invTypes (typeID, groupID, typeName, description, mass, volume, capacity, portionSize, raceID, basePrice, published, marketGroupID, iconID, soundID, graphicID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const url = 'https://www.fuzzwork.co.uk/dump/latest/invTypes.csv'
    const result = []
    const options = { header: true, download: true }
  
    console.log('Starting download')
    let contentLength = 0
    const stream = needle.get(url)
    stream.on('response', (res) => {
      console.log(res.headers)
      contentLength = res.headers['content-length']
      console.log('YOLO', contentLength)
    })

    stream
      .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, options))
      .on('data', (data) => {
        const cleanData = getCleanData(data)
        const info = insertQuery.run(
          cleanData.typeID,
          cleanData.groupID,
          cleanData.typeName,
          cleanData.description,
          cleanData.mass,
          cleanData.volume,
          cleanData.capacity,
          cleanData.portionSize,
          cleanData.raceID,
          cleanData.basePrice,
          cleanData.published,
          cleanData.marketGroupID,
          cleanData.iconID,
          cleanData.soundID,
          cleanData.graphicID
        )
        // const buff = Buffer.from(JSON.stringify(data))
        // //console.log(buff.length)
        console.log(info)
      })
      .on('done', (err) => {
        if (err) {
          console.log('An error has occurred')
        } else {
          console.log(result)
        }
      })
  } catch (err) {
    console.error('WHO IS YOUR MAMA', err)
    throw err
  }
}

const readAndInsertInvTypes3 = async () => {
  try {
    const insertQuery = db.prepare(
      `INSERT OR REPLACE INTO invTypes (typeID, groupID, typeName, description, mass, volume, capacity, portionSize, raceID, basePrice, published, marketGroupID, iconID, soundID, graphicID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    const options = { header: true, download: true }
    const url = 'https://www.fuzzwork.co.uk/dump/latest/invItems.csv'
    console.log('Connecting …')
    const { data, headers } = await Axios({
      url,
      method: 'GET',
      responseType: 'stream',
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        requestCert: false,
        agent: false
      })
    })
    const totalLength = headers['content-length']

    console.log('Starting download')
    const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: parseInt(totalLength)
    })

    console.log('Starting download')

    //data.on('data', (chunk) => progressBar.tick(chunk.length))
    data
      .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, options))
      .on('data', (data) => {
        // console.log(data)
        const cleanData = getCleanData(data)
        // console.log('BEFORE RUN', cleanData)
        const info = insertQuery.run(
          cleanData.typeID,
          cleanData.groupID,
          cleanData.typeName,
          cleanData.description,
          cleanData.mass,
          cleanData.volume,
          cleanData.capacity,
          cleanData.portionSize,
          cleanData.raceID,
          cleanData.basePrice,
          cleanData.published,
          cleanData.marketGroupID,
          cleanData.iconID,
          cleanData.soundID,
          cleanData.graphicID
        )
        // progressBar.tick(data.length)
        console.log('AFTER RUN')
        //console.log(info)
      })
      .on('done', (err) => {
        if (err) console.log('An error has occurred')
        else console.log(result)
      })
  } catch (err) {
    console.error('WHO IS YOUR MAMA')
    throw err
  }
}

const getCleanData = (data) => {
  const cleanData = {
    typeID: data.typeID || null,
    groupID: data.groupID || null,
    typeName: data.typeName || null,
    description: data.description || '',
    mass: data.mass || null,
    volume: data.volume || null,
    capacity: data.capacity || null,
    portionSize: data.portionSize || null,
    raceID: data.raceID || null,
    basePrice: data.basePrice || null,
    published: data.published || null,
    marketGroupID: data.marketGroupID || null,
    iconID: data.iconID || null,
    soundID: data.soundID || null,
    graphicID: data.graphicID || null
  }
  //console.log(cleanData)
  return cleanData
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
