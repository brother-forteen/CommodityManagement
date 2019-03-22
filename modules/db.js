const MongoClient = require("mongodb").MongoClient;

const DBURL = "mongodb://127.0.0.1:27017"; /*链接数据库*/
const DBNAME = "product";

class Connect {
    constructor(){
        this.mongoConnect = (callback) => {
            MongoClient.connect(DBURL, (err, client) => {
                if(err){
                    console.log(err);
                }else {
                    // 增删改查
                    const db = client.db(DBNAME);
                    callback(db, client);
                }
            })
        }
    }

    find(collectionName, params, callback){
        this.mongoConnect((db, client) => {
            let result = db.collection(collectionName).find(params);
            result.toArray((err, data) => {
                callback(err, data);       // 拿到数据，执行回调函数
            });
            client.close();
        })
    }

    insert(collectionName, params, callback){
        this.mongoConnect((db, client) => {
            db.collection(collectionName).insertOne(params, (err, data) => {
                callback(err, data);
            });
            client.close();
        })
    }

    update(collectionName, params1, params2, callback){
        this.mongoConnect((db, client) => {
            db.collection(collectionName).updateOne(params1, {$set: params2}, (err, data) => {
                callback(err, data);
            });
            client.close();
        })
    }

    delete(collectionName, params, callback){
        this.mongoConnect((db, client) => {
            db.collection(collectionName).deleteOne(params1, {$set: params2}, (err, data) => {
                callback(err, data);
            });
            client.close();
        })
    }
}

const dbConnect = new Connect();
export default dbConnect;