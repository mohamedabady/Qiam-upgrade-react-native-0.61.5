import Realm from 'realm';

const favourites = 'favourites';
const downloans = 'downloads';
const notes = 'notes';

const favouriteTable = {
    name: favourites,
    primaryKey: 'id',
    properties: {
        id: {type: 'int', indexed: true},
        name: 'string',
        file: 'string'
    }
};

const downloadTable = {
    name: downloans,
    primaryKey: 'id',
    
    properties: {
        id: {type: 'int', indexed: true},
         
        name: 'string',
        file: 'string'
    }
};

const notesTable = {
    name: notes,
    primaryKey: 'name',
    properties: {
        id: 'int',
        name: {type: 'string', indexed: true},
        content: 'string',
    }
}







const databaseOptions = {
    path: 'prophet_realm',
    schema: [favouriteTable, downloadTable, notesTable],
    schemaVersion: 0
};


export const setFavourite = (info) => new Promise((resolve, reject) => {
    let exists = false;
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.objects(favourites).map((val) => {
                if(val.name == info.name)
                    exists = true;
            });
            if(!exists) {
                realm.create(favourites, info);
                resolve();
            } else
                reject({exists});
        });
    }).catch(err => {
        reject(err);
    })
});

export const setDownload = (info) => new Promise((resolve, reject) => {
    let exists = false;
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.objects(downloans).map((val) => {
                if(val.name == info.name)
                    exists = true;
            });
            if(!exists) {
                realm.create(downloans, info);
                resolve();
            } else
                reject({exists});
        });
    }).catch(err => {
        reject(err);
    })
});

export const removeFavourite = (key) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objectForPrimaryKey(favourites, key);
            if(info != null) {
                realm.delete(info);
                let data = realm.objects(favourites);
                resolve(data);
            }
        });
    }).catch(err => {
        reject(err);
    })
});

export const removeDownload = (key) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objectForPrimaryKey(downloans, key);
            if(info != null) {
                realm.delete(info);
                let data = realm.objects(downloans);
                resolve(data);
            }
        });
    }).catch(err => {
        reject(err);
    })
});

export const getAllFavourites = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objects(favourites);
            resolve(info);
        });
    }).catch(err => {
        reject(err);
    })
});

export const getAllDownloads = () => new Promise((resolve, reject) => {
   
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objects(downloans);
           // alert(JSON.stringify(info) )
           resolve(info);
        });
    }).catch(err => {
        reject(err);
    })
});

export const setPackage = (object) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objects(downloans);
            realm.delete(info);
            object.map((val) => {
                let id = Math.floor(Math.random() * 1000);
                val.values.map((val) => {
                    const record = {id, name: val.title, file: val.title+val.cat_id+'.pdf'}
                    realm.create(downloans, record);
                    id = id*2;
                });
            });
            resolve();
        });
    }).catch(err => {
        reject(err);
    })
});

export const getNote = (name) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let info = realm.objectForPrimaryKey(notes, name);
            resolve(info);
        });
    }).catch(err => {
        reject(err);
    })
});

export const setNote = (data) => new Promise((resolve, reject) => {
    let exists = false;
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.objects(notes).map((val) => {
                if(val.name == data.name) {
                    realm.create(notes, data, true);
                    exists = true;
                }
            });
            if(!exists)
                realm.create(notes, data);
            resolve();
        });
    }).catch(err => {
        reject(err);
    })
});