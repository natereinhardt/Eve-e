module.exports = `
CREATE TABLE IF NOT EXISTS invTypes (
    typeID INTEGER PRIMARY KEY,
    groupID INTEGER,
    typeName TEXT,
    description TEXT,
    mass REAL,
    volume REAL,
    capacity REAL,
    portionSize INTEGER,
    raceID INTEGER,
    basePrice REAL,
    published INTEGER,
    marketGroupID INTEGER,
    iconID INTEGER,
    soundID INTEGER,
    graphicID INTEGER,
    FOREIGN KEY (groupID) REFERENCES invTypes(typeID),
    CHECK (published IN (0,1))
  )`
