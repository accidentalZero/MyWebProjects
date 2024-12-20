import * as SQLite from 'expo-sqlite';
import * as Filesystem from 'expo-file-system';

export const checkExistanceDB = async (dbName) => {
    const dbDir = Filesystem.documentDirectory + 'SQLite/'
    const dirInfo = await Filesystem.getInfoAsync(dbDir+dbName);
    if(!dirInfo.exists) return false
    else return true
}

export async function createDatabase(dbName){    
    const db = await SQLite.openDatabase(dbName);
    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY AUTOINCREMENT, header TEXT, date DATETIME, contact TEXT, note TEXT)');          
    }), error => console.log(`create error: ${error}`);
}

export async function select(dbName, callback){
    const db = await SQLite.openDatabase(dbName);
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM calls',
            null,
            (txObj, resultSet) => {callback(resultSet.rows._array);},
            (txObj, error) => {console.log(error)},
        );
    }), error => console.log(`select error: ${error}`);    
}

export async function selectRow(dbName, id, callback){
    const db = await SQLite.openDatabase(dbName);
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM calls
             WHERE id = ${id}`,
             null,
             (txObj, resultSet) => {callback(resultSet.rows._array[0]);},
             (txObj, error) => {console.log(error)},
        );
    }), error => console.log(`select error: ${error}`);    
}

export async function insertInto(dbName, header="", date="", contact="", note="", callback){
    const dirInfo = await checkExistanceDB(dbName);
    if(!dirInfo) await createDatabase(dbName);

    const db = SQLite.openDatabase(dbName)
    db.transaction(tx => {
        tx.executeSql('INSERT INTO calls (header, date, contact, note) VALUES (?, ?, ?, ?)',            
            [header, date, contact, note],
            (txObj, resultSet) => { callback(resultSet); },
            (txObj, error) => console.log(error)
        );
    }), error => console.log(`create error: ${error}`);
}

export async function updateData(dbName, id, header="", date="", contact="", note="", callback){
    const db = SQLite.openDatabase(dbName)
    db.transaction(tx => {
        tx.executeSql(`
            UPDATE calls SET header = ?, date = ? , contact = ? , note = ?
            WHERE id = ?`,
            [header, date, contact, note, id],
            (txObj, resultSet) => { callback(resultSet); },
            (txObj, error) => console.log(error)
        );
    }), error => console.log(`update error: ${error}`);
}

export async function deleteRow(dbName, id, callback){
    const db = await SQLite.openDatabase(dbName);
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM calls WHERE id = ?`,
            [id],
            (txObj, resultSet) => {callback(resultSet);},
            (txObj, error) => {console.log(error)},
        );
    }), error => console.log(`select error: ${error}`);    
}

export async function deleteDB(dbName){
    const dbDir = Filesystem.documentDirectory + 'SQLite/'
    const dirInfo = await Filesystem.getInfoAsync(dbDir+dbName);
    if (dirInfo.exists) await Filesystem.deleteAsync(dbDir + dbName, { idempotent: true } );

    console.log('Database deleted');
}